import { Router } from 'express';
import { ProductController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class ProductRoutes {
	static get routes() {
		const router = Router();

		const productController = new ProductController();

		router.get('/', productController.getProducts);
		router.post('/', AuthMiddleware.validateJWT, productController.createProduct);

		return router;
	}
}
