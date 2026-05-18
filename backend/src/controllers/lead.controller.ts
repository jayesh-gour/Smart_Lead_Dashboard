import { Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import { AuthRequest } from '../middleware/auth';
import * as leadService from '../services/lead.service';
import { LeadQueryParams } from '../types';

export const createLead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const lead = await leadService.createLead(req.body, req.user!.id);
  sendSuccess(res, 'Lead created', lead, 201);
});

export const getLeadStats = asyncHandler(async (req: AuthRequest, res: Response) => {
  const stats = await leadService.getLeadStats(req.user!.id, req.user!.role);
  sendSuccess(res, 'Lead stats', stats);
});

export const getLeads = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { leads, meta } = await leadService.getLeads(
    req.query as LeadQueryParams,
    req.user!.id,
    req.user!.role
  );
  sendSuccess(res, 'Leads fetched successfully', leads, 200, meta);
});

export const getLead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const lead = await leadService.getLeadById(
    req.params.id,
    req.user!.id,
    req.user!.role
  );
  sendSuccess(res, 'Lead details', lead);
});

export const updateLead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const lead = await leadService.updateLead(
    req.params.id,
    req.body,
    req.user!.id,
    req.user!.role
  );
  sendSuccess(res, 'Lead updated', lead);
});

export const deleteLead = asyncHandler(async (req: AuthRequest, res: Response) => {
  await leadService.deleteLead(req.params.id, req.user!.id, req.user!.role);
  sendSuccess(res, 'Lead deleted');
});

export const exportCsv = asyncHandler(async (req: AuthRequest, res: Response) => {
  const csv = await leadService.exportLeadsCsv(
    req.query as LeadQueryParams,
    req.user!.id,
    req.user!.role
  );

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="leads-export.csv"');
  res.status(200).send(csv);
});
