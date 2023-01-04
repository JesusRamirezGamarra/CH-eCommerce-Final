import config from '../config/config.js'
import { initDB_Event } from '../services/connectmongodb.service.js'


let productDao;
let orderDao;
let cartDao;
let userDao;
switch (config.PERSISTENCE) {
    case "mongodb":
        initDB_Event();
        const { default: usersDaoMongodb } = await import('./user/mongodb/user.mongodb.dao.js');
        const { default: mongooseUserModel } = await import('./user/mongodb/user.mongoose.model.js');
            userDao = new usersDaoMongodb(mongooseUserModel);
        const { default: ProductsDaoMongodb } = await import('./product/mongodb/product.mongodb.dao.js');
        const { default: mongooseProductModel } = await import('./product/mongodb/product.mongoose.model.js');
            productDao = new ProductsDaoMongodb(mongooseProductModel);
        const { default: ordersDaoMongodb } = await import('./order/mongodb/order.mongodb.dao.js');
        const { default: mongooseOrderModel } = await import('./order/mongodb/order.mongoose.model.js');
            orderDao = new ordersDaoMongodb(mongooseOrderModel);
        const { default: CartDaoMongodb } = await import('./cart/mongodb/cart.mongodb.dao.js');
        const { default: mongooseCartModel } = await import('./cart/mongodb/cart.mongoose.model.js');
            cartDao = new CartDaoMongodb(mongooseCartModel);
    break;
    default:
        throw {
            status: 500,
            result:hasJsonResult.ERROR,
            message: `Persistence ${config.PERSISTENCE} not implemented`,
            code: 'persistence_not_implemented',
            payload:{  data : undefined }, 
            cause : undefined,
            expected: true,
        }    
}

const services = {
    productDao,
    orderDao,
    cartDao,
    userDao
};

export default services;
