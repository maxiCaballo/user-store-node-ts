import { Request, Response } from 'express';

export class AuthController {
	//DI
	constructor() {}

	public registerUser = (req: Request, res: Response) => {
		res.json('registerUser');
	};
	public loginUser = (req: Request, res: Response) => {
		res.json('loginUser');
	};
	public validateEmail = (req: Request, res: Response) => {
		res.json('validateEmail');
	};
}
