import React from 'react'
import Indicator from './Indicator'
import ButtonsPanel from './ButtonsPanel'


class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "calc": '0'
        };
    }

    setInput(inp, valOperation) {
        switch (inp) {
            case 'MC':
                clearMemory();
                break;
            case 'MR':
                readMemory();
                break;
            case 'MS':
                storeToMemory();
                break;
            case 'M+':
                addToMemory();
                break;
            case 'C':
                clear();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
                setOperation(valOperation);
                break;
            default:
                addDig(inp);
                break;
        }

        setTimeout(function () {
            this.setState({"calc": indicatorVal});
        }.bind(this), 20);
    };

    componentDidMount() {
        document.body.addEventListener('keypress', this.keyPress.bind(this));
        document.body.addEventListener('keyup', this.keyUp.bind(this));
    }

    keyUp(event) {
        if (event.keyCode == 27) { // Esc
            clear();
        }

        this.setState({"calc": indicatorVal});
    }

    keyPress(event) {
        var key = event.charCode;
        var char = event.key;
        if ((key < 58 && key > 47) || key == 46) {
            addDig(char); // digits
        } else if (key == 43) {
            setOperation(1); // Calculator.ADD
        } else if (key == 45) {
            setOperation(2); // Calculator.SUBTRACT
        } else if (key == 42) {
            setOperation(3); // Calculator.MULTIPLY
        } else if (key == 47) {
            setOperation(4); // Calculator.DIVIDE
        } else if (key == 61 || key == 13) {
            setOperation(5); // Calculator.RESULT
        }

        this.setState({"calc": indicatorVal});
    }

    updateIndicator() {
        this.setState({"calc": indicatorVal});
    }


    render() {
        return (
            <div className="container well well-lg">
                <Indicator calc={this.state.calc}/>
                <ButtonsPanel _clickHandler={this.setInput.bind(this)}/>
            </div>
        )
    }

}

export default Calculator;