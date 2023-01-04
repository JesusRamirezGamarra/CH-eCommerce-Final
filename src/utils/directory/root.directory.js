import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);
export const __dirname      = path.dirname(_dirname);
export const ___dirname     = path.dirname(__dirname);
export const ____dirname    = path.dirname(___dirname);


export default __dirname;
