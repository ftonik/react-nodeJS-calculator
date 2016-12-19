var MAXNUMBERLENGHT = 9;
var NOOPERATION = 0;
var RESULTOPERATION = 0;
var STARTINDICATORVALUE = "0";
var BLOCKUIRESULT = "Error";
var indicatorVal = STARTINDICATORVALUE;

var socket = io.connect('http://localhost:3000');

socket.on('memory', function (data) {
    if (data.resultVal == undefined) return;
    memoryVal = data.resultVal;
    number = "0";
    indicatorVal = memoryVal;
});

socket.on('result', function (data) {
    if (data.resultVal == undefined) return;
    var result = data.resultVal;
    if (operation == RESULTOPERATION || result != "false") {
        number = result;
        indicatorVal = result;
    } else {
        number = "0";
    }
    memoryVal = null;
    operation = 0;
    operationSet = true;
});

var memoryVal = null;
var number = STARTINDICATORVALUE;
var operation = NOOPERATION;
var operationSet = false;
indicatorVal = number;


function clear() {
    socket.emit('clearCalc');
    number = "0";
    operation = 0;
    operationSet = false;
    indicatorVal = number;
}

function clearMemory() {
    socket.emit('clearMemory');
}

function addToMemory() {
    if ($('#monitor').val() == "null") return;
    socket.emit('addToMemory', {addNumber: number});
}

function storeToMemory() {
    if ($('#monitor').val() == "null") return;
    socket.emit('storeToMemory', {storeNumber: number});
    number = STARTINDICATORVALUE;
    operationSet = true;
}

function readMemory() {
    if ($('#monitor').val() == "null") return;
    socket.emit('readMemory');
}

function addDig(num) {
    if (num == ",") num = ".";
    if (number.indexOf(".") != -1 && num == ".") return;
    if ($('#monitor').val() == BLOCKUIRESULT) return;
    if (number == STARTINDICATORVALUE || operationSet) {
        if (num == ".") {
            number = "0.";
        } else
            number = num;
    }
    else {
        if (number.length < MAXNUMBERLENGHT) {
            number += num;
        }
    }
    indicatorVal = number;
    operationSet = false;
}

function setOperand(a) {
    socket.emit('setOperand', {digit: a});
}

function setOperation(operationVal) {
    if ($('#monitor').val() == "null") return;
    if (memoryVal) {
        number = memoryVal
    }
    operation = operationVal;
    if (!operationSet) {
        setOperand(number);
    }
    socket.emit('setOperation', {operation: operation});
}

$(window).bind("beforeunload", function () {
    clear();
});

$(window).bind("onload", function () {
    clear();
});