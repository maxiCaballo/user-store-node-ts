import { Request, Response } from 'express';
import { CustomError, PaginationDto } from '../../domain';

export class ProductController {
	//DI
	constructor(/*Product service dependency inyection */) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		}

		console.log(`${error}`);
		return res.status(500).json({ error: 'Internal server error' });
	};

	createProduct = async (req: Request, res: Response) => {
		return res.json('create products');
	};

	getProducts = async (req: Request, res: Response) => {
		const { page = 1, limit = 10 } = req.query;
		const { error, paginationDto } = PaginationDto.create(Number(page), Number(limit));

		if (error) return res.status(400).json({ error });

		return res.json('get products');
	};
}
