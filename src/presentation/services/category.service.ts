import { CategoryModel } from '../../data/mongo';
import { UserEntity, CreateCategoryDto, CustomError, PaginationDto } from '../../domain';

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
	async getCategories(paginationDto: PaginationDto) {
		const { page, limit } = paginationDto;
		try {
			const [totalCategories, categoriesDb] = await Promise.all([
				CategoryModel.countDocuments(),
				CategoryModel.find()
					.skip((page - 1) * limit)
					.limit(limit),
			]);

			return {
				page,
				limit,
				totalCategories,
				next: `/api/categories?page=${page + 1}&limit=${limit}`,
				prev: page - 1 > 0 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
				categories: categoriesDb.map((category) => ({
					id: category.id,
					name: category.name,
					available: category.available,
				})),
			};
		} catch (error) {
			console.log(error);
			throw CustomError.internalServer('Internal server error');
		}
	}
}
