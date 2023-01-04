import config from '../../../config/config.js'
import { ___dirname }  from '../../../utils/directory/root.directory.js'

export const newUserEmailTemplate = (user_data) => {

    const mailOptions = {
    from: `${config.CONTACT_EMAIL.ADMIN.ALIAS} <${config.CONTACT_EMAIL.ADMIN.EMAIL}>`,
    to: `${config.CONTACT_EMAIL.ADMIN.ALIAS} <${config.CONTACT_EMAIL.ADMIN.EMAIL}>`,
    subject: 'Welcome to coder shop: ' + user_data.first_name + ' '+ user_data.last_name,
    html: `<p align="center"><p align="center">
    <img src="cid:avatar" alt="BFFs" height="100"></p><p align="center">Coder Shop</p></p>
    <br>
    <h1>User: ${user_data.email}</h1>
        <p><b>Name:</b> ${user_data.first_name} ${user_data.last_name}</p>
        <p><b>Age:</b> ${user_data.age}</p>
        <p><b>Adress:</b> ${user_data.address}</p>
        <p><b>Phone:</b> ${user_data.phone_number}</p>
        <p><img src="${user_data.image_url}" width="100px"/></p>`,
    attachments: [
        {
            filename:'CoderShop',
            path: `${___dirname}/public/img/Logo_Negro.png`,
            cid: 'avatar'
        }
    ]
    }
    return mailOptions
}
