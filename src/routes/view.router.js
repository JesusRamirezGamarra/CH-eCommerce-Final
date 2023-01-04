import  { Router } from 'express';
import isLoggedIn from '../middlewares/isauth.middleware.js';
import isAdmin from '../middlewares/isadmin.middleware.js';
import logout from '../middlewares/logout.middleware.js'
import productController from '../controllers/product.controller.js';


const router = Router();
router.get('/',         productController.getAll);
router.get(`/profile`,  isLoggedIn, async(req, res) => res.render('profile', { user : req.session.user})  );
router.get('/about',    (req,res)=>res.render('about'));
router.get('/login',    (req,res)=>res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/admin',    isAdmin, (req,res)=>  res.render("homeAdmin", {user: req.session.user} ) ) ;
router.get('/create/product',   isLoggedIn,   isAdmin, (req,res)=>  res.render("homeAdmin", {user: req.session.user} ) ) ;
router.get('/read/product',     isLoggedIn,   isAdmin, (req,res)=>  res.render("homeAdmin", {user: req.session.user} ) ) ;
router.get('/update/product',   isLoggedIn,   isAdmin, (req,res)=>  res.render("homeAdmin", {user: req.session.user} ) ) ;
router.get('/delete/product',   isLoggedIn,   isAdmin, (req,res)=>  res.render("homeAdmin", {user: req.session.user} ) ) ;

router.get('/logout',   logout);


export default router;


