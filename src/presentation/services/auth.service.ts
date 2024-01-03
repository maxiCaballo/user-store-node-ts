import { JwtAdapter, bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, RegisterUserDto, UserEntity, LoginUserDto } from '../../domain';

export class AuthService {
	//DI
	constructor() {}

	static async findUserByEmail(email: string) {
		try {
			const user = await UserModel.findOne({ email });
			return user;
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}

	public async registerUser(registerUserDto: RegisterUserDto) {
		const existUser = await AuthService.findUserByEmail(registerUserDto.email);
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
				token: 'ABC',
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}
	public async loginUser(loginUserDto: LoginUserDto) {
		const user = await AuthService.findUserByEmail(loginUserDto.email);
		if (!user) throw CustomError.badRequest('User not found with this credentials');

		const errorPassword = !bcryptAdapter.compare(loginUserDto.password, user.password);
		if (errorPassword) throw CustomError.badRequest('User not found with this credentials');

		const { password, ...userEntity } = UserEntity.fromObject(user);

		const token = await JwtAdapter.generateToken({
			id: user.id,
			email: user.email,
		});

		if (!token) throw CustomError.internalServer('Internal server error while creating JWT');

		return {
			user: userEntity,
			token,
		};
	}
}
//Una vez que llego aca es porque los datos que me envia el cliente parecen ser correctos
//El servicio se encarga de hacer las validaciones respectivas ya con el dto valido
