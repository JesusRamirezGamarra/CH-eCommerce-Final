import {Router} from 'express';
// import services from "../daos/index.js";
// import __dirname from "../utils/directory/root.directory.js";
import cartController from '../controllers/cart.controller.js'
import isLoggedIn from '../middlewares/isauth.middleware.js';
import isAdmin from '../middlewares/isadmin.middleware.js';

const path = 'cart';
const router = Router();
router.get(`/${path}/checkout`, isLoggedIn, cartController.getProducts );
router.post(`/${path}/`, isLoggedIn, cartController.addProducts);
router.post(`/${path}/addproductstoorder`, isLoggedIn, cartController.addProductsToOrder);
router.delete(`/${path}/`, isLoggedIn, cartController.deleteProduct);


// router.get(`/${path}/`,  isLoggedIn, cartController.getProducts)
// router.post(`/${path}/`, isLoggedIn, cartController.addProduct)
// router.delete(`/${path}/:productId`, isLoggedIn, cartController.deleteProduct)





// router.get('/:cid/products',async(req,res)=>{
//     let cid = req.params.cid
//     if(isNaN(cid)) return res.status(400).send({error:"El valor no es numerico"})
//     if(parseInt(cid)<1) return res.status(404).send("No hay un carro con ese id")
//     let list = await services.cartService.getCartProducts(cid)
//     res.send(list)
// })
// router.post('/',async(req,res)=>{
//     let create = await services.cartService.createCart()
//     res.send(`El id de su carrito es ${create}`)
// })
// router.post('/products/:pid',async(req,res)=>{
//     let info = {pid:req.params.pid,cid:req.session.user.cartID}
//     if(isNaN(info.pid)) return res.status(400).send({error:"El valor no es numerico o no existe"})
//     await services.cartService.addProduct(info)
//     let list = await services.cartsService.getCartProducts(req.session.user.cartID)
//     req.io.emit('cart',list)
//     res.redirect('/')
// })
// router.delete('/:cid',async(req,res)=>{
//     let cid = req.params.cid
//     if(isNaN(cid)) return res.status(400).send({error:"El valor no es numerico"})
//     await services.cartService.deleteById(cid)
//     res.send(`Carrito ${cid} eliminado con exito`)
// })
// router.post('/delete/:pid',async(req,res)=>{
//     let cid = {pid:req.params.pid,cid:req.session.user.cartID}
//     if(isNaN(cid.cid)) return res.status(400).send({error:"El valor no es numerico"})
//     let deleten = await services.cartService.deleteByCidAndPid(cid)
//     res.redirect('/')
// })
// router.post('/endshop',async(req,res)=>{
//     let user = req.session.user
//     let result = await services.cartService.endShop(req.session.user,req.session.user.cartID)
//     res.render('endShop',{user})
// })


export default router;