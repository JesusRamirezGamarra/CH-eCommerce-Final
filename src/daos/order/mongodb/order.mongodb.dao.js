class OrdersDaoMongodb {
    #mongooseOrderModel
    constructor(mongooseOrderModel) {
        this.#mongooseOrderModel = mongooseOrderModel
    }


    create = async (cart) => {
        try {
            // cart.products.forEach( (item)=> delete item.stock );
            
            return await this.#mongooseOrderModel.create(cart)
        } catch (err) {
            throw err
        }
    }
    getAll = async (userId) => {
        try {
            return await this.#mongooseOrderModel.find({ userId })
        } catch (err) {
            throw err
        }
    }
}


export default OrdersDaoMongodb
