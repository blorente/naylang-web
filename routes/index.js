const express = require('express');
const router = express.Router();
const app = require('../app.js');
const path = require('path');

let Interpreter = require('./Interpreter.js');

/* GET home page. */
router.get('/', function(req, res) {
    Interpreter.interpreters.push(new Interpreter(reqIndex));

    let options = {
        maxAge: 1000 * 60 * 60, // would expire after 1 hr
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
    };

    res.cookie('reqId', reqIndex, options);
    res.render('index', { title: 'Naylang Grace Interpreter', commandResult: "Hello World" });
    reqIndex++;
});

app.post('/', (req, res) => {
    console.log(req.cookies);
    res.render('index', { title: 'Naylang Grace Interpreter', commandResult: "Hello Worldd" });
});

module.exports = router;
