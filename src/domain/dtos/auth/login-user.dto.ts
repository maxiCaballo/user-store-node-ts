import { Validator } from '../../../config';

export class LoginUserDto {
	private constructor(public readonly email: string, public readonly password: string) {}

	static create(object: { [key: string]: any }): { error?: string; loginUserDto?: LoginUserDto } {
		const { email, password } = object;

		if (!password) return { error: 'Missing password' };
		if (!email) return { error: 'Missing email' };
		if (!Validator.email.test(email)) return { error: 'Invalid email' };

		const loginUserDto = new LoginUserDto(email, password);

		return { loginUserDto };
	}
}
