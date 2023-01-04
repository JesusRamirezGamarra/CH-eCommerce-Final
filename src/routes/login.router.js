import  { Router } from 'express';
// import moment from 'moment'
import passport from 'passport';
// import { logger } from '../utils/logger/isLogger.js';
import validateLogin from '../validators/login.validator.js'
import {hasJsonResult} from '../config/config.js'
// import passportJWTLoginController from '../controllers/auth/passport-jwt-auth.controller.js';
// import passportLocalLoginController from '../controllers/auth/passport-local-auth.controller.js';


const path = 'login';
const router = Router();
// router.post('/token', passportJWTLoginController.tokenLogin)
// router.post('/passport',passportLocalLoginController.localPassportLogin)

router.post(`/${path}/passport`,
    validateLogin,
    (req, res, next) =>{
        passport.authenticate(
            'login', 
            {
                failureMessage: true//,
                // successRedirect : '/'
            },
            (err, user, info) => {
                if (err)  return next(err);
                if (!user) {
                    return res.status(403).send({
                        status: 403,
                        result:hasJsonResult.ERROR,
                        message: 'user not logged in',
                        code: 'user_not_logged_in',
                        payload:{  data : undefined }, 
                        cause: info.message,
                    });
                } 
                else {
                    req.session.user = user;
                    req.session.save(() =>
                        res.status(200).send({
                            status:200,
                            result:hasJsonResult.SUCCESS,
                            message:'user successfully logged in',
                            code:'user_successfully_logged_in', 
                            payload:undefined,
                            cause: undefined ,
                        })
                    );
                    // res.status(200).send({
                    //     status:200,
                    //     result:hasJsonResult.SUCCESS,
                    //     message:'user successfully logged in',
                    //     code:'user_successfully_logged_in', 
                    //     payload:undefined,
                    //     cause: undefined ,
                    // })
                }
            }
        )(req, res, next);
    }
);


export default router;