import config from '../../config/config.js'


let cartDao
switch (config.PERSISTENCE) {
    case 'mongodb':
        const { default: CartDaoMongodb } = await import('./mongodb/cart.mongodb.dao.js')
        const { default: mongooseCartModel } = await import('./mongodb/cart.mongoose.model.js')
        cartDao = new CartDaoMongodb(mongooseCartModel)
    break
    default:
        throw {
            status: 500,
            result:hasJsonResult.ERROR,
            message: `Persistence ${config.PERSISTENCE} not implemented.`,
            code: 'persistence_not_implemented',
            payload:{  data : undefined }, 
            cause : undefined,            
            expected: true,

        }
}


export { cartDao }
