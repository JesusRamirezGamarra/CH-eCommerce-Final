import productService from '../services/product.service.js'
import moment from 'moment';
import { logger } from '../utils/logger/isLogger.js';


class ProductController {
    #productService = productService
    constructor() {
        this.#productService = productService
    }
    create = async (req, res) => {
        try {
            const product = await this.#productService.create(req);
            res.status(201).json(product);     
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err.err);
        }
    }
    getSearch = async (req, res) => {
        try {
            const products = await this.#productService.getSearch(req);
            res.render("home", { data: products.payload.data, user : req.session.user});
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err.err);
        }
    }    
    getAll = async (req, res) => {
        try {
            const products = await this.#productService.getAll();
            res.render("home", { data: products.payload.data, user : req.session.user , isAdmin : ( req.session.user && req.session.user.role === 'admin') ? true : false });
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err.err);
        }
    }
    getById = async (req, res) => {
        try {
            const product = await this.#productService.getById(req);
            res.status(201).json(product);
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err.err);
        }
    }
    updateById = async (req, res) => {
        try {
            const updatedProduct = await this.#productService.updateById(req);
            res.status(201).json(updatedProduct);
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err.err);
        }
    }
    deleteById = async (req, res) => {
        try {
            await this.#productService.deleteById(req);
            res.status(204).json();
        } catch (err) {
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            res.status(err.status).json(err.err);
        }
    }
}


const productController = new ProductController(productService);
export default productController;
