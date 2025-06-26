"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = teraboxParser;
const axios_1 = __importDefault(require("axios"));
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
    't.co',
    'bit.ly',
];
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
async function resolveShortlink(link) {
    try {
        const response = await axios_1.default.get(link, {
            maxRedirects: 5,
            timeout: 10000,
            headers: {
                'User-Agent': USER_AGENT,
            },
        });
        const resolvedUrl = response.request.res.responseUrl || link;
        console.log('Resolved shortlink:', resolvedUrl);
        return resolvedUrl;
    }
    catch (error) {
        console.error('Error resolving shortlink:', error);
        return link;
    }
}
function extractFileId(url) {
    if (url.pathname.startsWith('/sharing/link') && url.searchParams.has('surl')) {
        return url.searchParams.get('surl');
    }
    if (url.pathname.startsWith('/s/')) {
        const pathParts = url.pathname.split('/');
        return pathParts[2] || null;
    }
    const pathParts = url.pathname.split('/').filter(part => part.length > 0);
    const potentialId = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
    return potentialId && potentialId.length >= 6 ? potentialId : null;
}
function isSupportedDomain(hostname) {
    return SUPPORTED_DOMAINS.some(domain => hostname.endsWith(domain));
}
async function teraboxParser(link) {
    try {
        if (!link || typeof link !== 'string') {
            return {
                success: false,
                error: 'Invalid link provided.',
                statusCode: 400,
            };
        }
        let resolvedLink = link.trim();
        try {
            const url = new URL(resolvedLink);
            if (url.hostname === 't.co') {
                resolvedLink = await resolveShortlink(link);
            }
        }
        catch (error) {
            return {
                success: false,
                error: 'Invalid URL format.',
                statusCode: 400,
            };
        }
        let parsedUrl;
        try {
            parsedUrl = new URL(resolvedLink);
        }
        catch (error) {
            return {
                success: false,
                error: 'Invalid resolved URL format.',
                statusCode: 400,
            };
        }
        if (!isSupportedDomain(parsedUrl.hostname)) {
            return {
                success: false,
                error: `Unsupported domain. Supported domains: ${SUPPORTED_DOMAINS.join(', ')}`,
                statusCode: 400,
            };
        }
        const fileId = extractFileId(parsedUrl);
        if (!fileId) {
            return {
                success: false,
                error: 'Could not extract file identifier from link.',
                statusCode: 400,
            };
        }
        return {
            success: true,
            fileName: 'Terabox File',
            fileSize: 'Unknown',
            fileType: 'unknown',
            directLink: resolvedLink,
            fileId,
            resolvedLink,
        };
    }
    catch (error) {
        console.error('Internal error in teraboxParser:', error);
        return {
            success: false,
            error: 'Internal server error.',
            details: error.message || error.toString(),
            statusCode: 500,
        };
    }
}
