import { bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, RegisterUserDto, UserEntity } from '../../domain';

export class AuthService {
	//DI
	constructor() {}

	public async registerUser(registerUserDto: RegisterUserDto) {
		const existUser = await UserModel.findOne({ email: registerUserDto.email });
		if (existUser) throw CustomError.badRequest('Email already exist');

		try {
			const user = await new UserModel(registerUserDto);

			//Encriptar la contraseña
			user.password = bcryptAdapter.hash(registerUserDto.password);
			await user.save();

			//jwt <-- para mantener la autenticacion del usuario

			//Email de confirmacion

			const { password, ...userEntity } = UserEntity.fromObject(user);

			return {
				user: userEntity,
				token: password,
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}
}
//Una vez que llego aca es porque los datos que me envia el cliente parecen ser correctos
//El servicio se encarga de hacer las validaciones respectivas ya con el dto valido
