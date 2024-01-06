import { envs } from '../../config';
import { UserModel, MongoDatabase, CategoryModel, ProductModel } from '../mongo';
import { seedData } from './data';

(async () => {
	await MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME,
	});

	await main();
	await MongoDatabase.disconnect();
})();

const randomBetween0andX = (x: number) => {
	return Math.floor(Math.random() * Math.abs(x));
};

async function main() {
	//Borrar todo
	await Promise.all([UserModel.deleteMany(), CategoryModel.deleteMany(), ProductModel.deleteMany()]);

	//Usuarios
	const users = await UserModel.insertMany(seedData.users);

	//Categorias
	const categories = await CategoryModel.insertMany(
		seedData.categories.map((category) => {
			return {
				...category,
				user: users[0]._id,
			};
		}),
	);

	//Productos
	const products = await ProductModel.insertMany(
		seedData.products.map((product) => {
			return {
				...product,
				user: users[randomBetween0andX(seedData.users.length - 1)]._id,
				category: categories[randomBetween0andX(seedData.categories.length - 1)]._id,
			};
		}),
	);
}
