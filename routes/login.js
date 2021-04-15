const { decodeBase64 } = require("bcryptjs");

module.exports = {
    getLogin: (req, res) => {
        res.render('login.ejs', {
            title: 'Login',
            message: ''
        });
    },

    postLogin: (req, res) => {
        const {username, password} = req.body;
        // console.log(username, password);
        const query = "select * from `user` where username='" + username + "' and password='" + password + "'";
        db.query(query, (err, result) => {
            if (err || result.length == 0) {
                // console.log('login loi');
                res.redirect('/login');
            } else if (result.length > 0) {
                // console.log('dang nhap thanh cong');
                res.cookie('user-id', password);
                res.redirect('/');
            }
        });
        console.log(req.body);
    }
}