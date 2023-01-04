import twilio from "twilio";
import config from '../../config/config.js';

const client = twilio(config.MESSAGE.SMS.ACCOUNT_SID,config.MESSAGE.SMS.AUTH_TOKEN)
export const transporterSMS = async(toNumber,message) =>{
    try
    {
        await client.messages.create({
                from:   config.MESSAGE.SMS.PHONE_NUMBER,
                to:     toNumber,
                body:   message
            })
    }
    catch(err)
    {
        throw {
            status: 500,
            result:hasJsonResult.ERROR,
            message: `server error`,
            code: 'server_error',
            payload:{  data : undefined }, 
            cause : err,            
            expected: true,
        }
        
    }
}

export default client
