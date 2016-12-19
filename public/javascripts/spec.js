var express = require('express');
var calculator = express();


const ADD = 1;
const SUBTRACT = 2;
const MULTIPLY = 3;
const DIVIDE = 4;
const RESULT = 5;

var memoryValue = Number(0);
var operationValue = Number(0);
var operandValue = Number(0);
var tempOperandValue = null;
var indicatorValue = Number(0);
var operandSetted = false;
var clearCalculator = true;
var lastOperation;
var intermediateVal = null;

calculator.add = function (a, b) {
    return a + b;
};

calculator.subtract = function (a, b) {
    return a - b;
};

calculator.multiple = function (a, b) {
    return a * b;
};

calculator.divide = function (a, b) {
    return a / b;
};

calculator.clear = function () {
    operandValue = Number(0);
    operationValue = Number(0);
    indicatorValue = Number(0);
    tempOperandValue = null;
    clearCalculator = true;

};

calculator.isMemoryEmpty = function () {
    return Number(memoryValue) == 0;
};

calculator.setOperand = function (operand) {
    var changedOperand = Number(operand);
    if ((Number(lastOperation) == RESULT || Number(lastOperation) == 0) && clearCalculator) {
        calculator.clear();
    } else if (Number(lastOperation) == RESULT && Number(operandValue) != 0) {
        var operandBefore = operandValue;
        if (Number(operationValue) == SUBTRACT) {
            operandBefore = Number(operandBefore) * (-1);

            changedOperand = Number(changedOperand) * (-1);
        }
        intermediateVal = operandBefore;
        tempOperandValue = operandBefore;
    }

    indicatorValue = Number(operand);
    operandValue = Number(changedOperand);
    operandSetted = true;
};


function calculate() {
    var result = operandValue;
        switch (Number(operationValue)) {
            case ADD:
                result = calculator.add(tempOperandValue, operandValue);
                break;
            case SUBTRACT:
                result = calculator.subtract(tempOperandValue, operandValue);
                break;
            case MULTIPLY:
                result = calculator.multiple(tempOperandValue, operandValue);
                break;
            case DIVIDE:
                result = calculator.divide(tempOperandValue, operandValue);
                break;
        }
    result = +result.toFixed(10);
    indicatorValue = result;
    tempOperandValue = result;

}


calculator.callOperation = function (operation) {
    if (Number(operation) == RESULT && operandSetted) {
        if (intermediateVal != null) {
            calculator.setOperand(intermediateVal);
            intermediateVal = null;
        }
    }
    if (tempOperandValue == null) {
        tempOperandValue = operandValue;
    }
    if (Number(operationValue) != 0 && (Number(operation) == RESULT || (operandSetted && clearCalculator))) {
        calculate();
    } else if (operandSetted && !clearCalculator && Number(operation) != RESULT) {
        tempOperandValue = operandValue;
    }

    if (Number(operation) != RESULT) {
        intermediateVal = null;
        operationValue = Number(operation);
        operandValue = Number(indicatorValue);
        clearCalculator = true;
    } else if (Number(operation) == RESULT && !operandSetted) {
        clearCalculator = false;
    }
    lastOperation = Number(operation);
    operandSetted = false;

};

calculator.addToMemory = function () {
    var newVal;
    if (operandSetted) {
        newVal = Number(operandValue);
    } else {
        newVal = Number(tempOperandValue);
    }
    memoryValue = calculator.add(memoryValue, newVal);
};

calculator.storeToMemory = function () {
    if (operandSetted) {
        memoryValue = Number(operandValue);
    } else {
        memoryValue = Number(tempOperandValue);
    }
};

calculator.clearMemory = function () {
    memoryValue = Number(0);
};

calculator.readMemory = function () {
    return memoryValue.toString();
};

calculator.getResult = function () {
    return indicatorValue;
};

calculator.getOperator = function () {
    return operationValue;
};

module.exports = calculator;



