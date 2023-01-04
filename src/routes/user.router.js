
import { Router } from 'express';
import passport from 'passport';
import { hasJsonResult } from '../config/config.js';
// import userController from '../controllers/user.controller.js';
import isLoggedIn from '../middlewares/isauth.middleware.js';
import validateUserRegister from '../validators/user-register.validator.js';
import validateUserProfile from '../validators/user-profile.validator.js';
import userController from '../controllers/user.controller.js';

const path = 'user';
const router = new Router()

// router.post('/', userController.create)
// router.get(`/${path}/profile`, isLoggedIn, async(req, res) => res.render('profile', { user : req.session.user})  );

router.post(`/${path}/profile`, isLoggedIn, validateUserProfile, userController.updateById)

router.post(`/${path}/register`,
    validateUserRegister,
    (req, res, next) =>{
        passport.authenticate(
            'register',
            {
                failureMessage: true
            },
            (err, user, info) => {
                if (err)  return next(err);
                if (!user) {
                    return res.status(403).send({
                        status:403,
                        result:hasJsonResult.ERROR,
                        message: 'User not created',
                        code: 'user_not_created',
                        payload:{  data : undefined }, 
                        cause: info.message,
                    });
                } else {
                    req.session.user = user;
                    res.status(200).send({
                        status:'200',
                        result:hasJsonResult.SUCCESS,
                        message:'user created successfully',
                        code:'user_created_successfully', 
                        payload:req.session,
                        cause: undefined ,
                    })
                }
            }        
        )(req, res, next);
    }    
);

export default router
