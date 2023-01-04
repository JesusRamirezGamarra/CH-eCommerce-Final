import OrderModel from '../models/order/order.model.js'
import { cartDao } from '../daos/cart/index.js'
import { orderDao } from '../daos/order/index.js'
import { transporter } from '../senders/email/gmail.js'
import { newOrderEmailTemplate } from '../senders/email/template/neworder-template.email.js'
import { transporterSMS } from '../senders/message/sms.message.js'
import { transporterWhatsapp } from '../senders/whatsapp/whatsapp.message.js'
import idGenerator from '../utils/generator/id.generator.js'
import config, {hasJsonResult} from '../config/config.js'

class OrderService {
    #orderModel
    #cartDao
    #orderDao
    #idGenerator
    constructor(orderModel, cartDao, orderDao, idGenerator) {
        this.#orderModel = orderModel
        this.#cartDao = cartDao
        this.#orderDao = orderDao
        this.#idGenerator = idGenerator
    }
    create = async (order ) => {        
        try {
            const newOrder =await this.#orderDao.create(order)
            if (!newOrder)
            throw {
                status: 500,
                result:hasJsonResult.ERROR,
                message: 'Error creating order.',
                code: 'create_order_error',                
                payload:{  data : undefined}, 
                cause: undefined,                
                expected: true,
            }
            await this.#cartDao.deleteAllProducts(order._id);
            await this.#sendNotificationEmail(newOrder)
            await this.#sendNotificationSMS(newOrder)
            await this.#sendNotificationWhatsapp(newOrder)
            return {
                status: 200,
                result:hasJsonResult.SUCCESS,
                message: 'creating order.',
                code: 'create_order',                
                payload:{  data : newOrder}, 
                cause: undefined,                
                expected: true,
            }
        } 
        catch (err) {
            if (!err.expected)
                err = {
                    status: 500,
                    result:hasJsonResult.ERROR,
                    message: 'Error creating order.',
                    code: 'create_order_error',
                    payload:{  data : undefined}, 
                    expected: true,
                }

            delete err.expected
            throw err
        }            

    }
    #sendNotificationEmail = async (order) => {
        try {
            const template = newOrderEmailTemplate(order)
            await transporter.sendMail(template)
        } 
        catch (err) {
            if (!err.expected)
                err = {
                    status: 500,
                    result:hasJsonResult.ERROR,
                    message: 'Error sending Email notification.',
                    code: 'send_Email_notification_error',
                    payload:{  data : undefined}, 
                    expected: true,                    
                }
            delete err.expected
            throw err
        }
    }

    #sendNotificationSMS= async(order) =>{
        try {
            await transporterSMS(order.user.phone_number,  'your order has been received and is being processed')
        } 
        catch (err) {
            if (!err.expected)
                err = {
                    status: 500,
                    result:hasJsonResult.ERROR,
                    message: 'Error sending SMS notification.',
                    code: 'send_SMS_notification_error',
                    payload:{  data : undefined}, 
                    expected: true,                    
                }
            delete err.expected
            throw err
        
        }
    }

    #sendNotificationWhatsapp = async(order) =>{
        try {
            
            await transporterWhatsapp(config.CONTACT_PHONE.ADMIN,order);
        } 
        catch (err) {
            if (!err.expected)
                err = {
                    status: 500,
                    result:hasJsonResult.ERROR,
                    message: 'Error sending WHATSAPP notification.',
                    code: 'send_WHATSAPP_notification_error',
                    payload:{  data : undefined}, 
                    expected: true,                    
                }
            delete err.expected
            throw err
        
        }
    }
}


const orderService = new OrderService(OrderModel, cartDao, orderDao, idGenerator)
export default orderService
