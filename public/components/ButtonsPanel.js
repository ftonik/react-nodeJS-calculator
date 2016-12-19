import React from 'react'
import Button from './Button'

class ButtonsPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var _clickHandler = this.props._clickHandler;

        return (
            <div id="buttonMenu" className="well well-lg">
                <div className="row">
                    <Button klass="btn btn-success" text="MC" clickHandler={_clickHandler}/>
                    <Button klass="btn btn-success" text="MR" clickHandler={_clickHandler}/>
                    <Button klass="btn btn-success" text="MS" clickHandler={_clickHandler}/>
                    <Button klass="btn btn-success" text="M+" clickHandler={_clickHandler}/>
                </div>
                <div className="row">
                    <Button klass="btn btn-info" text="7" clickHandler={_clickHandler}/>
                    <Button klass="btn btn-info" text="8" clickHandler={_clickHandler}/>
                    <Button klass="btn btn-info" text="9" clickHandler={_clickHandler}/>
                    <Button operNumb="1" klass="btn btn-success" text="+" clickHandler={_clickHandler}/>
                </div>
                <div className="row">
                    <Button klass="btn btn-info" text="4" clickHandler={_clickHandler}/>
                    <Button klass="btn btn-info" text="5" clickHandler={_clickHandler}/>
                    <Button klass="btn btn-info" text="6" clickHandler={_clickHandler}/>
                    <Button operNumb="2" klass="btn btn-success" text="-" clickHandler={_clickHandler}/>
                </div>
                <div className="row">
                    <Button klass="btn btn-info" text="1" clickHandler={_clickHandler}/>
                    <Button klass="btn btn-info" text="2" clickHandler={_clickHandler}/>
                    <Button klass="btn btn-info" text="3" clickHandler={_clickHandler}/>
                    <Button operNumb="3" klass="btn btn-success" text="*" clickHandler={_clickHandler}/>
                </div>
                <div className="row">
                    <Button klass="btn btn-info" text="." clickHandler={_clickHandler}/>
                    <Button klass="btn btn-info" text="0" clickHandler={_clickHandler}/>
                    <Button operNumb="5" klass="btn btn-success" text="=" clickHandler={_clickHandler}/>
                    <Button operNumb="4" klass="btn btn-success" text="/" clickHandler={_clickHandler}/>
                </div>
                <div className="row">
                    <Button klass="btn btn-danger" text="C" clickHandler={_clickHandler}/>
                </div>
            </div>
        )
    }
}

export default ButtonsPanel;