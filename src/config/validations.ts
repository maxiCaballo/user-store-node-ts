import mongoose from 'mongoose';

export const validTypes = ['users', 'products', 'categories'];
export const validExtenions = ['png', 'jpg', 'jpeg', 'gif'];

export const Validator = {
	email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
	isMongoID: (id: string) => typeof id === 'string' && mongoose.isValidObjectId(id),
	isValidUploadType: (type: string) => validTypes.includes(type),
	isValidUploadExtensions: (extension: string) => validExtenions.includes(extension),
};
