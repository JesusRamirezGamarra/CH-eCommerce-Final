import { check } from 'express-validator'
import validateResult  from '../utils/helper/validate-helper.js'

const validate = [
    check('firstname')
        .exists()
        .not()
        .isEmpty(), 
    check('lastname')
        .exists()
        .not()
        .isEmpty(),   
    check('imageurl')
        .exists()
        .not()
        .isEmpty()
        .isURL(),
    check('phonenumber')
        .exists()
        .not()
        .isEmpty()
        .isMobilePhone(),
        //.isMobilePhone([],[{strictMode:true}]),
        // .isMobilePhone([{ locale: "any" }])
        //.isMobilePhone({strictMode:true}),
    check('username')
        .exists()
        .isEmail(),
    check('password')
        .exists()
        .isLength({min:6})
        .withMessage('password must be 6 caracters')
        .not()
        .isEmpty(),       
    check('repassword')
        .custom((value,{req})=> {
            if (value != req.body.password) {
                throw new Error ('Password confirmation does not match password')
            }
            return true
        }),   
        (req,res,next)=>{
            validateResult(req,res,next);
        }
]

export default validate;