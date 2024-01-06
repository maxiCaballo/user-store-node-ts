import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services';

export class FileUploadRoutes {
	static get routes(): Router {
		const router = Router();

		const fileUploadService = new FileUploadService();
		const fileUploadController = new FileUploadController(fileUploadService);

		//router.use(AuthMiddleware.validateJWT);
		router.post('/single/:type', fileUploadController.uploadFile);
		router.get('/multiple/:type', fileUploadController.uploadFiles);

		return router;
	}
}
