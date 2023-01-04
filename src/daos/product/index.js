import config from '../../config/config.js'


let productDao
switch (config.PERSISTENCE) {
    case 'mongodb':
        const { default: ProductsDaoMongodb } = await import('./mongodb/product.mongodb.dao.js')
        const { default: mongooseProductModel } = await import('./mongodb/product.mongoose.model.js')
        productDao = new ProductsDaoMongodb(mongooseProductModel)
    break
default:
    throw {
        status: 500,
        result : hasJsonResult.ERROR,
        message: `Persistence ${config.PERSISTENCE} not implemented.`,
        code: 'persistence_not_implemented',
        payload:{  data : undefined }, 
        cause: undefined,                
        expected: true,        
    }
}


export { productDao }
