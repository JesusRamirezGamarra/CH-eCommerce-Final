class UsersDaoMongodb {
	#mongooseUserModel;

	constructor(mongooseUserModel) {
		this.#mongooseUserModel = mongooseUserModel;
	}
	create = async (user) => {
		try {
			const newUser = new this.#mongooseUserModel(user);
			return await this.#mongooseUserModel.create(newUser);
		} catch (err) {
			throw err;
		}
	};
	getByEmail = async (email) => {
		try {
			return await this.#mongooseUserModel.findOne({ email });
		} catch (err) {
			throw err;
		}
	};
	getById = async (id) => {
		try {
			return await this.#mongooseUserModel.findOne({ _id: id });
		} catch (err) { throw err; }
	};	
	updateById = async (id, data) => {
		try {
			return await this.#mongooseUserModel.findOneAndUpdate({ _id: id }, data, { new: false });
		} catch (err) { throw err; }
	};
}


export default UsersDaoMongodb;
