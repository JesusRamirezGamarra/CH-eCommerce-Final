import { check } from 'express-validator'
import validateResult  from '../utils/helper/validate-helper.js'

const validate = [
    check('username')
        .exists()
        .isEmail(),
    check('password')
        .exists()
        .isLength({min:6})
        .withMessage('password must be 6 caracters')
        .not()
        .isEmpty(),       
        (req,res,next)=>{
            validateResult(req,res,next);
        }
]

export default validate;