import mongoose from 'mongoose'
import config from '../config/config.js'


const connectOptions = {
    autoIndex:                  config.MONGO_DB.OPTIONS.AUTO_INDEX,                 
    maxPoolSize:                config.MONGO_DB.OPTIONS.MAX_POOL_SIZE,              
    serverSelectionTimeoutMS:   config.MONGO_DB.OPTIONS.SERVER_SELECTION_TIMEOUT,   
    socketTimeoutMS:            config.MONGO_DB.OPTIONS.SOCKET_TIMEOUT_MS,          
    family:                     config.MONGO_DB.OPTIONS.FAMILY,                     
    keepAlive:                  config.MONGO_DB.OPTIONS.KEEP_ALIVE,                 
    useUnifiedTopology:         config.MONGO_DB.OPTIONS.USE_UNIFIED_TOPOLOGY   
}
export const initDB_Event =  () => {
    mongoose.connect(
        config.MONGO_DB.URL_CONNECT,
        connectOptions
    )
    mongoose.connection.on('connected',()=>{
        console.log(`🥋  ~  Mongoose is connected ! worker process with ${process.pid} started`)
    })
    mongoose.connection.on('error', (err)=> { 
        console.log(`🥋  ~  Mongoose default connection error: ` + err);
    }); 
    mongoose.connection.on('disconnected',  () =>{ 
        console.log(`🥋  ~  Mongoose default connection disconnected`); 
    });
    process.on('SIGINT', ()=> {   
    mongoose.connection.close( ()=> { 
        console.log(`🥋  ~  Mongoose default connection disconnected through app termination`); 
        process.exit(0); 
        }); 
    }); 
}
export const initDB_Promise = async () => {
    return mongoose.connect(
        config.MONGO_DB.URL_CONNECT,
        connectOptions
    )
    .then((db)=> console.log(`🥋  ~  Mongoose is connected ! worker process with ${process.pid} started`))       
    .catch((err)=> console.error(`🥋  ~  Mongoose could not connect.`,err) )        
}
export const initDB_CallBack = () => {   
    return mongoose.connect(
        config.MONGO_DB.URL_CONNECT,
        connectOptions,
        (err) =>{
            if(err){
                console.log(`🥋  ~  Mongoose could not connect.`,err)         
            }else{
                console.log(`🥋  ~  Mongoose is connected ! worker process with ${process.pid} started` )
            }
        }
    )        
}
export const initDB_TryCatch = () => {
    try{
        return mongoose.connect(
            config.MONGO_DB.URL_CONNECT,
            connectOptions,
            () =>{
                console.log(`🥋  ~  Mongoose is connected ! worker process with ${process.pid} started` )
            }
        )        
    }
    catch(err){
        console.log(`🥋  ~  Mongoose could not connect.`,err)
    }
}
