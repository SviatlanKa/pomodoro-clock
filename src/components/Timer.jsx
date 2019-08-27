import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedoAlt } from '@fortawesome/free-solid-svg-icons';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: {
                minutes: this.props.session,
                seconds: '00'
            }
        }
        this.handleClick = this.handleClick.bind(this);
        this.tickTime = this.tickTime.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.session !== prevProps.session) {
            this.setState({ timeLeft: {
                minutes: this.props.session,
                seconds: '00'
                }
            })
        }
    }

    handleClick(e) {
        let { minutes, seconds } = this.state.timeLeft;
        let { isPlay, isPause, isReset } = this.props;
        const id = e.currentTarget.id;
        console.log(`e.target.id: ${id}`);
        if (id === "start-stop") {
            if (!isPlay && !isPause) {
                this.props.onHandleClick("isPlay", !isPlay);
                this.interval = setInterval(this.tickTime, 1000);
            } else if ((isPlay && !isPause) || (!isPlay && isPause)) {
                this.props.onHandleClick("isPlay", !isPlay);
                this.props.onHandleClick("isPause", !isPause);
                clearInterval(this.interval);
            }
        } else if (id==="reset") {
            this.props.onHandleClick("session", 25);
            seconds = '00';
            this.setState({ seconds });
        }
    }

    tickTime() {
        let { minutes, seconds } = this.state.timeLeft;
        console.log(this.state.timeLeft);
        let interval = minutes * 60 + parseInt(seconds);
        console.log(interval);
        if (interval > 0) {
            interval--;
            console.log(`interval: ${interval}`);
            seconds = (interval) % 60;
            console.log(`seconds: ${seconds}`);
            minutes = Math.floor(interval / 60) % 60;
            console.log(`minutes: ${minutes}`);
            this.setState({ minutes, seconds });
            console.log(this.state);
        }
    }

    render() {
        console.log(`props from render: ${this.props.isPlay}`);
        const { minutes, seconds } = this.state.timeLeft;
        const icon = this.props.isPlay ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />;
        return(
            <div>
                <div>
                    <span>{minutes}</span>
                    <span>:</span>
                    <span>{seconds}</span>
                </div>
                <button id="start-stop" onClick={this.handleClick}>
                    {icon}
                </button>
                <button id="reset" onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faRedoAlt} />
                </button>

            </div>
        )
    }
}

export default Timer;