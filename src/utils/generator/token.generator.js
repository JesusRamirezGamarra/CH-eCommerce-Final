import jwt from 'jsonwebtoken'
import config from '../../config/config.js'


const tokenGenerator = ({ id, email, first_name, last_name, phone, thumbnail }) => {
    return jwt.sign(
        { id, email, first_name, last_name, phone, thumbnail }, 
        config.JWT.SECRET, {
            expiresIn:  config.TOKEN_EXP_TIME,
        }
    )
}

export default tokenGenerator
