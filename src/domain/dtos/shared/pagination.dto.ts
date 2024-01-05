export class PaginationDto {
	private constructor(public readonly page: number, public readonly limit: number) {}

	static create(page: number = 1, limit: number = 10): { error?: string; paginationDto?: PaginationDto } {
		if (isNaN(page) || isNaN(limit)) return { error: 'Page and Limit must be numbers' };
		if (page <= 0 || limit <= 0) return { error: 'Page and Limit must be greater than 0' };

		const paginationDto = new PaginationDto(page, limit);

		return {
			paginationDto,
		};
	}
}
