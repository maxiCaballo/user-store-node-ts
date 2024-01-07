import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware, FileUploadMiddleware } from '../middlewares';
import { FileUploadService } from '../services';

export class FileUploadRoutes {
	static get routes(): Router {
		const router = Router();

		const fileUploadService = new FileUploadService();
		const fileUploadController = new FileUploadController(fileUploadService);

		router.use(/*AuthMiddleware.validateJWT,*/ FileUploadMiddleware.containFiles);
		router.post('/single/:type', FileUploadMiddleware.isValidUploadType, fileUploadController.uploadFile);
		router.post('/multiple/:type', FileUploadMiddleware.isValidUploadType, fileUploadController.uploadFiles);

		return router;
	}
}
