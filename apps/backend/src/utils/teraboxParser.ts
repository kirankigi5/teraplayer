import axios from 'axios';
import * as cheerio from 'cheerio';

interface ParseResult {
  success: boolean;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  directLink?: string;
  fileId?: string;
  resolvedLink?: string;
  error?: string;
  statusCode?: number;
  details?: string;
}

const SUPPORTED_DOMAINS = [
  'terabox.com',
  'www.terabox.com',
  'terabox.app',
  'www.terabox.app',
  'terabox.fun',
  'teraboxapp.com',
  'www.teraboxapp.com',
  'mirrobox.com',
  'www.mirrobox.com',
  'nephobox.com',
  'www.nephobox.com',
  'freeterabox.com',
  'www.freeterabox.com',
  '1024tera.com',
  'www.1024tera.com',
  'www.1024tera.co',
  '4funbox.co',
  'www.4funbox.com',
  'momerybox.com',
  'www.momerybox.com',
  'tibibox.com',
  'www.tibibox.com',
  't.co', // Twitter shortlinks
  'bit.ly', // Bitly shortlinks
];

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * Resolves shortlinks to their final destination
 */
async function resolveShortlink(link: string): Promise<string> {
  try {
    const response = await axios.get(link, { 
      maxRedirects: 5,
      timeout: 10000,
      headers: {
        'User-Agent': USER_AGENT,
      },
    });
    const resolvedUrl = response.request.res.responseUrl || link;
    console.log('Resolved shortlink:', resolvedUrl);
    return resolvedUrl;
  } catch (error) {
    console.error('Error resolving shortlink:', error);
    return link;
  }
}

/**
 * Extracts file ID from various Terabox URL formats
 */
function extractFileId(url: URL): string | null {
  // Handle /sharing/link?surl=... pattern
  if (url.pathname.startsWith('/sharing/link') && url.searchParams.has('surl')) {
    return url.searchParams.get('surl');
  }
  
  // Handle /s/... pattern
  if (url.pathname.startsWith('/s/')) {
    const pathParts = url.pathname.split('/');
    return pathParts[2] || null;
  }
  
  // Handle other patterns
  const pathParts = url.pathname.split('/').filter(part => part.length > 0);
  const potentialId = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
  
  return potentialId && potentialId.length >= 6 ? potentialId : null;
}

/**
 * Validates if the domain is supported
 */
function isSupportedDomain(hostname: string): boolean {
  return SUPPORTED_DOMAINS.some(domain => hostname.endsWith(domain));
}

/**
 * Parses a Terabox link and returns file metadata
 */
export default async function teraboxParser(link: string): Promise<ParseResult> {
  try {
    if (!link || typeof link !== 'string') {
      return {
        success: false,
        error: 'Invalid link provided.',
        statusCode: 400,
      };
    }

    // Resolve shortlinks if necessary
    let resolvedLink = link.trim();
    try {
      const url = new URL(resolvedLink);
      if (url.hostname === 't.co') {
        resolvedLink = await resolveShortlink(link);
      }
    } catch (error) {
      return {
        success: false,
        error: 'Invalid URL format.',
        statusCode: 400,
      };
    }

    // Parse the resolved URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(resolvedLink);
    } catch (error) {
      return {
        success: false,
        error: 'Invalid resolved URL format.',
        statusCode: 400,
      };
    }

    // Validate domain
    if (!isSupportedDomain(parsedUrl.hostname)) {
      return {
        success: false,
        error: `Unsupported domain. Supported domains: ${SUPPORTED_DOMAINS.join(', ')}`,
        statusCode: 400,
      };
    }

    // Extract file ID
    const fileId = extractFileId(parsedUrl);
    if (!fileId) {
      return {
        success: false,
        error: 'Could not extract file identifier from link.',
        statusCode: 400,
      };
    }

    // For now, return the resolved link for use with external downloaders
    // In a real implementation, you would scrape the page or use the Terabox API
    return {
      success: true,
      fileName: 'Terabox File',
      fileSize: 'Unknown',
      fileType: 'unknown',
      directLink: resolvedLink,
      fileId,
      resolvedLink,
    };

  } catch (error: any) {
    console.error('Internal error in teraboxParser:', error);
    return {
      success: false,
      error: 'Internal server error.',
      details: error.message || error.toString(),
      statusCode: 500,
    };
  }
}
