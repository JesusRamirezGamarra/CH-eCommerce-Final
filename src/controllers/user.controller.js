import userService from '../services/user.service.js'
import moment from 'moment';
import { logger } from '../utils/logger/isLogger.js';

class UserController {
    #userService
    constructor() {
        this.#userService = userService
    }
    create = async (req, res) => {
        try {
            const user = await this.#userService.create(req)
            res.status(201).json(user)
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err.err)
        }
    }
    updateById = async (req, res) => {
        try {
            const updatedUser = await this.#userService.updateById(req);
            res.status(201).json(updatedUser);
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err.err);
        }
    }
}


const userController = new UserController(userService)
export default userController
