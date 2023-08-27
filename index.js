//stock market portofolio app by joni playboy oye.com

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

//set handlebars middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//const otherstuff = "hello there, this is other stuff";

//set handlebars routes
app.get('/', function (req, res) {
    res.render('home', {
        stuff: "This is stuff..."
        //stuff: otherstuff
    });
});

// create static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on Port ' + PORT));