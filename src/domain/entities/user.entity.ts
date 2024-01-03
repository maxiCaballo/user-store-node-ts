import { CustomError } from '../errors/custom.error';

export class UserEntity {
	constructor(
		public id: string,
		public name: string,
		public email: string,
		public password: string,
		public role: string[],
		public emailValidated: boolean,
		public img?: string,
	) {}

	static fromObject(object: { [key: string]: any }) {
		const { id, _id, name, email, password, role, emailValidated, img } = object;

		if (!id || !_id) throw CustomError.badRequest('Missing id');
		if (!name) throw CustomError.badRequest('Missing name');
		if (!email) throw CustomError.badRequest('Missing email');
		if (!password) throw CustomError.badRequest('Missing password');
		if (!role) throw CustomError.badRequest('Missing role');
		if (!emailValidated === undefined) throw CustomError.badRequest('Missing email validated');

		return new UserEntity(id || _id, name, email, password, role, emailValidated, img);
	}
}
