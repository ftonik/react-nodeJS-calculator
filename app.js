var debug = require('debug')('CalcNodeJS');
var express = require('express'),
    path = require('path'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser');
var calculator = require('./public/javascripts/spec');


app.use(express.static(path.join(__dirname, 'public')));
// Set view path
app.set('views', path.join(__dirname, 'views'));
// set up ejs for templating. You can use whatever
app.set('view engine', 'ejs');

// Set up Routes for the application
require('./routes/index.js')(app);

//Route not found -- Set 404
app.get('*', function(req, res) {
    res.json({
        'route': 'Sorry this page does not exist!'
    });
});

var server = app.listen(port, function() {
    console.log('Express server listening on port ' + server.address().port);
});

var io = require('socket.io')(server);
app.io = io;

io.on('connection', function (socket) {
    console.info('Connected');

    socket.emit('memory', 'msg');

    socket.emit('result', 'msg');

    socket.on('disconnect', function () {
        console.log('Disconnected');
    });

    socket.on('clearMemory', function () {
        calculator.clearMemory();
    });

    socket.on('clearCalc', function () {
        calculator.clear();
    });

    socket.on('setOperand', function (data) {
        var digit = data.digit;
        calculator.setOperand(digit);
    });

    socket.on('setOperation', function (data) {
        var operation = data.operation;
        calculator.callOperation(operation);
        var lastOperation = calculator.getOperator();
        if (Number(operation) == 5 ||
            calculator.getResult() != 0 ||
            (Number(operation) != 5 && Number(calculator.getResult()) == 0 && Number(lastOperation) != 0)) {
            var result = calculator.getResult();
            var returnValue = result != null && !isNaN(result) && result != Infinity ? result : "Error";
            app.io.emit('result', {resultVal: returnValue.toString()});
        } else {
            app.io.emit('result', {resultVal: "false"});
        }
    });

    socket.on('readMemory', function () {
        var memoryVal = calculator.readMemory();
        calculator.setOperand(memoryVal);
        app.io.emit('memory', {resultVal: memoryVal});
    });

    socket.on('storeToMemory', function (data) {
        var stNumber = data.storeNumber;
        calculator.setOperand(stNumber);
        calculator.storeToMemory();
    });

    socket.on('addToMemory', function (data) {
        var addNumber = data.addNumber;
        calculator.setOperand(addNumber);
        calculator.addToMemory();
    });

});
