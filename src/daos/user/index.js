import config from '../../config/config.js'


let userDao
switch (config.PERSISTENCE) {
    case 'mongodb':
        const { default: usersDaoMongodb } = await import('./mongodb/user.mongodb.dao.js')
        const { default: mongooseUserModel } = await import('./mongodb/user.mongoose.model.js')
        userDao = new usersDaoMongodb(mongooseUserModel)
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


export { userDao }

