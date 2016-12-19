var assert = require('assert');
var app = require('../app');
var calculator = require('../public/javascripts/spec');
const ADD = 1;
const SUBTRACT = 2;
const MULTIPLY = 3;
const DIVIDE = 4;
const RESULT = 5;

describe('calculator#add', function () {
    it('add 2 numbers', function () {
        assert.equal(calculator.add(2, 3), 5);
    });
});
describe('calculator#multiply', function () {
    it('multiply 2 numbers', function () {
        assert.equal(calculator.multiple(9999999999999, 9999999999999), 9.999999999998e+25);
    });
});
describe('calculator#divide', function () {
    it('divide 2 numbers', function () {
        assert.equal(calculator.divide(9999, 1111), 9);
    });
    it('divide by zero', function () {
        assert.equal(calculator.divide(9999, 0), Infinity);
    });

    it('NaN', function () {
        assert.equal(isNaN(calculator.divide(0, 0)), true);
    });
    it('divide 0 by 0', function () {
        assert.notEqual(calculator.divide(0, 0), 0);
    });
});
describe('calculator#subtract', function () {
    it('subtract 2 numbers', function () {
        assert.equal(calculator.subtract(10, 10), 0);
    });
});

describe('calculator', function () {
    it('test operations without result', function () {
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(ADD);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(RESULT);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(SUBTRACT);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(RESULT);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(ADD);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(RESULT);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(ADD);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(MULTIPLY);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(RESULT);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(MULTIPLY);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(SUBTRACT);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(DIVIDE);
        assert.equal(calculator.getResult(), 0);
        calculator.callOperation(ADD);
        assert.equal(calculator.getResult(), 0);
    });

    it('multi equals : 1+2=3=5=7', function () {
        calculator.clear();
        calculator.setOperand(1);
        assert.equal(1, calculator.getResult());

        calculator.callOperation(ADD);
        assert.equal(1, calculator.getResult());

        calculator.setOperand(2);
        assert.equal(2, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(3, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(5, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(7, calculator.getResult());
    });

    it('multi equals : 1+2=-3=0', function () {
        calculator.clear();
        calculator.setOperand(1);
        assert.equal(1, calculator.getResult());

        calculator.callOperation(ADD);
        assert.equal(1, calculator.getResult());

        calculator.setOperand(2);
        assert.equal(2, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(3, calculator.getResult());

        calculator.callOperation(SUBTRACT);
        calculator.setOperand(3);
        calculator.callOperation(RESULT);
        assert.equal(0, calculator.getResult());
    });

    it('test one operand multi equals : 3+===', function () {
        calculator.clear();
        calculator.setOperand(3);
        assert.equal(3, calculator.getResult());

        calculator.callOperation(ADD);
        assert.equal(3, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(6, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(9, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(12, calculator.getResult());
    });

    it('test operation with one operand multi equals : +2===', function () {
        calculator.clear();
        calculator.callOperation(ADD);
        assert.equal(0, calculator.getResult());

        calculator.setOperand(2);
        assert.equal(2, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(2, calculator.getResult());
        calculator.callOperation(RESULT);
        assert.equal(4, calculator.getResult());
        calculator.callOperation(RESULT);
        assert.equal(6, calculator.getResult());
    });

    it('test no operation multi equals : 2===', function () {
        calculator.clear();
        calculator.setOperand(2);
        assert.equal(2, calculator.getResult());
        calculator.callOperation(RESULT);
        assert.equal(2, calculator.getResult());
        calculator.callOperation(RESULT);
        assert.equal(2, calculator.getResult());
        calculator.callOperation(RESULT);
        assert.equal(2, calculator.getResult());
    });

    it('Test calculation sequence: 2.22*1.11= 2.22+1.11= +4.44=', function () {
        calculator.clear();
        calculator.setOperand(2.22);
        assert.equal(2.22, calculator.getResult());
        calculator.callOperation(MULTIPLY);
        assert.equal(2.22, calculator.getResult());
        calculator.setOperand(1.11);
        assert.equal(1.11, calculator.getResult());
        calculator.callOperation(RESULT);
        assert.equal(2.4642, calculator.getResult());

        calculator.setOperand(2.22);
        assert.equal(2.22, calculator.getResult());

        calculator.callOperation(ADD);
        assert.equal(2.22, calculator.getResult());
        calculator.setOperand(1.11);
        assert.equal(1.11, calculator.getResult());
        calculator.callOperation(RESULT);
        assert.equal(3.33, calculator.getResult());

        calculator.callOperation(ADD);
        assert.equal(3.33, calculator.getResult());

        calculator.setOperand(4.44);
        assert.equal(4.44, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(7.77, calculator.getResult());
    });

    it('Test simple add sequence: 1+2=3', function () {
        calculator.clear();
        calculator.setOperand(1);
        assert.equal(1, calculator.getResult());

        calculator.callOperation(ADD);
        assert.equal(1, calculator.getResult());

        calculator.setOperand(2);
        assert.equal(2, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(3, calculator.getResult());
    });

    it('Test simple divide sequence: 18/6=3', function () {
        calculator.clear();
        calculator.setOperand(18);
        assert.equal(18, calculator.getResult());

        calculator.callOperation(DIVIDE);
        assert.equal(18, calculator.getResult());

        calculator.setOperand(6);
        assert.equal(6, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(3, calculator.getResult());
    });

    it('Test divide sequence with dot: 54/46/= *** 1.17/1.025*1.194029850746269-0.4285714285714286+2.478260869565217=', function () {
        calculator.clear();
        calculator.setOperand(54);
        assert.equal(54, calculator.getResult());
        calculator.callOperation(DIVIDE);
        assert.equal(54, calculator.getResult());
        calculator.setOperand(46);
        assert.equal(46, calculator.getResult());
        calculator.callOperation(DIVIDE);
        assert.equal(1.1739130435, calculator.getResult());
        calculator.callOperation(RESULT);
        assert.equal(1, calculator.getResult());

        calculator.setOperand(1.17);
        assert.equal(1.17, calculator.getResult());
        calculator.callOperation(DIVIDE);
        assert.equal(1.17, calculator.getResult());
        calculator.setOperand(1.025);
        assert.equal(1.025, calculator.getResult());
        calculator.callOperation(MULTIPLY);
        assert.equal(1.1414634146, calculator.getResult());
        calculator.setOperand(1.194029850746269);
        assert.equal(1.194029850746269, calculator.getResult());
        calculator.callOperation(SUBTRACT);
        assert.equal(1.3629413906, calculator.getResult());
        calculator.setOperand(0.4285714285714286);
        assert.equal(0.4285714285714286, calculator.getResult());
        calculator.callOperation(ADD);
        assert.equal(0.934369962, calculator.getResult());
        calculator.setOperand(2.478260869565217);
        assert.equal(2.478260869565217, calculator.getResult());
        calculator.callOperation(RESULT);
        assert.equal(3.4126308316, calculator.getResult());
    });

    it('Test simple multiply: 8*2=16', function () {
        calculator.clear();
        calculator.setOperand(8);
        assert.equal(8, calculator.getResult());

        calculator.callOperation(MULTIPLY);
        assert.equal(8, calculator.getResult());

        calculator.setOperand(2);
        assert.equal(2, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(16, calculator.getResult());
    });

    it('Test simple subtract: 8-2=6', function () {
        calculator.clear();
        calculator.setOperand(8);
        assert.equal(8, calculator.getResult());

        calculator.callOperation(SUBTRACT);
        assert.equal(8, calculator.getResult());

        calculator.setOperand(2);
        assert.equal(2, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(6, calculator.getResult());
    });

    it('Test sequence: (1+2+3)*4=24', function () {
        calculator.clear();
        calculator.setOperand(1);
        assert.equal(1, calculator.getResult());

        calculator.callOperation(ADD);
        assert.equal(1, calculator.getResult());

        calculator.setOperand(2);
        assert.equal(2, calculator.getResult());

        calculator.callOperation(ADD);
        assert.equal(3, calculator.getResult());

        calculator.setOperand(3);
        assert.equal(3, calculator.getResult());

        calculator.callOperation(MULTIPLY);
        assert.equal(6, calculator.getResult());

        calculator.setOperand(4);
        assert.equal(4, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(24, calculator.getResult());
    });

    it('Test sequence: 2=3=+1+3.89=4+3=', function () {
        calculator.clear();
        calculator.setOperand(2);
        assert.equal(2, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(2, calculator.getResult());

        calculator.setOperand(3);
        assert.equal(3, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(3, calculator.getResult());

        calculator.callOperation(ADD);
        assert.equal(3, calculator.getResult());

        calculator.setOperand(1);
        assert.equal(1, calculator.getResult());

        calculator.callOperation(ADD);
        assert.equal(4, calculator.getResult());

        calculator.setOperand(3.89);
        assert.equal(3.89, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(7.89, calculator.getResult());

        calculator.setOperand(4);
        assert.equal(4, calculator.getResult());

        calculator.callOperation(ADD);
        assert.equal(4, calculator.getResult());

        calculator.setOperand(3);
        assert.equal(3, calculator.getResult());

        calculator.callOperation(RESULT);
        assert.equal(7, calculator.getResult());
    });

    it('Test calculation sequence: 10+20=', function () {
        calculator.clear();
        calculator.setOperand(10);
        calculator.callOperation(ADD);
        calculator.setOperand(20);
        calculator.callOperation(RESULT);
        assert.equal(30, calculator.getResult());
    });

    it('Test calculation sequence: 1/0', function () {
        calculator.clear();
        assert.equal("0", calculator.getResult().toString());

        calculator.setOperand(1);
        assert.equal("1", calculator.getResult().toString());

        calculator.callOperation(DIVIDE);
        assert.equal("1", calculator.getResult().toString());

        calculator.setOperand(0);
        assert.equal("0", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal(Infinity, calculator.getResult());
    });

    it('Test calculation sequence: 1/0', function () {
        calculator.clear();
        assert.equal("0", calculator.getResult().toString());

        calculator.setOperand(1);
        assert.equal("1", calculator.getResult().toString());

        calculator.callOperation(DIVIDE);
        assert.equal("1", calculator.getResult().toString());

        calculator.setOperand(0);
        assert.equal("0", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal(Infinity, calculator.getResult());
    });

    it('Test calculation sequence: 2+3-===1=', function () {
        calculator.clear();
        calculator.setOperand(2);
        assert.equal("2", calculator.getResult().toString());

        calculator.callOperation(ADD);
        assert.equal("2", calculator.getResult().toString());

        calculator.setOperand(3);
        assert.equal("3", calculator.getResult().toString());

        calculator.callOperation(SUBTRACT);
        assert.equal("5", calculator.getResult().toString());

        calculator.callOperation(RESULT);
        assert.equal("0", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal("-5", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal("-10", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal("-15", calculator.getResult().toString());

        calculator.setOperand(1);
        assert.equal("1", calculator.getResult().toString());

        calculator.callOperation(RESULT);
        assert.equal("-4", calculator.getResult().toString());
    });

    it('Test calculation sequence: 2+3-===1===', function () {
        calculator.clear();
        calculator.setOperand(2);
        assert.equal("2", calculator.getResult().toString());

        calculator.callOperation(ADD);
        assert.equal("2", calculator.getResult().toString());

        calculator.setOperand(3);
        assert.equal("3", calculator.getResult().toString());

        calculator.callOperation(SUBTRACT);
        assert.equal("5", calculator.getResult().toString());

        calculator.callOperation(RESULT);
        assert.equal("0", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal("-5", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal("-10", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal("-15", calculator.getResult().toString());

        calculator.setOperand(1);
        assert.equal("1", calculator.getResult().toString());

        calculator.callOperation(RESULT);
        assert.equal("-4", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal("-9", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal("-14", calculator.getResult().toString());
    });


    it('Test calculation sequence: -4***2*==', function () {
        calculator.clear();
        calculator.setOperand(-4);
        assert.equal("-4", calculator.getResult().toString());
        calculator.callOperation(MULTIPLY);
        assert.equal("-4", calculator.getResult().toString());
        calculator.callOperation(MULTIPLY);
        assert.equal("-4", calculator.getResult().toString());
        calculator.callOperation(MULTIPLY);
        assert.equal("-4", calculator.getResult().toString());
        calculator.setOperand(2);
        assert.equal("2", calculator.getResult().toString());

        calculator.callOperation(MULTIPLY);
        assert.equal("-8", calculator.getResult().toString());

        calculator.callOperation(MULTIPLY);
        assert.equal("-8", calculator.getResult().toString());

        calculator.callOperation(MULTIPLY);
        assert.equal("-8", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal("64", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal("-512", calculator.getResult().toString());
    });


    it('Test calculation sequence: 3+1+3.89+3=', function () {
        calculator.clear();
        calculator.setOperand(3);
        assert.equal("3", calculator.getResult().toString());

        calculator.callOperation(ADD);
        assert.equal("3", calculator.getResult().toString());

        calculator.setOperand(1);
        assert.equal("1", calculator.getResult().toString());

        calculator.callOperation(ADD);
        assert.equal("4", calculator.getResult().toString());

        calculator.setOperand(3.89);
        assert.equal("3.89", calculator.getResult().toString());
        calculator.callOperation(ADD);
        assert.equal("7.89", calculator.getResult().toString());
        calculator.setOperand(3);
        assert.equal("3", calculator.getResult().toString());

        calculator.callOperation(RESULT);
        assert.equal("10.89", calculator.getResult().toString());
        calculator.callOperation(RESULT);
        assert.equal("13.89", calculator.getResult().toString());
    });
});

describe('calculator#isMemoryEmpty', function () {
    it('Test isMemoryEmpty', function () {
        calculator.clear();
        assert.equal(true, calculator.isMemoryEmpty());
        calculator.setOperand(3.89);
        assert.equal(true, calculator.isMemoryEmpty());
        calculator.storeToMemory();
        assert.equal(false, calculator.isMemoryEmpty());
    });
});

describe('calculator#clearMemory#storememory#addToMemory', function () {
    it('Test memory clear', function () {
        calculator.clear();
        calculator.setOperand(3.89);
        calculator.storeToMemory();
        assert.equal(false, calculator.isMemoryEmpty());
        calculator.clearMemory();
        assert.equal(true, calculator.isMemoryEmpty());

        calculator.clear();
        calculator.setOperand(4);
        calculator.addToMemory();
        assert.equal(4, calculator.readMemory());
        calculator.clear();
        calculator.clearMemory();
        calculator.setOperand(3);
        calculator.callOperation(1);
        calculator.storeToMemory();
        assert.equal(false, calculator.isMemoryEmpty());
        assert.equal(3, calculator.readMemory());
    });

    it('Test memory clear', function () {
        calculator.clear();
        calculator.setOperand(5);
        calculator.callOperation(1);
        calculator.addToMemory();
        assert.equal(false, calculator.isMemoryEmpty());
        assert.equal(8, calculator.readMemory());
    });
});

describe('calculator#isMemoryEmpty', function () {
    it('Test isMemoryEmpty', function () {
        calculator.clear();
        assert.equal(0, calculator.getOperator());
        calculator.callOperation(ADD);
        assert.equal(1, calculator.getOperator());
        calculator.callOperation(SUBTRACT);
        assert.equal(2, calculator.getOperator());
        calculator.callOperation(MULTIPLY);
        assert.equal(3, calculator.getOperator());
        calculator.callOperation(DIVIDE);
        assert.equal(4, calculator.getOperator());
        calculator.callOperation(RESULT);
        assert.notEqual(5, calculator.getOperator());
        calculator.clear();
        assert.equal(0, calculator.getOperator());
    });
});


var supertest = require("supertest");
var assert = require('assert');
//var server = supertest.agent("http://localhost:3000");


describe("Controllers test ", function () {


    it("home", function (done) {
        supertest(app)
            .get('/')
            .expect(200, done)
    });

    it("readMemory", function (done) {
        calculator.clearMemory();
        calculator.setOperand(99);
        calculator.storeToMemory();
        supertest(app)
            .get('/calculator/readMemory')
            .end(function (err, res) {
                assert.equal("99", res.text);
                done();
            });
    });

    it("clearMemory", function (done) {
        supertest(app)
            .get('/calculator/clearMemory')
            .expect(200, done);
    });

    it("storeToMemory", function (done) {
        supertest(app)
            .post('/calculator/storeToMemory')
            .expect(200, done)
    });

    it("addToMemory", function (done) {
        supertest(app)
            .post('/calculator/addToMemory')
            .expect(200, done)
    });

    it("setOperand", function (done) {
        supertest(app)
            .post('/calculator/setOperand')
            .expect(200, done);
    });

    it("setOperation", function (done) {
        calculator.clear();
        supertest(app)
            .post('/calculator/setOperation')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                assert.equal("0", res.text);
                done();
            })
    });

    it("clearCalc", function (done) {
        supertest(app)
            .get('/calculator/clearCalc')
            .expect(200, done);
    });

    it("should return 404", function (done) {
        supertest(app)
            .get("/random")
            .expect(404, done);
    });
});
