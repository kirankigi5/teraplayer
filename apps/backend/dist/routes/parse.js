"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teraboxParser_1 = __importDefault(require("../utils/teraboxParser"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const { link } = req.body;
        if (!link || typeof link !== 'string') {
            return res.status(400).json({ success: false, error: 'No link provided.' });
        }
        const result = await (0, teraboxParser_1.default)(link);
        if (!result.success) {
            return res.status(result.statusCode || 400).json(result);
        }
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: 'Internal server error.',
            details: err.message || err.toString(),
        });
    }
});
exports.default = router;
