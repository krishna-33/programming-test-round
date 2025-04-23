import { Router } from 'express';
import {
  createTemplate,
  deleteTemplate,
  getTemplates,
  updateTemplate
} from '../controllers/template';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.post('/', authenticate, createTemplate);
router.put('/:id', authenticate, updateTemplate);
router.delete('/:id', authenticate, deleteTemplate);
router.get('/', authenticate, getTemplates);

export default router;
