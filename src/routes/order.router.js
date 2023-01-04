
import { Router } from 'express'
import orderController from '../controllers/order.controller.js';
import isLoggedIn from '../middlewares/isauth.middleware.js';

const path = 'order';
const router = new Router()

router.post(`/${path}/checkout`, isLoggedIn, orderController.create );

export default router
