import passport from "passport";
import local from 'passport-local';
import { hasJsonResult } from '../../config/config.js';
//import userService from '../../models/user.model.js';
// import userService from "../../models/auth/Draft/_____login-auth.model.js";
// import userService from '../../daos/user/index.js';
// import userService from '../../models/user.model.js'
// import { userDao } from '../../daos/user/index';
import userService from '../../daos/user/mongodb/user.mongoose.model.js';
import cartService from '../../services/cart.service.js'
// import userController from '../../controllers/user.controller.js';

import { makeEncryptPass, isValidPassword } from "../../utils/encript/string.encript.js";
import { transporter } from '../../senders/email/gmail.js'
import { newUserEmailTemplate } from '../../senders/email/template/newuser-template.email.js';

const LocalStrategy = local.Strategy;
const initializePassport = () =>{
    passport.use(
        'login',
        new LocalStrategy({usernameField:'username',passwordField:'password'},  
            async (email,password,done)=>{
                if(!email||!password) return done(null,false,{message:"Incomplete values"})
                let user =  await userService.findOne({email:email});
                if(!user) return done(null,false,{message:"Incorrect credentials"})
                if(!isValidPassword(password,user.password)) 
                    return done(null,false,{message:"Incorrect password"});
               // user.isAdmin = ( user.role === 'admin') ? true : false;
                return done(null,user);
            }
        )
    )
    passport.use(
        'register',
        new LocalStrategy({usernameField: "username",passReqToCallback: true},
            async(req,email,password,done)=>{
                try{
                    const { firstname, lastname, imageurl, phonenumber, username, password } = req.body;
                    if(!firstname||!lastname||!imageurl||!phonenumber||!email||!password) return done(null, false, {message:'Incomplete values'});
                    const exists = await userService.findOne({email:email});
                    if(exists) return done(null, false, {message:'Email already exists'});
                    // const newUser = {first_name:firstname,last_name:lastname,image_url:imageurl,phone_number:phonenumber,email:email,password:makeEncryptPass(password)}
                    // let result = await userService.create(newUser);
                    // const userCart = await cartService.create(result._id)
                    // if (!userCart)
                    //     throw {
                    //         status:500,
                    //         result:hasJsonResult.ERROR,                            
                    //         message: 'Error creating user cart.',
                    //         code: 'create_cart_error',
                    //         payload: { data : undefined},
                    //         cause: undefined,
                    //         expected: true,
                    //     }
                    const userCart = await cartService.create();
                    if (!userCart)
                    throw {
                        status:500,
                        result:hasJsonResult.ERROR,                            
                        message: 'Error creating user cart.',
                        code: 'create_cart_error',
                        payload: { data : undefined},
                        cause: undefined,
                        expected: true,
                    }
                    const newUser = {first_name:firstname,last_name:lastname,image_url:imageurl,phone_number:phonenumber,email:email,password:makeEncryptPass(password),cart:userCart._id}
                    let user = await userService.create(newUser);
                    const template = newUserEmailTemplate(newUser)
                    await transporter.sendMail(template)                        
                    
                    return done(null,user)
                }catch(err){
                    return done(null, false, {message : err});
                }
            }
        )
    )       
    passport.serializeUser((user,done)=> done(null,user._id) )
    passport.deserializeUser(async(id,done)=>{
        let result = await userService.findOne({_id:id})
        return done(null,result);
    })
}


export default initializePassport;