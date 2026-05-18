import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLeadStats,
  getLead,
  updateLead,
  deleteLead,
  exportCsv,
} from '../controllers/lead.controller';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createLeadSchema,
  updateLeadSchema,
  leadListQuerySchema,
} from '../validators/lead.validator';

const router = Router();

router.use(protect);

router.get('/export/csv', validate(leadListQuerySchema, 'query'), exportCsv);
router.get('/stats', getLeadStats);
router.get('/', validate(leadListQuerySchema, 'query'), getLeads);
router.post('/', validate(createLeadSchema), createLead);
router.get('/:id', getLead);
router.patch('/:id', validate(updateLeadSchema), updateLead);
router.delete('/:id', deleteLead);

export default router;
