import LoginModel from '../../models/auth/login-auth.model.js'
import { userDao } from '../../daos/user/index.js'
import tokenGenerator from '../../utils/generator/token.generator.js'
import isValidPassword from '../../utils/encript/string.encript.js'

class LoginService {
    #loginModel
    #userDao
    #tokenGenerator
    #isValidPassword
    constructor(loginModel, userDao, tokenGenerator, isValidPassword) {
        this.#loginModel = loginModel
        this.#userDao = userDao
        this.#tokenGenerator = tokenGenerator
        this.#isValidPassword = isValidPassword
    }

    tokenLogin = async (req) => {
        try {
            const loginModel = new this.#loginModel(req.body)
            const loginDto = loginModel.dto
            const user = await this.#userDao.getByEmail(loginDto.email)
            const login = await this.#isValidPassword(loginDto.password, user.password)
            if (!login) {
                throw {
                message: 'Invalid password.',
                code: 'invalid_password',
                status: 400,
                expected: true,
                }
            }
            const token = this.#tokenGenerator(user)
            return { id: user.id, username: user.email, token }
        } 
        catch (err) {
            if (!err.expected)
            err = {
                message: 'Error logging in.',
                code: 'login_error',
                status: 500,
                }
            delete err.expected
            throw err
        }
    }
}


const loginService = new LoginService(LoginModel, userDao, tokenGenerator, isValidPassword)
export default loginService
