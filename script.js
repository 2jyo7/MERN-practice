var express = require("express");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("./public"));


app.use(function(req, res, next) {
    console.log("hello from middleware", res);
    next();
});

app.get('/', (req, res) => {
    res.render('index'); 
})

app.get('/contact', (req, res) => {
    res.render('contact', {name: 'John'}); 
})

app.get('/error', (req, res) => {
    throw new Error("Something went wrong") 
})

app.get('/profile/:username', (req, res) => {
    res.send(`Hello from ${req.params.username}`); 
})

app.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  })

app.listen(3000);

