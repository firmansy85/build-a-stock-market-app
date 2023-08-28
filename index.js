//stock market portofolio app by joni playboy oye.com

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//api key pk_15b6dc09b48142ac8ff3496021bb80f4 -> copy dari iexclod
function call_api(finishedAPI, ticker) {
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_15b6dc09b48142ac8ff3496021bb80f4', { json: true }, (err, res, body) => {
    if (err) {return console.log(err);}
    if (res.statusCode === 200){
        //console.log(body);
        finishedAPI(body);
    };
  });
};

//set handlebars middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//const otherstuff = "hello there, this is other stuff";

//set handlebars index GET routes
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
           res.render('home', {
        //stuff: "This is stuff..."
           stock: doneAPI
        });
    }, "fb");
});


//set handlebars index POST routes
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
           //posted_stuff = req.body.stock_ticker;
           res.render('home', {
           stock: doneAPI,
           //posted_stuff: posted_stuff
        });
    }, req.body.stock_ticker);
});

//about routes
app.get('/about.html', function (req, res) {
    res.render('about');
});

// create static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on Port ' + PORT));