import {Router} from 'express';
// import services from '../daos/index.js';
import __dirname from '../utils/directory/root.directory.js';
import isAdmin from '../middlewares/isadmin.middleware.js';
import productController from '../controllers/product.controller.js';


const path = 'product';
const router = Router();
router.get(`/${path}/search/:term`,productController.getSearch) 
router.get(`/${path}/`,productController.getAll)
router.get(`/${path}/:id`,isAdmin, productController.getById);

// router.post('/',isAdmin,async(req,res)=>{
//     let producto = req.body
//     await services.productService.save(producto)
        //     let products = await services.productService.getAll()
        //     let datos = JSON.parse(products)
        //     datos.push({cartID:req.session.user.cartID})
        //     global.io.emit('lista',datos)
//     res.send({status:"success", message:"Product Added"})
// })
router.post(`/${path}/`,isAdmin, productController.create)
router.put(`/${path}/`,isAdmin, productController.updateById)


// router.put('/',isAdmin,async(req,res)=>{
//     let product = req.body
//     await services.productService.update(product)
//     let products = await services.productService.getAll()
//     let datos = JSON.parse(products)
//     datos.push({cartID:req.session.user.cartID})
//     datos.io.emit('lista',datos)
//     res.send({status:"success", message:"Product Update"})
// })
// router.delete('/',isAdmin,async(req,res)=>{
//     let id = req.body
//     await services.productsService.deleteById(id.delete)
//     let products = await services.productService.getAll()
//     let datos = JSON.parse(products)
//     datos.io.emit('lista',datos)
//     res.send({status:"success", message:"Product Delete"})
// })




export default router;