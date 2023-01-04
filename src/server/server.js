import express from 'express';
import passport from 'passport';
import session from 'express-session';
import handlebars from 'express-handlebars';
import moment from 'moment';
import flash from 'connect-flash';
import Socket from '../services/socket.services.js';
import initializePassport from '../middlewares/auth/passport-local-auth.middleware.js';
import {___dirname} from '../utils/directory/root.directory.js';
import config from '../config/config.js';
import MongoStore from 'connect-mongo';
import { logger } from '../utils/logger/isLogger.js';
import infoRouter from '../routes/info.router.js';
import viewRouter from '../routes/view.router.js';
import loginRouter from '../routes/login.router.js';
import userRouter from '../routes/user.router.js';
import productRouter from '../routes/product.router.js';
import cartRouter from "../routes/cart.router.js";
import orderRouter from "../routes/order.router.js";
import Dao from '../daos/index.js';

export default class Server{
    constructor() {
        this.app = express();
        this.PORT = config.INIT.PORT;
        this.server = this.app.listen(this.PORT, () => { 
            console.log(`🎁  ~  Server listening on port : ${this.PORT} - worker process with ${process.pid} started , ready : http://localhost:${this.PORT}/`)
        });
        this.server.on('error', (err) => console.log(`Server Error:: ${err}`));
        this.socket = new Socket(this.server);
        this.sessionStorage();
        this.middlewares();
        this.routes();
        this.engines();
    }
    
    sessionStorage(){
        const ttlSeconds = 60;
        this.app.use(session({
            store:MongoStore.create({
                mongoUrl:config.SESSION.URL_CONNECT,
                ttl:3600
            }),
            secret:config.SESSION.SECRET,
            resave:false,
            saveUninitialized:false,
            cookie: {
                maxAge: ttlSeconds * 1000 * 30,
                expires: ttlSeconds * 1000 * 30,
                secure : false,
            },  
        }));
    }

    middlewares() {
        this.app.use(express.static(`${___dirname}/public`));
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
        initializePassport();
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use(flash());
        this.app.use( (req, res, next) =>{
            res.locals.success_alert_message = req.flash('success_alert_message');
            res.locals.error_message = req.flash('error_message');
            res.locals.error = req.flash('error');
            next();
        });        
    }

    routes() {

        this.app.use('/',infoRouter);
        this.app.use('/',viewRouter);
        this.app.use('/api', loginRouter);
        this.app.use('/api', userRouter);
        this.app.use('/api',productRouter);
        this.app.use('/api',cartRouter);
        this.app.use('/api',orderRouter);
        
        this.app.all('*', (req, res) => {
            try{
                let url =  req.protocol + '://' + req.get('host') + req.originalUrl;
                logger.warn(`${new moment().format('DD/MM/YYYY HH:mm:ss')}  || PATH: ${req.path} || Mehotd: ${req.method} || status: Page Not Fount || URL: ${url }`)
                res.status(404).render("404");
            }
            catch(err){
                logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            }
        })        
    }

    engines() {
        const layoutDirPath   = ___dirname + "/views/layouts";
        const defaultLayerPth = ___dirname + "/views/layouts/main.hbs";
        const partialDirPath  = ___dirname + "/views/partials";        
        this.app.engine('.hbs',handlebars.engine({
            extname : ".hbs",
            layoutsDir: layoutDirPath,
            defaultLayout: defaultLayerPth,
            partialsDir: partialDirPath,
            helpers : {
                subtotal :  (val1,val2)=>{     return val1 * val2; }
            }
        }));
        this.app.set('view engine','.hbs');
        this.app.set('views',___dirname+'/views')        
    }
    
    listen() {
        this.socket;
    }
}



