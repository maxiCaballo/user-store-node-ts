import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class FileUploadRoutes {
	static get routes(): Router {
		const router = Router();
		const fileUploadController = new FileUploadController();

		//router.use(AuthMiddleware.validateJWT);
		router.get('/single/:type', fileUploadController.uploadFile);
		router.get('/multiple/:type', fileUploadController.uploadFiles);

		return router;
	}
}
