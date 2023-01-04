// const streams = [{level:'info',stream:process.stdout},{level:'warn',stream:pino.destination(__dirname + '/warn.log')},{level:'error',stream:pino.destination(__dirname+'/error.log')}]
// const logger = pino({},pino.multistream(streams))
// logger.info(`connection received in ' /api/product/ ' with method GET`)
// format: winston.format.simple(),
import winston   from 'winston'
import {___dirname} from '../directory/root.directory.js';


const logConfig = {
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ 
            level: 'info' 
        }),
        new winston.transports.File({
                        filename: './logs/warnings.log',
                        level: 'warn',
        }),
        new winston.transports.File({
                        filename: './logs/errors.log',
                        level: 'error',
        }),
    ],
}

// { createLogger, format, transports } 
// const { combine, timestamp, prettyPrint, simple } = format;

// export const logger = createLogger({
//     format: combine(timestamp(), prettyPrint()),
//     transports: [
//         new transports.Console({ level: 'info' }),
//     ]
// });

// export const errorLogger = createLogger({
//     format: combine(timestamp(), simple()),
//     level: 'error',
//     transports: [
//         new transports.File({
//             filename: `${__dirname}/logs/error.log`,
//             level: 'error'
//         })
//     ]
// });

// export const warnLogger = createLogger({
//     format: combine(timestamp(), simple()),
//     level: 'warn',
//     transports: [
//         new transports.File({
//             filename: `${__dirname}/logs/warn.log`,
//             level: 'warn',
//         })
//     ]
// });



    
export const logger = winston.createLogger(logConfig);

