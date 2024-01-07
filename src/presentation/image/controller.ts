import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { CustomError } from '../../domain';

export class ImagesController {
	//DI
	constructor() {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		}

		console.log(`${error}`);
		return res.status(500).json({ error: 'Internal server error' });
	};

	getImage = (req: Request, res: Response) => {
		const { type = '', name = '' } = req.params;

		const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${name}`);
		if (!fs.existsSync(imagePath)) {
			res.status(404).json({ error: 'Image not found' });
		}

		res.sendFile(imagePath);
	};
}
