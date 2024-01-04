export class CreateCategoryDto {
	private constructor(public readonly name: string, public readonly available: boolean) {}

	static create(object: { [key: string]: any }): { error?: string; createCategoryDto?: CreateCategoryDto } {
		const { name, available = false } = object;

		let availableBoolean = available;

		if (!name) return { error: 'Missing name' };
		if (typeof available !== 'boolean') {
			availableBoolean = available === 'true'; //Si no es un string 'true' va a retornar false
		}

		const createCategoryDto = new CreateCategoryDto(name, availableBoolean);

		return { createCategoryDto };
	}
}
