"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const parse_1 = __importDefault(require("./routes/parse"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
app.use((0, helmet_1.default)({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_ORIGIN || (NODE_ENV === 'development' ? '*' : true),
    methods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
}));
app.use(express_1.default.json({ limit: '1mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '1mb' }));
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
app.use((req, res, next) => {
    if (req.method === 'POST' && !req.is('application/json')) {
        return res.status(415).json({
            success: false,
            error: 'Content-Type must be application/json'
        });
    }
    return next();
});
app.use('/api/parse', parse_1.default);
app.get('/', (_req, res) => {
    if (NODE_ENV === 'production') {
        const indexPath = path_1.default.join(frontendPath || '', 'index.html');
        const fs = require('fs');
        if (frontendPath && fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        }
        else {
            res.json({
                message: 'TeraPlayer Backend API',
                version: '1.0.0',
                status: 'healthy',
                timestamp: new Date().toISOString(),
                endpoints: {
                    health: '/health',
                    parse: '/api/parse'
                }
            });
        }
    }
    else {
        res.json({
            message: 'TeraPlayer Backend API',
            version: '1.0.0',
            endpoints: {
                health: '/health',
                parse: '/api/parse'
            }
        });
    }
});
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: NODE_ENV,
        port: PORT
    });
});
app.get('/healthz', (_req, res) => {
    res.status(200).send('OK');
});
app.get('/api', (_req, res) => {
    res.json({
        message: 'TeraPlayer Backend API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            parse: '/api/parse'
        }
    });
});
let frontendPath = '';
if (NODE_ENV === 'production') {
    const possiblePaths = [
        path_1.default.join(__dirname, '../../frontend/dist'),
        path_1.default.join(__dirname, '../../../apps/frontend/dist'),
        path_1.default.join(process.cwd(), 'apps/frontend/dist'),
        path_1.default.join(process.cwd(), 'frontend/dist')
    ];
    for (const testPath of possiblePaths) {
        try {
            const fs = require('fs');
            if (fs.existsSync(testPath)) {
                frontendPath = testPath;
                break;
            }
        }
        catch { }
    }
    if (!frontendPath) {
        console.error('❌ Frontend dist folder not found! Tried paths:', possiblePaths);
        frontendPath = possiblePaths[0] || path_1.default.join(__dirname, '../../frontend/dist');
    }
    console.log(`📁 Serving static files from: ${frontendPath}`);
    app.use(express_1.default.static(frontendPath, {
        maxAge: '1d',
        etag: true,
        lastModified: true
    }));
    app.get('/favicon.svg', (_req, res) => {
        res.sendFile(path_1.default.join(frontendPath, 'favicon.svg'), (err) => {
            if (err) {
                console.log('Favicon not found, checking assets folder...');
                const fs = require('fs');
                const assetsPath = path_1.default.join(frontendPath, 'assets');
                try {
                    const files = fs.readdirSync(assetsPath);
                    const faviconFile = files.find((file) => file.startsWith('favicon') && file.endsWith('.svg'));
                    if (faviconFile) {
                        res.sendFile(path_1.default.join(assetsPath, faviconFile));
                    }
                    else {
                        res.status(404).send('Favicon not found');
                    }
                }
                catch {
                    res.status(404).send('Favicon not found');
                }
            }
        });
    });
    app.get('*', (_req, res) => {
        const indexPath = path_1.default.join(frontendPath, 'index.html');
        res.sendFile(indexPath, (err) => {
            if (err) {
                console.error('Error serving index.html:', err);
                res.status(500).json({
                    success: false,
                    error: 'Application failed to load',
                    message: 'Frontend files not found'
                });
            }
        });
    });
}
if (NODE_ENV === 'development') {
    app.use('*', (_req, res) => {
        res.status(404).json({
            success: false,
            error: 'Endpoint not found'
        });
    });
}
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});
const port = Number(PORT);
const server = app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 TeraPlayer backend server running on port ${port}`);
    console.log(`📝 Environment: ${NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${port}/health`);
    console.log(`🌐 Server listening on 0.0.0.0:${port}`);
    if (NODE_ENV === 'production') {
        console.log(`📁 Working directory: ${process.cwd()}`);
        console.log(`📁 __dirname: ${__dirname}`);
        console.log(`📁 Frontend path used: ${frontendPath}`);
        try {
            const fs = require('fs');
            const exists = fs.existsSync(frontendPath);
            console.log(`📁 Frontend dist exists: ${exists}`);
            if (exists) {
                const files = fs.readdirSync(frontendPath);
                console.log(`📁 Frontend dist files:`, files);
            }
            console.log(`📁 Current directory contents:`, fs.readdirSync(process.cwd()));
        }
        catch (err) {
            console.error('📁 Error checking frontend files:', err);
        }
    }
});
server.on('error', (err) => {
    console.error('❌ Server error:', err);
});
process.on('SIGTERM', () => {
    console.log('📤 SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});
