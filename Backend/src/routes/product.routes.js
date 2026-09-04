import express from 'express';
import { getProducts, getProductBySlug, createProduct } from '../controllers/product.controller.js';
import { validateProduct } from '../validators/product.validator.js';

const router = express.Router();

router.route('/').get(getProducts).post(validateProduct, createProduct);
router.route('/:slug').get(getProductBySlug);

export default router;
