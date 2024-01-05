import { CategoryModel } from '../../data';
import { UserEntity, CreateCategoryDto, CustomError } from '../../domain';

export class CategoryService {
	//DI
	constructor() {}

	async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
		const categoryExist = await CategoryModel.findOne({ name: createCategoryDto.name });
		if (categoryExist) throw CustomError.badRequest('Category already exist');

		try {
			const category = new CategoryModel({
				...createCategoryDto,
				user: user.id,
			});
			await category.save();

			return {
				id: category.id,
				name: category.name,
				available: category.available,
			};
		} catch (error) {
			console.log(error);
			throw CustomError.internalServer('Internal server error');
		}
	}
	async getCategories() {
		try {
			const categoriesDb = await CategoryModel.find();

			return categoriesDb.map((category) => ({
				id: category.id,
				name: category.name,
				available: category.available,
			}));
		} catch (error) {
			console.log(error);
			throw CustomError.internalServer('Internal server error');
		}
	}
}
