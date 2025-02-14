import express from 'express';
import { createProducts, getAllProducts } from '../controllers/productController.js';

const router  = express.Router();

router.get("/",getAllProducts);
router.post("/create",createProducts);

export default router ;