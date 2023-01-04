export default class CategoryModel {
    #id
    #name
    #active
    constructor(id,name,active) {
        this.#id = id
        this.#name =name
        this.#active =active
    }
    set id(id) {
        if (!id)
        throw {
            message: 'The Category ID field is required.',
            code: 'id_required',
            expected: true,
            status: 400,
        }
        if (typeof id !== 'string')
        throw {
            message: 'The ID must be a string.',
            code: 'id_must_be_string',
            status: 400,
            expected: true,
        }
        this.#id = id
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
    set active(active) {
        const MIN_LENGTH = 5
        if (active === true || active ===false)
        throw {
            status: 400,
            expected: true,
            err :{
                result : hasJsonResult.ERROR,
                message: 'The active is required.',
                code: 'active_required',
                payload:{  data : undefined }, 
                cause: undefined,                       
            }
        }
    }
    get dto() {
        const newCategory = {
            id: this.#id,
            name: this.#name,
            active: this.#active,
        }
        return JSON.parse(JSON.stringify(newCategory))
    }
}
