var express = require('express');
var app = express();
var authRouter = require('./routes/auth');
var categoryRouter = require('./routes/category');

app.use(express.json());
app.use('/auth', authRouter);
app.use('/category', categoryRouter);

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broken!')
});

app.listen(3000, function() {
    console.log('success!!');
});
