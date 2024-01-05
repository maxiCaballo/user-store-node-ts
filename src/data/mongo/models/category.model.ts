import mongoose, { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	available: {
		type: String,
		default: false,
	},
	//Relation
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

export const CategoryModel = mongoose.model('Category', categorySchema);
