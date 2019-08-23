import React, { Component } from 'react';

class TimeLength extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let { length, stateName } = this.props;
        if (length < 60) {
            length = e.target.id.includes('increment') ? length + 1 : length - 1;
            this.props.onHandleClick(length, stateName);
        }
    }

    render() {
        const idDec = `${this.props.stateName}-decrement`;
        const idInc = `${this.props.stateName}-increment`;
        return(
            <div>
                <button
                    id={idDec}
                    onClick={this.handleClick}
                >
                    -
                </button>
                <div>
                    {this.props.length}
                </div>
                <button
                    id={idInc}
                    onClick={this.handleClick}
                >
                    +
                </button>
            </div>
        )
    }
}

export default TimeLength;