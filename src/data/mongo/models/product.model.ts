import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		unique: true,
	},
	available: {
		type: String,
		default: false,
	},
	price: {
		type: Number,
		default: 0,
	},
	description: {
		type: String,
	},
	//Relations
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
});

productSchema.set('toJSON', {
	virtuals: true,
	versionKey: false, //Elimina la propiedad __v
	transform: function (doc, ret, options) {
		delete ret._id;
	},
});
export const ProductModel = mongoose.model('Product', productSchema);
