import { Router } from "express";
import { fork } from 'child_process'
import os from 'os';
import compression from "compression";
import moment from 'moment'
import {__dirname} from '../utils/directory/root.directory.js';
import { logger } from '../utils/logger/isLogger.js';


const router = Router();
const infodelProceso = {
    args: process.argv.slice(2),
    execPath: process.cwd(),
    plataforma: process.platform,
    processID: process.pid,
    nodeVersion: process.version,
    carpeta: process.argv[1],
    memoria:  ` ${Math.round( JSON.stringify(process.memoryUsage.rss())/ 1024 / 1024 * 100) / 100} MB`,
    cantidadNucleos:  os.cpus().length,
}
const scriptPath = __dirname +  '/operation.js';
router.get('/random', (req, res) => {
    try{
        const cant = req.query.cant || ( 100 * 1000 * 1000 ) // 100000000
        const computo  = fork(scriptPath)
        computo.send(cant)
        computo.on('message', (resultado) => {
            res.json({
                result: resultado
            })
        })
    }
    catch(err){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
    }        
})
router.get('/info',compression(), async(req, res,) => {
    try{
        logger.info(`PATH: ${req.path} || METHOD: ${req.method}`)
        const data = infodelProceso
        res.render('info', {data})
    }
    catch(err){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
    }
})
export default router;
