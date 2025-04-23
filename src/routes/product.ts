import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProducts,
  searchProducts,
  updateProduct
} from '../controllers/product';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);
router.get('/', authenticate, getProducts);
router.get('/search', authenticate, searchProducts);

export default router;
