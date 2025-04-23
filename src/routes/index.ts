import { Router } from 'express';
import authRoutes from './auth';
import productRoutes from './product';
import templateRoutes from './template';
import catalogueRoutes from './catalogue';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/templates', templateRoutes);
router.use('/catalogue', catalogueRoutes);

export default router;
