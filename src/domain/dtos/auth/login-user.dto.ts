import { regularExps } from '../../../config';

export class LoginUserDto {
	constructor(public readonly email: string, public readonly password: string) {}

	static create(object: { [key: string]: any }): { error?: string; loginUserDto?: LoginUserDto } {
		const { email, password } = object;

		if (!password) return { error: 'Missing password' };
		if (!email) return { error: 'Missing email' };
		if (!regularExps.email.test(email)) return { error: 'Invalid email' };

		const loginUserDto = {
			email,
			password,
		};

		return { loginUserDto };
	}
}
