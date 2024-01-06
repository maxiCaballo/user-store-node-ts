export class CreateProductDto {
	private constructor(
		public readonly name: string,
		public readonly available: boolean,
		public readonly price: number,
		public readonly description: string,
		public readonly user: string, //ID
		public readonly category: string, //ID
	) {}

	static create(object: { [key: string]: any }): { error?: string; createProductDto?: CreateProductDto } {
		const { name, available, price, description, user, category } = object;

		if (!name) return { error: 'Missing name' };
		if (!user) return { error: 'Missing user' };
		if (!category) return { error: 'Missing category' };

		const createProductDto = new CreateProductDto(name, !!available, price, description, user, category);

		return { createProductDto };
	}
}
