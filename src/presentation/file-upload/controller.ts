import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from 'express-fileupload';

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
		//Se chequea en el middleware si existe el type y es valido
		const type = req.params.type;

		//Se chequea en el middleware si existe algo en el req.files
		const file = Object.values(req.files!).at(0) as UploadedFile;

		this.fileUploadService
			.uploadSingle(file, `uploads/${type}`)
			.then((uploaded) => res.json(uploaded))
			.catch((error) => this.handleError(error, res));
	};

	uploadFiles = (req: Request, res: Response) => {
		//Se chequea en el middleware si existe el type y es valido
		const type = req.params.type;

		//Se chequea en el middleware si existe algo en el req.files
		const files = Object.values(req.files!) as UploadedFile[];

		this.fileUploadService
			.uploadMultiple(files!, `uploads/${type}`)
			.then((uploaded) => res.json(uploaded))
			.catch((error) => this.handleError(error, res));
	};
}

//El req.files es un objeto que tiene como propiedad lo que me mande el cliente y valor un archivo en caso de ser uno
