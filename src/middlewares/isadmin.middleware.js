import config from '../config/config.js'

// req.session  && 
const isAdmin = (req, res, next) => {
    try{
        if(!req.session.user && req.session.user.role === 'admin' && req.session.user.email === config.CONTACT_EMAIL.ADMIN.EMAIL) return res.status(401 ).redirect('/login')
        next()
            
        
    }
    catch(e){
        res.redirect('/login')
    }
}


export default isAdmin
