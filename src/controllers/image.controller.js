import moment from 'moment';
import { logger } from '../utils/logger/isLogger.js';

class ImageController {
    constructor() {}

upload = async (req, res) => {
        try {
            res.status(201).json({
                status: 200,
                code: 'upload_success',
                public_url: `http://localhost:${req.socket.localPort}/images/${req.file.filename}`,
            })
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err)
        }
    }
}


const imageController = new ImageController()
export default imageController
