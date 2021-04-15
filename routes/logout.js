module.exports.getLogout = (req, res) => {
    res.clearCookie('user-id');
    res.redirect('/');
}