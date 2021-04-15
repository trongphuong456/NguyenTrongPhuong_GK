module.exports.postLogin = (req, res, next) => {
    // console.log(req.cookies);
    cookieUser = req.cookies['user-id'];

    if (cookieUser) {
        next();
    } else {
        res.redirect('/login');
    }
}