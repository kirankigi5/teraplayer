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
    origin: process.env.FRONTEND_ORIGIN || (NODE_ENV === 'development' ? '*' : false),
    methods: ['GET', 'POST'],
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
app.get('/health', (_req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
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
if (NODE_ENV === 'production') {
    const frontendPath = path_1.default.join(__dirname, '../../frontend/dist');
    app.use(express_1.default.static(frontendPath));
    app.get('*', (_req, res) => {
        res.sendFile(path_1.default.join(frontendPath, 'index.html'));
    });
}
else {
    app.get('/', (_req, res) => {
        res.json({
            message: 'TeraPlayer Backend API',
            version: '1.0.0',
            endpoints: {
                health: '/health',
                parse: '/api/parse'
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
app.listen(PORT, () => {
    console.log(`🚀 TeraPlayer backend server running on port ${PORT}`);
    console.log(`📝 Environment: ${NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
