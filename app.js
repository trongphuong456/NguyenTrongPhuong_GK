const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

 
const {getHomePage} = require('./routes/index');
 const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
 const {getLogin, postLogin} = require('./routes/login');
const validate = require('./validate/user.validate');
const {getLogout} = require('./routes/logout');

const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qlygymer',
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use(cookieParser());
// routes for the app



app.get('/', validate.postLogin, getHomePage);
app.get('/login', getLogin);
app.get('/add', addPlayerPage);
app.get('/edit/:stt', editPlayerPage);
app.get('/delete/:stt', deletePlayer);
app.get('/logout', getLogout);

app.post('/add', addPlayer);
app.post('/edit/:stt', editPlayer);
app.post('/login', postLogin)

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});