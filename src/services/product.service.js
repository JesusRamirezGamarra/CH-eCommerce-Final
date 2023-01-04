// D:\APP\Backend\CH-eCommerce-Intermediate\src\models\product.model.js
//import productModel from '../models/product-model.js'
import ProductModel from '../models/product/product.model.js';
import { v4 as uuidv4 } from 'uuid';
//import getProductModel from '../models/get-product-model.js'
import GetProductModel from '../models/product/get.product.model.js';
// import { productsDao } from '../daos/product/index.js';
import { productDao } from '../daos/product/index.js';
import config, {hasJsonResult} from '../config/config.js'
// import {hasJsonMessage} from '../config/config.js'


class ProductService {
    #newProductModel
    #getProductModel
    #productDao
    #uuidv4
    constructor(productModel, getProductModel, productDao, uuidv4) {
        this.#newProductModel = productModel
        this.#getProductModel = getProductModel
        this.#productDao = productDao
        this.#uuidv4 = uuidv4
    }
    create = async (req) => {
        try {
            const uuid = this.#uuidv4();
            const newProduct = new this.#newProductModel(req.body);
            const newProductDto = newProduct.dto;
            const product =  await this.#productDao.create({ ...newProductDto, sku: uuid });
            const productDto = new this.#getProductModel(product)
            return productDto.oneProductDto;            
        } 
        catch (err) {
            if (!err.expected)
            err = {
                status: 500,
                err: {
                    result:hasJsonResult.ERROR,
                    message: 'Error creating new product.',
                    code: 'post_new_product_error',
                    payload:{  data : { thumbnail :  config.NOTFOUND_THUMBNAIL }}, 
                    cause: undefined,
                }
            }
            delete err.expected
            throw err
        }
    }
    getSearch = async (req) => {
        try {
            let params = {name: eval(`/${req.params.term}/i`)};
            let projection =  { projection: { _id: 1 } } ;
            const allProducts = await this.#productDao.getSearch(params,projection  );
            const products = new this.#getProductModel(allProducts)
            return products.allProductsDto
        } 
        catch (err) {
            if (!err.expected)
            err = {
                status: 500,        
                err: {
                    result:hasJsonResult.ERROR,
                    message: 'Failed to get search products.',
                    code: 'get_search_products_error',
                    payload:{  data : undefined}, 
                    cause: undefined,                    
                }
            }
            delete err.expected
            throw err
        }
    }    
    getAll = async () => {
        try {
            const allProducts = await this.#productDao.getAll()
            const products = new this.#getProductModel(allProducts)
            return products.allProductsDto
        } 
        catch (err) {
            if (!err.expected)
            err = {
                status: 500,        
                err: {
                    result:hasJsonResult.ERROR,
                    message: 'Failed to get all products.',
                    code: 'get_all_products_error',
                    payload:{  data : undefined}, 
                    cause: undefined,                    
                }
            }
            delete err.expected
            throw err
        }
    }
    getById = async (req) => {
        try {
            const product = await this.#productDao.getById(req.params.id)
            if (!product)
            throw {
                status: 404,
                expected: true, 
                err: {
                    result: hasJsonResult.ERROR,
                    message:`Product not found`, 
                    code:`product_not_found`, 
                    payload:{  data : { thumbnail :  config.NOTFOUND_THUMBNAIL }}, 
                    cause: undefined,
                }
            }
            const productDto = new this.#getProductModel(product)
            return productDto.oneProductDto
        } 
        catch (err) {
            if (!err.expected)
            err = {
                status: 500,
                err: {
                    result: hasJsonResult.ERROR,
                    message: 'Error getting product by id.',
                    code: 'get_product_by_id_error',                
                    payload:{  data : { thumbnail :  config.NOTFOUND_THUMBNAIL }}, 
                    cause: undefined ,
                }
            }
            delete err.expected
            throw err
        }
    }
    updateById = async (req) => {
        try {
            
            const currentproduct = await this.#productDao.getById(req.body.id)
            if (!currentproduct)
            throw {
                status: 404,
                expected: true,
                err: {
                    result:hasJsonResult.ERROR,
                    message: 'Product not found.',
                    code: 'product_not_found',
                    payload:{  data : { thumbnail :  config.NOTFOUND_THUMBNAIL }}, 
                    cause: undefined ,    
                }
            }
            const product =  await this.#productDao.updateById(currentproduct._id, req.body)
            const productDto = new this.#getProductModel(product)
            return productDto.oneProductDto
        } 
        catch (err) {
            if (!err.expected)
            err = {
                status: 500,
                err: {
                    result:hasJsonResult.ERROR,
                    message: 'Error updating product.',
                    code: 'update_product_by_id_error',
                    payload:{  data : { thumbnail :  config.NOTFOUND_THUMBNAIL }}, 
                    cause: undefined ,                    
                }
            }
            delete err.expected
            throw err
        }
    }
    deleteById = async (req) => {
        try {
            const product = await this.#productDao.getById(req.params.id)
            if (!product)
            throw {
                status: 404,
                expected: true,
                err: {     
                    result:hasJsonResult.ERROR,
                    message: 'Product not found.',
                    code: 'product_not_found',
                    payload:{  data : { thumbnail :  config.NOTFOUND_THUMBNAIL }}, 
                    cause: undefined ,
                }                        

            }
            return await this.#productDao.deleteById(req.params.id)
        } 
        catch (err) {
            if (!err.expected)
            err = {
                status: 500,
                err: {     
                    result:hasJsonResult.ERROR,                                    
                    message: 'Error removing product by id.',
                    code: 'delete_product_by_id_error',
                    payload:{  data : { thumbnail :  config.NOTFOUND_THUMBNAIL }}, 
                    cause: undefined ,
                }                  
            }
            delete err.expected
            throw err
        }
    }
}


const productService = new ProductService(ProductModel, GetProductModel, productDao, uuidv4)
export default productService
