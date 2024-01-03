import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';

export class AuthRoutes {
	static get routes(): Router {
		const router = Router();

		const authService = new AuthService();
		const authController = new AuthController(authService);

		router.post('/login', authController.loginUser);
		router.post('/register', authController.registerUser);

		router.get('/validate-email/:token', authController.validateEmail);

		return router;
	}
}
//El controlador recibe una instancia del servicio que es el encargado de hacer las validaciones pertinentes
//una vez los datos del clientes esten correctos, el controlador de se encarga de llamar a los metodos nomas.
