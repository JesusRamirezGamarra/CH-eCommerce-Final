import {hasJsonResult} from '../../config/config.js'

export default class ProductModel {
    #name
    #description
    #thumbnail
    #price
    #stock
    constructor({ name, description, thumbnail, price, stock }) {
        this.name = name
        this.description = description
        this.thumbnail = thumbnail
        this.price = Number(price)
        this.stock = Number(stock)
    }
    set name(name) {
        const MIN_LENGTH = 5
        if (!name)
        throw {
            status: 400,
            expected: true,
            err :{
                result : hasJsonResult.ERROR,
                message: 'The name is required.',
                code: 'name_required',
                payload:{  data : undefined }, 
                cause: undefined,                       
            }
        }
        if (typeof name !== 'string')
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: 'The name must be a string.',
                code: 'name_must_be_string',
                payload:{  data : undefined }, 
                cause: undefined,                   
            }
        }
        if (name.length < MIN_LENGTH)
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: `The name must have at least ${MIN_LENGTH} characters.`,
                code: 'invalid_name_length',
                payload:{  data : undefined }, 
                cause: undefined,                    
            }
        }
        this.#name = name
    }
    set description(description) {
        const MIN_LENGTH = 10
        if (!description)
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: 'The description is required.',
                code: 'description_required',
                payload:{  data : undefined }, 
                cause: undefined,                    
            }
        }
        if (description.length < MIN_LENGTH)
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: `The description must have at least ${MIN_LENGTH} characters.`,
                code: 'invalid_description_length',
                payload:{  data : undefined }, 
                cause: undefined,                     
            }
        }
        this.#description = description
    }
    set thumbnail(thumbnail) {
        const MIN_LENGTH = 20
        if (!thumbnail)
        throw {
            status: 400,
            expected: true,
            err : {  
                result : hasJsonResult.ERROR,
                message: 'The thumbnail is required.',
                code: 'thumbnail_required',
                payload:{  data : undefined }, 
                cause: undefined,                   
            }
        }
        if (thumbnail.length < MIN_LENGTH)
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: `The thumbnail path must have at least ${MIN_LENGTH} characters.`,
                code: 'invalid_thumbnail_length',
                payload:{  data : undefined }, 
                cause: undefined,                   
            }
        }
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif']
        const extension = thumbnail.split('.').pop()
        if (!validExtensions.includes(extension))
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: 'The thumbnail must be jpg, jpeg, png or gif.',
                code: 'invalid_thumbnail_extension',
                payload:{  data : undefined }, 
                cause: undefined,                   
            }
        }
        this.#thumbnail = thumbnail
    }
    set price(price) {
        const MIN_PRICE = 1
        if (!price)
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: 'The price is required.',
                code: 'price_required',
                payload:{  data : undefined }, 
                cause: undefined,                   
            }
        }
        if ( isNaN(price) || typeof price !== 'number' )
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: 'The price must be a number.',
                code: 'price_must_be_number',
                payload:{  data : undefined }, 
                cause: undefined,                      
            }            
        }
        if (price < MIN_PRICE)
        throw {
            status: 400,
            expected: true,
            err : {  
                result : hasJsonResult.ERROR,
                message: `The price must be greater than ${MIN_PRICE}.`,
                code: 'invalid_price',
                payload:{  data : undefined }, 
                cause: undefined,    
            }
        }
        this.#price = price
    }
    set stock(stock) {
        const MIN_STOCK = 50
        if (!stock)
        throw {
            status: 400,            
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: 'The stock is required.',
                code: 'stock_required',
                payload:{  data : undefined }, 
                cause: undefined,                 
            }
        }
        if ( isNaN(stock) || typeof stock !== 'number' )
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: 'The stock must be a number.',
                code: 'price_stock_be_number',
                payload:{  data : undefined }, 
                cause: undefined,                      
            }
        }
        if (stock < MIN_STOCK)
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: `The stock must be greater than ${MIN_STOCK}.`,
                code: 'invalid_stock',
                payload:{  data : undefined }, 
                cause: undefined,                      
            }
        }
        this.#stock = stock
    }    
    get dto() {
        const data = {
            name: this.#name,
            description: this.#description,
            thumbnail: this.#thumbnail,
            price: this.#price,
            stock: this.#stock,
        }
        return JSON.parse(JSON.stringify(data))
    }
}
