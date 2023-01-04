import moment from 'moment';
import { logger } from '../utils/logger/isLogger.js';

class ChatController {
    constructor() {}

    show = async (req, res) => {
        try {
            res.render('chat_messages')
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(500).json(err)
        }
    }
}


const chatController = new ChatController()
export default chatController
