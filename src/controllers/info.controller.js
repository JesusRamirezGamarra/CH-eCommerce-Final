import serverInfo from '../config/server.info.js'
import moment from 'moment';
import { logger } from '../utils/logger/isLogger.js';


class InfoController {
    constructor() {}

    serverInfo = async (req, res) => {
        try {
            res.render('server_info', { layout: 'server', data: serverInfo })
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(500).json(err)
        }
    }
}


const infoController = new InfoController()
export default infoController
