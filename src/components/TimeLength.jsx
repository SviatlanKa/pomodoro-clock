import React, { Component } from 'react';

class TimeLength extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let { length, isPlay } = this.props;
        const stateName = this.props.stateName + 'Length';
        if (length >= 0 && length < 60 && !isPlay) {
            if (e.target.id.includes('increment')) {
                length++;
            } else {
                length = length > 0 ? length - 1 : 0;
            }
            this.props.onHandleClick(stateName, length);
        }
    }

    render() {
        const { stateName } = this.props;
        const idDec = `${stateName}-decrement`;
        const idInc = `${stateName}-increment`;
        const idLength = `${stateName}-length`;
        const idLabel = `${stateName}-label`;
        const textLabel = stateName === 'break' ? 'Break Length' : 'Session Length';
        return(
            <div className="time-length-container">
                <p id={idLabel} className="length-label">{textLabel}</p>
                <button id={idDec}
                    className="length-btn"
                    onClick={this.handleClick}
                >
                    -
                </button>
                <div id={idLength} className="time-length">
                    {this.props.length}
                </div>
                <button id={idInc}
                    className="length-btn"
                    onClick={this.handleClick}
                >
                    +
                </button>
            </div>
        )
    }
}

export default TimeLength;