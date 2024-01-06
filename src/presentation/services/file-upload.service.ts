import path from 'path';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import { CustomError } from '../../domain';
import { UuId } from '../../config';

export class FileUploadService {
	constructor(private readonly uuid = UuId.v4) {}

	private checkFolder(folderPath: string) {
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath);
		}
	}

	public async uploadSingle(
		file: UploadedFile,
		folder: string = 'uploads',
		validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
	) {
		try {
			// mimetype : 'image/jpeg'
			const fileExtension = file.mimetype.split('/').at(1) ?? ''; //['image','jpeg']

			if (!validExtensions.includes(fileExtension)) {
				console.log('hola');
				throw CustomError.badRequest(`File extension not allowed: ${fileExtension}, valid extensions : ${validExtensions}`);
			}

			const destinationPath = path.resolve(__dirname, '../../../', folder);

			//Me fijo si existe en ese path la carpeta folder en este caso 'uploads', si no existe la crea
			this.checkFolder(destinationPath);

			//le asigno un nombre y extension y lo muevo a la carpeta que me mandaron
			const fileName = `${this.uuid()}.${fileExtension}`;
			file.mv(`${destinationPath}/${fileName}`);

			return { fileName };
		} catch (error) {
			throw error;
		}
	}

	public async uploadMultiple(
		file: any[],
		folder: string = 'uploads',
		validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
	) {}
}
