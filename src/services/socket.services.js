import { Server } from 'socket.io';
// import  Chat  from './Chat.js';
// import { Product } from '../daos/index.js';
// import {errorLogger, logger} from "../helpers/logger.js";
import { logger } from '../utils/logger/isLogger.js';


export default class Socket {
    constructor(conn) {
        this.io = new Server(conn);
        // this.chatDB = new Chat();
        this.on();
    }

    on() {
        this.io.on('connection',
            async (socket) => {
                logger.info('User Connected');

                // let products = await Product.getAll()
                // socket.emit('updateProducts', products);

                // let messages = await this.chatDB.GetMessages();
                // socket.emit('updateChat', messages)
            
                socket.on('webChat', (msg) => {
                    try {
                        // const { email, firstName, lastName, age, message } = msg;
                        // if (email || firstName || lastName || age || message) {
                        //     this.chatDB.CreateMessage(msg).then(async (e) => {
                        //         let refreshChat = await this.chatDB.GetMessageById(e.payload);
                        //         this.io.emit('webChat', refreshChat.payload)
                        //     });
                        // }
                    } catch (err) {
                        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
                    }
                })

                // Disconnect
                socket.on('disconnect', () => {
                    logger.info(`User's disconnected`)
                })
            })
    }
}