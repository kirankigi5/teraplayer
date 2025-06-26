"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = teraboxParser;
/**
 * Parses a Terabox link and returns file metadata and a direct download link.
 * @param link string
 * @returns Promise<object>
 */
const SUPPORTED_DOMAINS = [
    'terabox.com',
    'terabox.app',
    '1024terabox.com',
];
async function teraboxParser(link) {
    try {
        let url;
        try {
            url = new URL(link.trim());
        }
        catch {
            return {
                success: false,
                error: 'Invalid URL format.',
                statusCode: 400,
            };
        }
        if (!SUPPORTED_DOMAINS.some(domain => url.hostname.endsWith(domain))) {
            return {
                success: false,
                error: 'Unsupported domain. Supported: terabox.com, terabox.app, 1024terabox.com',
                statusCode: 400,
            };
        }
        const pathParts = url.pathname.split('/');
        const fileId = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
        if (!fileId || fileId.length < 6) {
            return {
                success: false,
                error: 'Could not extract file identifier from link.',
                statusCode: 400,
            };
        }
        // Simulated response for now
        return {
            success: true,
            fileName: 'Sample File',
            fileSize: '100MB',
            fileType: 'video/mp4',
            directLink: `https://download.terabox.com/file/${fileId}`,
            fileId,
        };
    }
    catch (err) {
        return {
            success: false,
            error: 'Internal error.',
            details: err.message || err.toString(),
            statusCode: 500,
        };
    }
}
