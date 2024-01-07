import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from 'express-fileupload';

const validTypes = ['users', 'products', 'categories'];

export class FileUploadController {
	//DI
	constructor(private fileUploadService: FileUploadService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		}

		console.log(`${error}`);
		return res.status(500).json({ error: 'Internal server error' });
	};

	uploadFile = (req: Request, res: Response) => {
		const type = req.params.type;
		if (!validTypes.includes(type)) {
			return res.status(400).json({
				error: `Invalid type: ${type}, valid ones: ${validTypes}`,
			});
		}

		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).json({ error: 'No file was recived on the server' });
		}

		const file = req.files.file as UploadedFile;

		this.fileUploadService
			.uploadSingle(file, `uploads/${type}`)
			.then((uploaded) => res.json(uploaded))
			.catch((error) => this.handleError(error, res));
	};

	uploadFiles = (req: Request, res: Response) => {
		res.json('Upload files controller');
	};
}

//El req.files es un objeto que tiene como propiedad lo que me mande el cliente y valor un archivo en caso de ser uno
