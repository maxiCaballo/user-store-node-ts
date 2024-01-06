import { ProductModel } from '../../data';
import { CustomError } from '../../domain';
import { CreateProductDto } from '../../domain/dtos/product/create-product.dto';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';
export class ProductService {
	constructor() {}

	async createProduct(createProductDto: CreateProductDto) {
		const productExist = await ProductModel.findOne({ name: createProductDto.name });
		if (productExist) throw CustomError.badRequest('Product already exist');

		try {
			const product = new ProductModel(createProductDto);
			await product.save();

			return product;
		} catch (error) {
			console.log(error);
			throw CustomError.internalServer('Internal server error');
		}
	}
	async getsProducts(paginationDto: PaginationDto) {
		const { page, limit } = paginationDto;
		try {
			const [totalProducts, productsDb] = await Promise.all([
				ProductModel.countDocuments(),
				ProductModel.find()
					.skip((page - 1) * limit)
					.limit(limit)
					.populate('user', 'name email')
					.populate('category'),
			]);

			return {
				page,
				limit,
				totalProducts,
				next: `/api/products?page=${page + 1}&limit=${limit}`,
				prev: page - 1 > 0 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
				products: productsDb,
			};
		} catch (error) {
			console.log(error);
			throw CustomError.internalServer('Internal server error');
		}
	}
}
