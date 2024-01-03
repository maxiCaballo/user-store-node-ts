import { regularExps } from '../../../config';
export class RegisterUserDto {
	constructor(public readonly name: string, public readonly email: string, public readonly password: string) {}

	static create(object: { [key: string]: any }): { error?: string; registerUserDto?: RegisterUserDto } {
		const { name, email, password } = object;

		if (!name) return { error: 'Missing name' };
		if (!email) return { error: 'Missing email' };
		if (!regularExps.email.test(email)) return { error: 'Invalid email' };
		if (!password) return { error: 'Missing password' };
		if (password.length < 6) return { error: 'Password length must be greater than 6' };

		const registerUserDto = {
			name,
			email,
			password,
		};

		return { registerUserDto };
	}
}
