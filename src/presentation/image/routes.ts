import { Router } from 'express';
import { ImagesController } from './controller';

export class ImageRoutes {
	static get routes() {
		const router = Router();
		const imageController = new ImagesController();

		router.get('/:type/:name', imageController.getImage);

		return router;
	}
}
