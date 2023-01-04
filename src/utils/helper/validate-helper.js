import { validationResult } from 'express-validator';
import { hasJsonResult } from '../../config/config.js'
import moment from 'moment';
import { logger } from '../../utils/logger/isLogger.js';


const validateResult = (req,res,next) =>{
    try{
        validationResult(req).throw();
        return next();
    }
    catch( err ){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: Validation's error`);
        const data = err.array().map( err => {
            err.value = ( err.param === 'password' || err.param === 'repassword') ?   '****' :  err.value;
            return {
                message : err.msg,
                parameter : err.param,
                value : err.value
            }
        });
        res.status(403).send({
            status:403,
            result:hasJsonResult.ERROR,
            message : `Validation's error`,
            code: `Validation_error`,
            payload:{  data : data }, 
            cause: err,            
        });
    }
}


export default validateResult;