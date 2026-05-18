"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_1 = require("../middleware/validate");
const auth_validator_1 = require("../validators/auth.validator");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 */
router.post('/register', (0, validate_1.validate)(auth_validator_1.registerSchema), auth_controller_1.register);
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 */
router.post('/login', (0, validate_1.validate)(auth_validator_1.loginSchema), auth_controller_1.login);
router.get('/me', auth_1.protect, auth_controller_1.me);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map