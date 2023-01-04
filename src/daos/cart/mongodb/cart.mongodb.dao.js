class CartsDaoMongodb {
	#mongooseCartModel;
	constructor(mongooseCartModel) {
		this.#mongooseCartModel = mongooseCartModel;
	}

	create = async (cart) => {
		try {
			const newCart = new this.#mongooseCartModel(cart);
			return await this.#mongooseCartModel.create(newCart);
		} catch (err) {
			throw err;
		}
	};
	getById = async (cartId) => {
		try {
			return await this.#mongooseCartModel.findOne({ _id: cartId });
		} catch (err) {
			throw err;
		}
	};
	getByIdPopulate = async (cartId) => {
		try {
			return await this.#mongooseCartModel.findById({ _id: cartId }).populate('products.product').lean();
		} catch (err) {
			throw err;
		}
	};	
	addProducts = async (cartId, product) => {
		try {
			return await this.#mongooseCartModel.updateMany (
				{_id:cartId},
				{$set: { 'products' : product}}
			);
			// return await this.#mongooseCartModel.updateOne({_id:cartId},{$set:product});
			// return await this.#mongooseCartModel.update({ _id: cartId }, { $push: { products: product } });
		} catch (err) {
			throw err;
		}
	};	

	addProduct = async (cartId, product) => {
		try {
			return await this.#mongooseCartModel.updateOne({ _id: cartId }, { $push: { products: product } }, { new: true });
		} catch (err) {
			throw err;
		}
	};	
	// addProduct = async (cartId, product) => {
	// 	try {
	// 		return await this.#mongooseCartModel.findOneAndUpdate({ id: cartId }, { $push: { products: product } }, { new: true });
	// 	} catch (err) {
	// 		throw err;
	// 	}
	// };
	deleteProduct = async (cartId, productId) => {
		try {
			return await this.#mongooseCartModel.findOneAndUpdate({ id: cartId }, { $pull: { products: { product: productId } } });
		} catch (err) {
			throw err;
		}
	};	
	// deleteProduct = async (cartId, productId) => {
	// 	try {
	// 		return await this.#mongooseCartModel.findOneAndUpdate({ id: cartId }, { $pull: { products: { id: productId } } });
	// 	} catch (err) {
	// 		throw err;
	// 	}
	// };
	deleteAllProducts = async (cartId) => {
		try {
			return await this.#mongooseCartModel.findOneAndUpdate({ id: cartId }, { $set: { products: [] } });
		} catch (err) {
			throw err;
		}
	};
}

export default CartsDaoMongodb;
