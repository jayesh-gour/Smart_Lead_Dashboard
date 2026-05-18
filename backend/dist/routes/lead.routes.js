"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lead_controller_1 = require("../controllers/lead.controller");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const lead_validator_1 = require("../validators/lead.validator");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/export/csv', (0, validate_1.validate)(lead_validator_1.leadListQuerySchema, 'query'), lead_controller_1.exportCsv);
router.get('/stats', lead_controller_1.getLeadStats);
router.get('/', (0, validate_1.validate)(lead_validator_1.leadListQuerySchema, 'query'), lead_controller_1.getLeads);
router.post('/', (0, validate_1.validate)(lead_validator_1.createLeadSchema), lead_controller_1.createLead);
router.get('/:id', lead_controller_1.getLead);
router.patch('/:id', (0, validate_1.validate)(lead_validator_1.updateLeadSchema), lead_controller_1.updateLead);
router.delete('/:id', lead_controller_1.deleteLead);
exports.default = router;
//# sourceMappingURL=lead.routes.js.map