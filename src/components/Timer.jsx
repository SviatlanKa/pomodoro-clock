import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedoAlt } from '@fortawesome/free-solid-svg-icons';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: {
                minutes: '25',
                seconds: '00'
            },
            isStart: false,
            isPause: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.tickTime = this.tickTime.bind(this);
    }

    handleClick(e) {
        let { timeLeft, isStart, isPause } = this.props;
        let timerId;
        if (e.target.id === "start-stop") {
           if (!isStart || isPause) {
               timerId = setTimeOut((this.tickTime => {
                   timerId = setTimeOut(this.tickTime(), 1000)
               }), 1000);
               isStart = !isStart ? true : false;
               isPause = isPause ? false : true;
           }
        } else if (e.target.id === "reset") {
            timeLeft = { minutes: '25', seconds: '00' };
            this.props.onHandleClick(25, "session");
            this.props.onHandleClick(5, "break");
        }
        this.setState()
    }

    tickTime() {
        let { minutes, seconds } = this.state;
        let interval = (minutes * 60 + seconds) * 1000;
        while (interval > 0) {
            interval--;
        }
        seconds = (interval / 1000) % 60;
        minutes = (interval / (1000 * 60)) % 60;
        this.setState({ minutes, seconds });
    }

    render() {
        console.log(this.props);
        return(
            <div>
                <div>
                    <span>{this.state.timeLeft.minutes}</span>
                    <span>{this.state.timeLeft.seconds}</span>
                    </div>
                <button
                    id="start-stop"
                    onClick={this.handleClick}
                > {
                    this.props.isPause ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />
                }
                </button>
                <button
                    id="reset"
                    onClick={this.handleClick}
                >
                    <FontAwesomeIcon icon={faRedoAlt} />
                </button>

            </div>
        )
    }
}

export default Timer;