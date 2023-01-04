import loginService from '../../services/auth/passport-local.auth.js'
import moment from 'moment';
import { logger } from '../../utils/logger/isLogger.js';

class LoginController {
#loginService

constructor() {
    this.#loginService = loginService
    }

    localPassportLogin = async (req, res) =>{
        try{
            const login = await this.#loginService.passportLogin(req)
            res.status(201).json(login)
        }catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err.err)
        }
    }
}


const loginController = new LoginController(loginService)
export default loginController
