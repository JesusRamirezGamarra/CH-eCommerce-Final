import config from '../config/config.js'


const logout = (req, res, next) => {
    try{
        req.session.destroy()
        res.render('logout')
    }
    catch(err){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
    }    
}


export default logout
