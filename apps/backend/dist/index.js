"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const parse_1 = __importDefault(require("./routes/parse"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_ORIGIN || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express_1.default.json({ limit: '1mb' }));
app.use((req, res, next) => {
    if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
        return res.status(415).json({ success: false, error: 'Content-Type must be application/json' });
    }
    next();
});
app.use('/api/parse', parse_1.default);
app.get('/', (_req, res) => {
    res.send('TeraPlayer backend is running.');
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
