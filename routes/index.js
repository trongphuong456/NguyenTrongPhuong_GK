module.exports = {
    getHomePage: (req, res) => {
        const search = req.query.search;
        //console.log(search);
        // let query = "SELECT * FROM `gymer_tb` ORDER BY stt ASC"; // query database to get all the players
        let query ="";

        if(search){
            query = "SELECT * FROM `gymer_tb` where Ten like '%" + search + "%' ORDER BY stt ASC";
        }else {
            query = "SELECT * FROM `gymer_tb` ORDER BY stt ASC"; // query database to get all the players
        }


        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Phuong gymers "
                ,gymer_tb: result
            });
        });
    },
};