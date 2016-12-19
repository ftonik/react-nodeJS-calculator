/*Deprecated(Used socket.io)*/

var express = require('express');
var router = express.Router();

var calculator = require('../public/javascripts/spec');

router.get('/clearMemory', function (req, res) {
    calculator.clearMemory();
    res.end();
});

router.get('/clearCalc', function (req, res) {
    calculator.clear();
    res.end();
});

router.post('/setOperation', function (req, res) {
    var operation = req.body.operation;
    calculator.callOperation(operation);
    var lastOperation = calculator.getOperator();
    if (Number(operation) == 5 ||
        calculator.getResult() != 0 ||
        (Number(operation) != 5 && Number(calculator.getResult()) == 0 && Number(lastOperation) != 0)) {
        var result = calculator.getResult();
        var returnValue = result != null && !isNaN(result) && result != Infinity ? result : "Error";
        res.send(returnValue.toString())
    } else {
        res.end();
    }
});

router.post('/setOperand', function (req, res) {
    var digit = req.body.digit;
    calculator.setOperand(digit);
    res.end();
});

router.get('/readMemory', function (req, res) {
    var memoryVal = calculator.readMemory();
    calculator.setOperand(memoryVal);
    res.send(memoryVal);
});

router.post('/storeToMemory', function (req, res) {
    var stNumber = req.body.storeNumber;
    calculator.setOperand(stNumber);
    calculator.storeToMemory();
    res.end();
});

router.post('/addToMemory', function (req, res) {
    var addNumber = req.body.addNumber;
    calculator.setOperand(addNumber);
    calculator.addToMemory();
    res.end();
});

module.exports = router;
