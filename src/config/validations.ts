import mongoose from 'mongoose';

export const Validator = {
	email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
	isMongoID: (id: string) => typeof id === 'string' && mongoose.isValidObjectId(id),
};
