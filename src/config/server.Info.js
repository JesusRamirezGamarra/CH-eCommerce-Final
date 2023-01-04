import os from 'os'
import dotenv from 'dotenv'
dotenv.config()

export default {
    OS:             process.env.os,
    ARGUMENTS:      process.argv.slice(2),
    NODE_VERSION:   process.versions.node,
    MEMORY_USAGE:   process.memoryUsage().rss,
    EXEC_PATH:      process.execPath,
    PROCESS_ID:     process.pid,
    NUMOFCPUS:      os.cpus().length,
    CURRENT_WORKING_DIRECTORY: process.cwd(),    
}


