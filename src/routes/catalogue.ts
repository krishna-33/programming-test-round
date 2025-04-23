import { Router } from 'express';
import { generateCatalogue } from '../controllers/catalogue';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.post('/generate', authenticate, generateCatalogue);

export default router;
