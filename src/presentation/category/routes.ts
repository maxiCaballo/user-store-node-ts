import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.service';

export class CategoryRoutes {
	static get routes(): Router {
		const router = Router();

		const categoryService = new CategoryService();
		const categoryController = new CategoryController(categoryService);

		router.post('/', AuthMiddleware.validateJWT, categoryController.createCategory);
		router.get('/', categoryController.getCategories, categoryController.getCategories);

		return router;
	}
}
