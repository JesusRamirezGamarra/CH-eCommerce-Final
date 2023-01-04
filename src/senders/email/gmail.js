import nodemailer from 'nodemailer'
import config from '../../config/config.js';


export const transporter = nodemailer.createTransport({
    service: config.NODEMAILER.SERVICE,     
    host: config.NODEMAILER.HOST,           
    port: config.NODEMAILER.PORT || 587,
    auth: {
        user: config.NODEMAILER.USER,
        pass: config.NODEMAILER.PASSWORD,
    }
})


export default transporter
