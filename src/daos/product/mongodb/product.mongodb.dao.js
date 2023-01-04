class ProductsDaoMongodb {
	#mongooseProductModel;
	constructor(mongooseProductModel) {
		this.#mongooseProductModel = mongooseProductModel;
	}
	create = async (product) => {
		try {
			const newProduct = new this.#mongooseProductModel(product);
			return await this.#mongooseProductModel.create(newProduct);
		} catch (err) { throw err; }
	};
	getSearch = async (params,projection) => {
		try {
			return await this.#mongooseProductModel.find(params,projection ).lean();
		} catch (err) { throw err; }
	};	
	getAll = async () => {
		try {
			return await this.#mongooseProductModel.find().lean();
		} catch (err) { throw err; }
	};
	getById = async (id) => {
		try {
			return await this.#mongooseProductModel.findOne({ sku: id });
		} catch (err) { throw err; }
	};
	updateById = async (id, data) => {
		try {
			return await this.#mongooseProductModel.findOneAndUpdate({ _id: id }, data, { new: true });
		} catch (err) { throw err; }
	};
	deleteById = async (id) => {
		try {
			return await this.#mongooseProductModel.findOneAndDelete({ _id: id });
		} catch (err) { throw err;}
	};
}


export default ProductsDaoMongodb;
