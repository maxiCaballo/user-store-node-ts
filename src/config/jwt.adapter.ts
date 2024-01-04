import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SECRET_KEY = envs.JWT_SECRET_KEY;

export class JwtAdapter {
	static generateToken(payload: any, duration: string = '2h') {
		return new Promise((resolve) => {
			jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: duration }, (err, token) => {
				if (err) return resolve(null);

				resolve(token);
			});
		});
	}

	static validateToken(token: string) {
		return new Promise((resolve) => {
			jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
				if (err) {
					return resolve(null);
				}

				resolve(decoded);
			});
		});
	}
}
