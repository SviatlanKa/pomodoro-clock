import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import beepSound from '../media/beep.mp3';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: this.props.sessionLength,
            seconds: '00',
            isBreak: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.tickTime = this.tickTime.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.sessionLength !== prevProps.sessionLength) {
            this.setState({ minutes: this.props.sessionLength, seconds: '00' });
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
        let { breakLength, sessionLength } = this.props;
        let interval = minutes * 60 + parseInt(seconds);
        const audio = new Audio(beepSound);

        if (interval > 0) {
            interval--;
            seconds = (interval) % 60;
            minutes = Math.floor(interval / 60) % 60;
            this.setState({ minutes, seconds });
        } else {
            if (isBreak) {
                this.setState({ minutes: sessionLength, seconds: '00' });
            } else {
                this.setState({ minutes: breakLength, seconds: '00' });
            }
            audio.play();
            this.setState({ isBreak: !isBreak });
        }
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