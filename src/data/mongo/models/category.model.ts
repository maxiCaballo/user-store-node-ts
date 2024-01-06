import mongoose, { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		unique: true,
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

categorySchema.set('toJSON', {
	virtuals: true,
	versionKey: false, //Elimina la propiedad __v
	transform: function (doc, ret, options) {
		delete ret._id;
	},
});

export const CategoryModel = mongoose.model('Category', categorySchema);
