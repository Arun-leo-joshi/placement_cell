// setting flash notification middleware
module.exports.setFlash = async(req, res, next)=>{
    res.locals.flash = {
        'success': req.flash('success'),
        'error':req.flash('error')
    }
    next();
}