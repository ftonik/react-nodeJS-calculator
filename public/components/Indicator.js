import React from 'react'

class Indicator extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="row">
                <input type="text" className="well well-sm" id="monitor" readOnly="true" value={this.props.calc}/>
            </div>
        )
    }
}

export default Indicator;
