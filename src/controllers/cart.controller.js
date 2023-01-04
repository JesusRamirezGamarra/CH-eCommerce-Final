import cartService from '../services/cart.service.js'
import orderService from '../services/order.service.js';
import config, {hasJsonResult} from '../config/config.js'
import moment from 'moment';
import { logger } from '../utils/logger/isLogger.js';

class CartController {
    #cartService
    #orderService
    constructor(cartService,orderService) {
        this.#cartService = cartService
        this.#orderService = orderService
    }

    // create = async (req, res) => {
    //     try {
    //         //const cart = await this.#cartService.create(req)
    //         res.status(201).json(cart)
    //     } catch (err) {
    //         res.status(err.status).json(err)
    //     }
    // }
    getProducts = async (req, res) => {
        try {
            const cart = await this.#cartService.getProducts(req)
            res.status(201).render('checkout',{ products : cart  , user: req.session.user }) ;
            //res.status(201).json(cart)
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err)
        }
    }
    addProducts = async (req, res) => {
        try {
            const updatedProduct = await this.#cartService.addProducts(req)
            res.status(201).send(updatedProduct)
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err.err)
        }
    }
    addProductsToOrder = async (req, res) => {
        try {
            const cart = await this.#cartService.addProductsToOrder(req)
            const order =  {
                user : req.session.user,
                products : cart.payload.data
            }
            const updatedOrder = await this.#orderService.create(order)


            res.status(201).send(updatedOrder)
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err.err)
        }
    } 
    
    
    // addProduct = async (req, res) => {
    //     try {
    //         const updatedProduct = await this.#cartService.addProduct(req)
    //         res.status(201).json(updatedProduct)
    //     } catch (err) {
    //         res.status(err.status).json(err)
    //     }
    // }
    deleteProduct = async (req, res) => {
        try {
            const cart = await this.#cartService.deleteProduct(req)
            res.status(200).send(cart);
            //res.status(201).render('checkout',{ products : cart  , user: req.session.user }) ;
            //res.status(204).json()

        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err)
        }
    }
}


const cartController = new CartController(cartService,orderService)
export default cartController
