import config,{hasJsonResult} from '../../config/config.js'


let orderDao
switch (config.PERSISTENCE) {
    case 'mongodb':
        const { default: ordersDaoMongodb } = await import('./mongodb/order.mongodb.dao.js')
        const { default: mongooseOrderModel } = await import('./mongodb/order.mongoose.model.js')
        orderDao = new ordersDaoMongodb(mongooseOrderModel)
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


export { orderDao }
