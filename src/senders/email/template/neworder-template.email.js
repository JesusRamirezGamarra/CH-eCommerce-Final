import config from '../../../config/config.js'
import { ___dirname }  from '../../../utils/directory/root.directory.js'

export const newOrderEmailTemplate = (order) => {
    let products = order.products
    .map((item) => {
        return `<li><b>${item.product.name}</b> </li>
                <p>Price: ${item.product.price}</p>
                <p>Cantidad: ${item.quantity}</p>
                <p>SubTotal: ${item.product.price * item.quantity}</p>
                <p style="margin: 0px;"><img src="${item.product.thumbnail}" width="100px"/></p>`
    })
    .join(' ')
    let total = 0;
    order.products.forEach( (item)=> total+= ( item.quantity * item.product.price) );

    const fullName = `${order.user.first_name} ${order.user.last_name}`
    const subject = `New Order from ${fullName} have a buy ✅`

    const mailOptions = {
    from: `${config.CONTACT_EMAIL.SAC.ALIAS} <${config.CONTACT_EMAIL.SAC.EMAIL}>`,
    to:  `${config.CONTACT_EMAIL.ADMIN.ALIAS} <${config.CONTACT_EMAIL.ADMIN.EMAIL}>`,
    subject: subject.toLocaleUpperCase(),
    html: `<p align="center"><p align="center">
            <img src="cid:avatar" alt="BFFs" height="100"></p><p align="center">Coder Shop</p></p>
            <br>
            <h1 style="margin-bottom: 0px;">Detalles de la orden ${order._id}</h1>
            <hr>
            <p style="margin: 0px;"><img src="${order.user.image_url}" width="100px"/></p>
            <p style="margin: 0px;"><b>Nombre:</b> ${fullName}</p>
            <p style="margin: 0px;"><b>Correo:</b> ${order.user.email}</p>
            <p style="margin: 0px;"><b>Teléfono:</b> ${order.user.phone_number}</p>
            <p style="margin: 0px;"><b>Total:</b> ${total}</p>
            <p style="margin: 0px;"><b>Productos:</b></p>
            <ol>
                ${products}
            </ol>
        `,
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
