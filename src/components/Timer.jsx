import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import beepSound from '../media/beep.mp3';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: '25',
            seconds: '00',
            isBreak: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.tickTime = this.tickTime.bind(this);
        this.checkSessionByZero = this.checkSessionByZero.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.sessionLength !== prevProps.sessionLength) {
            const minutes = this.checkSessionByZero(this.props.sessionLength);
            this.setState({ minutes, seconds: '00' });
        }
    }

    handleClick(e) {
        let { minutes, seconds } = this.state;
        let { isPlay } = this.props;
        const id = e.currentTarget.id;
        if (id === "start-stop") {
            if (!isPlay) {
                this.interval = setInterval(this.tickTime, 1000);
            } else {
                clearInterval(this.interval);
            }
            this.props.onHandleClick("isPlay", !isPlay);
        } else if (id==="reset") {
            clearInterval(this.interval);
            this.props.onHandleClick("sessionLength", 25);
            this.props.onHandleClick("breakLength", 5);
            this.props.onHandleClick("isPlay", false);
            minutes = '25';
            seconds = '00';
            this.setState({ minutes, seconds });
        }
    }

    tickTime() {
        let { minutes, seconds, isBreak } = this.state;
        const breakLengthToStr = this.props.breakLength;
        const sessionLengthToStr = this.props.sessionLength;
        let interval = parseInt(minutes) * 60 + parseInt(seconds);
        const audio = new Audio(beepSound);

        if (interval > 0) {
            interval--;
            seconds = (interval) % 60;
            seconds = this.checkSessionByZero(seconds);
            minutes = Math.floor(interval / 60) % 60;
            minutes = this.checkSessionByZero(minutes);
            this.setState({ minutes, seconds });
        } else {
            if (isBreak) {
                this.setState({ minutes: sessionLengthToStr, seconds: '00' });
            } else {
                this.setState({ minutes: breakLengthToStr, seconds: '00' });
            }
            audio.play();
            this.setState({ isBreak: !isBreak });
        }
    }

    checkSessionByZero(value) {
        return value < 10 ? `0${value}` : value.toString();
    }

    render() {
        const { minutes, seconds, isBreak } = this.state;
        const { isPlay } = this.props;
        const icon = isPlay ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />;
        const timerLabel = isBreak ? 'Break' : 'Session';

        return(
            <div className="timer-container">
                <div className="label-container">
                    <p id="timer-label">{timerLabel}</p>
                    <div id="timer-left">
                        <span>{minutes}</span>
                        <span>:</span>
                        <span>{seconds}</span>
                    </div>
                </div>
                <div className="btn-container">
                    <button id="start-stop"
                            className="timer-btn"
                            onClick={this.handleClick}>
                        {icon}
                    </button>
                    <button id="reset"
                            className="timer-btn"
                            onClick={this.handleClick}>
                        <FontAwesomeIcon icon={faRedoAlt} />
                    </button>
                </div>
            </div>
        )
    }
}

export default Timer;