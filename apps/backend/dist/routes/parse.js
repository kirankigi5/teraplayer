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
        if (!link) {
            return res.status(400).json({
                success: false,
                error: 'Link is required.'
            });
        }
        if (typeof link !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Link must be a string.'
            });
        }
        if (link.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Link cannot be empty.'
            });
        }
        const result = await (0, teraboxParser_1.default)(link.trim());
        if (!result.success) {
            return res.status(result.statusCode || 400).json(result);
        }
        return res.json(result);
    }
    catch (error) {
        console.error('Error in parse route:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
});
exports.default = router;
