
import React, { Component } from 'react';
import ResultComponent from './ResultComponent';
import KeyPadComponent from './KeyPadComponent';

class Calculator extends Component {
    constructor() {
        super();

        this.state = {
            result: ""
        }
    }

    onClick = button => {

        if (button === "=") {
            this.calculate()
        }

        else if (button === "C") {
            this.reset()
        }
        else if (button === "CE") {
            this.backspace()
        }

        else {
            this.setState({
                result: this.state.result + button
            })
        }
    };


    calculate = () => {
        try {
            this.setState({
                // eslint-disable-next-line
                result: (eval(this.state.result) || "") + ""
            })
        } catch (e) {
            this.setState({
                result: "error"
            })

        }
    };

    reset = () => {
        this.setState({
            result: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };


    render() {
        return (
            <div className="modal-dialog">
                <div className="modal-content" >
                    <div className="modal-header">
                        <span className="modal-title">
                        Calculator
                        </span>
                    </div>
                    <div className="modal-body">

                        <div className="calculator-body">
                            <ResultComponent result={this.state.result} />
                            <KeyPadComponent onClick={this.onClick} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;