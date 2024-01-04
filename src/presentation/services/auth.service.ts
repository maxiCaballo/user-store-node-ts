import { JwtAdapter, bcryptAdapter, envs } from '../../config';
import { UserModel } from '../../data';
import { CustomError, RegisterUserDto, UserEntity, LoginUserDto } from '../../domain';
import { EmailService } from './email.service';

export class AuthService {
	//DI
	constructor(private readonly emailService: EmailService) {}

	//Private methods
	private async findUserByEmail(email: string) {
		try {
			const user = await UserModel.findOne({ email });
			return user;
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}
	private async createToken(payload: any, duration?: string) {
		const token = await JwtAdapter.generateToken(payload, duration);
		if (!token) throw CustomError.internalServer('Internal server error while creating JWT');

		return token;
	}
	private async sendEmailValidationLink(email: string) {
		const token = await this.createToken({ email }, '10min');

		//Dependencia oculta con la variable de entorno
		const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
		const html = `
        <h1> Validate your email </h1>
        <p>Click on the following link to validate your email</p>
        <a href="${link}">Validate your email: ${email}</a>
        `;

		const options = {
			to: email,
			subject: 'Validate your email',
			htmlBody: html,
		};

		const wasSent = await this.emailService.sendEmail(options);
		if (!wasSent) throw CustomError.internalServer('Error sending email');
	}
	public async validateEmail(token: string) {
		const payload = await JwtAdapter.validateToken(token);
		if (!payload) throw CustomError.unAuthorized('Invalid token');

		const { email } = payload as { email: string };
		if (!email) throw CustomError.internalServer('Email not found in token');

		const user = await this.findUserByEmail(email);
		user!.emailValidated = true;
		await user!.save();

		return 'Email validated';
	}

	//Public methods
	public async registerUser(registerUserDto: RegisterUserDto) {
		const existUser = await this.findUserByEmail(registerUserDto.email);
		if (existUser) throw CustomError.badRequest('Email already exist');

		try {
			const user = await new UserModel(registerUserDto); //Mongo user

			//Encriptar la contraseña
			user.password = bcryptAdapter.hash(registerUserDto.password);
			await user.save();

			//Generacion token jwt
			const token = await this.createToken({
				id: user.id,
			});

			//Envio de email para verificacion
			await this.sendEmailValidationLink(user.email);

			const { password, ...userEntity } = UserEntity.fromObject(user);

			return {
				user: userEntity,
				token,
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}
	public async loginUser(loginUserDto: LoginUserDto) {
		const user = await this.findUserByEmail(loginUserDto.email);
		if (!user) throw CustomError.badRequest('User not found with this credentials');

		const errorPassword = !bcryptAdapter.compare(loginUserDto.password, user.password);
		if (errorPassword) throw CustomError.badRequest('User not found with this credentials');

		const { password, ...userEntity } = UserEntity.fromObject(user);

		const token = await this.createToken({
			id: user.id,
		});

		return {
			user: userEntity,
			token,
		};
	}
}
//Una vez que llego aca es porque los datos que me envia el cliente parecen ser correctos
//El servicio se encarga de hacer las validaciones respectivas ya con el dto valido
