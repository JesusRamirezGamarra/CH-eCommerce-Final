import config from '../config/config.js'
import jwt from 'jsonwebtoken'


const isLoggedIn = (req, res, next) => {
    try{
        if(!req.session.user) return res.status(307).redirect('/login');
        next();
    }
    catch(err){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
        res.redirect('/login')        
    }        
} 
const isAuthJWT = (req, res, next) => {
    const headerAuthorization = req.headers['authorization'] || req.headers['Authorization'] || ''
    if (!headerAuthorization) {
        return res.status(401).json({
            message: 'An Authorization Bearer Token must be provided.',
            code: 'Authorization_token_required',
        })
    }
    const token = headerAuthorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            message: 'Token required.',
            code: 'token_required',
            status: 401,
        })
    }
    try {
        req.user = jwt.verify(token, config.JWT.SECRET)
    } 
    catch (error) {
        return res.status(403).json({
            message: 'Not authorized. Invalid Token.',
            code: 'not_authorized',
            status: 403,
        })
    }
    next()
}


export default isLoggedIn
