import { Request, Response, NextFunction } from 'express';
import { Validator, validTypes } from '../../config';

export class FileUploadMiddleware {
	static containFiles(req: Request, res: Response, next: NextFunction) {
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).json({ error: 'No file was recived on the server' });
		}

		next();
	}

	static isValidUploadType(req: Request, res: Response, next: NextFunction) {
		const type = req.params.type;

		if (!Validator.isValidUploadType(type)) {
			return res.status(400).json({
				error: `Invalid type: ${type}, valid ones: ${validTypes}`,
			});
		}

		next();
	}
}
