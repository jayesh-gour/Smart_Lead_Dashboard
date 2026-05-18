"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCsv = exports.deleteLead = exports.updateLead = exports.getLead = exports.getLeads = exports.getLeadStats = exports.createLead = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const apiResponse_1 = require("../utils/apiResponse");
const leadService = __importStar(require("../services/lead.service"));
exports.createLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const lead = await leadService.createLead(req.body, req.user.id);
    (0, apiResponse_1.sendSuccess)(res, 'Lead created', lead, 201);
});
exports.getLeadStats = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const stats = await leadService.getLeadStats(req.user.id, req.user.role);
    (0, apiResponse_1.sendSuccess)(res, 'Lead stats', stats);
});
exports.getLeads = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { leads, meta } = await leadService.getLeads(req.query, req.user.id, req.user.role);
    (0, apiResponse_1.sendSuccess)(res, 'Leads fetched successfully', leads, 200, meta);
});
exports.getLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const lead = await leadService.getLeadById(req.params.id, req.user.id, req.user.role);
    (0, apiResponse_1.sendSuccess)(res, 'Lead details', lead);
});
exports.updateLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const lead = await leadService.updateLead(req.params.id, req.body, req.user.id, req.user.role);
    (0, apiResponse_1.sendSuccess)(res, 'Lead updated', lead);
});
exports.deleteLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await leadService.deleteLead(req.params.id, req.user.id, req.user.role);
    (0, apiResponse_1.sendSuccess)(res, 'Lead deleted');
});
exports.exportCsv = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const csv = await leadService.exportLeadsCsv(req.query, req.user.id, req.user.role);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="leads-export.csv"');
    res.status(200).send(csv);
});
//# sourceMappingURL=lead.controller.js.map