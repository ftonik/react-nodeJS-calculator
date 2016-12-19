import React from 'react'


class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    _handleClick() {
        let text = this.props.text,
            val = this.props.operNumb,
            cb = this.props.clickHandler;

        if (cb) {
            cb.call(null, text, val);
        }
    }

    render() {
        return (
            <button value={this.props.operNumb} className={this.props.klass}
                    onClick={this._handleClick.bind(this)}>
                <span className="title">{this.props.text}</span>
            </button>
        );
    }
}

export default Button;