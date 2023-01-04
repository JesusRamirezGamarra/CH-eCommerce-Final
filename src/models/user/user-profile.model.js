export default class UserModel {
    #id
    #password
    #email
    #first_name
    #last_name
    #phone_number
    #image_url
    #encryptPassword
    #address
    #age
    // #role
    // #cartId
    constructor(
        // idGenerator,
        encryptPassword,
        { _id,password, email, first_name, last_name, phone_number, image_url, address, age }
    ) {
        this.id= _id
        this.password = password
        this.email = email
        this.first_name = first_name
        this.last_name = last_name
        this.phone_number = phone_number
        this.image_url = image_url
        this.#encryptPassword = encryptPassword
        this.#address = address
        this.#age = age
    }
    set id(_id) {
        if (!_id)
        throw {
            message: 'The ID is required.',
            code: 'id_required',
            expected: true,
            status: 400,
        }
        // if (typeof _id !== 'string')
        // throw {
        //     message: 'The ID must be a string.',
        //     code: 'id_must_be_string',
        //     status: 400,
        //     expected: true,
        // }
        this.#id = _id
    }
    set password(password) {
        if (!password)
        throw {
            message: 'The password is required.',
            code: 'password_required',
            expected: true,
            status: 400,
        }
        if (typeof password !== 'string')
        throw {
            message: 'The password must be a string.',
            code: 'password_must_be_string',
            status: 400,
            expected: true,
        }
        this.#password = password
    }
    set email(email) {
        if (!email)
        throw {
            message: 'The email is required.',
            code: 'email_required',
            expected: true,
            status: 400,
        }
        if (typeof email !== 'string')
        throw {
            message: 'The email must be a string.',
            code: 'email_must_be_string',
            status: 400,
            expected: true,
        }
        this.#email = email
    }
    set first_name(first_name) {
        if (!first_name)
        throw {
            message: 'The name is required.',
            code: 'first_name_required',
            expected: true,
            status: 400,
        }
        if (typeof first_name !== 'string')
        throw {
            message: 'The name must be a string.',
            code: 'first_name_must_be_string',
            status: 400,
            expected: true,
        }
        this.#first_name = first_name
    }
    set last_name(last_name) {
        if (!last_name)
        throw {
            message: 'The last name is required.',
            code: 'last_name_required',
            expected: true,
            status: 400,
        }
        if (typeof last_name !== 'string')
        throw {
            message: 'The last name must be a string.',
            code: 'last_name_must_be_string',
            status: 400,
            expected: true,
        }
        this.#last_name = last_name
    }
    set phone_number(phone_number) {
        if (!phone_number)
        throw {
            message: 'The phone_number is required.',
            code: 'phone_number_required',
            expected: true,
            status: 400,
        }
        if (typeof phone_number !== 'string')
        throw {
            message: 'The phone_number must be a string.',
            code: 'phone_number_must_be_string',
            status: 400,
            expected: true,
        }
        this.#phone_number = phone_number
    }
    set image_url(image_url) {
        if (!image_url)
        throw {
            message: 'The image is required.',
            code: 'image_required',
            expected: true,
            status: 400,
        }
        if (typeof image_url !== 'string')
        throw {
            message: 'The image must be a string.',
            code: 'image_must_be_string',
            status: 400,
            expected: true,
        }
        this.#image_url = image_url
    }
    set address(address){
        // if (!address)
        // throw {
        //     message: 'The address is required.',
        //     code: 'address_required',
        //     expected: true,
        //     status: 400,
        // }
        if (address && typeof address !== 'string')
        throw {
            message: 'The address must be a string.',
            code: 'address_must_be_string',
            status: 400,
            expected: true,
        }
        this.#address = address        
    }
    set age(age) {
        const MIN_AGE = 18
        if (!age)
        throw {
            status: 400,            
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: 'The age is required.',
                code: 'age_required',
                payload:{  data : undefined }, 
                cause: undefined,                 
            }
        }
        if ( isNaN(age) || typeof age !== 'number' )
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: 'The age must be a number.',
                code: 'age_be_number',
                payload:{  data : undefined }, 
                cause: undefined,                      
            }
        }
        if (age < MIN_AGE)
        throw {
            status: 400,
            expected: true,
            err : {
                result : hasJsonResult.ERROR,
                message: `The age must be greater than ${MIN_AGE}.`,
                code: 'invalid_age',
                payload:{  data : undefined }, 
                cause: undefined,                      
            }
        }
        this.#age = age
    }      


    dto = async () => {
        const data = {
            id: this.#id,
            first_name: this.#first_name,
            last_name: this.#last_name,
            email: this.#email,
            password: await this.#encryptPassword(this.#password),
            phone_number: this.#phone_number,
            image_url: this.#image_url,
        }
        return JSON.parse(JSON.stringify(data))
    }
    dtoProfile = async () => {
        const data = {
            id: this.#id,
            first_name: this.#first_name,
            last_name: this.#last_name,
            email: this.#email,
            password: await this.#encryptPassword(this.#password),
            phone_number: this.#phone_number,
            image_url: this.#image_url,
            address: this.#address,
            age: this.#age,
        }
        return JSON.parse(JSON.stringify(data))
    }    
}
