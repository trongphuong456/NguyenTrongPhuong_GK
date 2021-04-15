const fs = require('fs');

module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: "Welcome to Phuong Gymer | Add a new gymer"
            ,message: ''
        });
    },
    addPlayer: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let Ho = req.body.Ho;
        let Ten = req.body.Ten;
        let thangdki = req.body.thangdki;
        let sothang = req.body.sothang;
        let Tien = req.body.Tien;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = Ten + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `gymer_tb` WHERE Ten = '" + Ten + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add-player.ejs', {
                    message,
                    title: 'Welcome to Phuong gymer | Add a new gymer'
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `gymer_tb` (Ho, Ten, Tien, thangdki, image, sothang) VALUES ('" +
                            Ho + "', '" + Ten + "', '" + Tien + "', '" + thangdki + "', '" + image_name + "', '" + sothang + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-player.ejs', {
                        message,
                        title: 'Welcome to Phuong gymer | Add a new gymer'
                    });
                }
            }
        });
    },
    editPlayerPage: (req, res) => {
        let playerId = req.params.stt;
        let query = "SELECT * FROM `gymer_tb` WHERE stt = " + playerId + " ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title:'Edit  Player'
                ,player: result[0]
                ,message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        let playerId = req.params.stt;
        let Ho = req.body.Ho;
        let Ten = req.body.Ten;
        let Tien = req.body.Tien;
        let thangdki = req.body.thangdki;

        let query = "UPDATE `gymer_tb` SET `Ho` = '" + Ho + "', `Ten` = '" + Ten + "', `Tien` = '" + Tien + "', `thangdki` = '" + thangdki + "' WHERE `gymer_tb`.`stt` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePlayer: (req, res) => {
        let playerId = req.params.stt;
        let getImageQuery = 'SELECT image from `gymer_tb` WHERE stt = "' + playerId + '"';
        let deleteUserQuery = 'DELETE FROM gymer_tb WHERE stt = "' + playerId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};