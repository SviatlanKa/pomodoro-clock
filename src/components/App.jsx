import React, { Component } from 'react';
import Timer from './Timer';
import TimeLength from "./TimeLength";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            timeLeft: '25',
            break: 5,
            session: 25,
            isBreak: false
        }
        this.handleClickTimerLength = this.handleClickTimerLength.bind(this);
        this.handleClickTimer = this.handleClickTimer.bind(this);
    }

    handleClickTimerLength(value, valueName) {
        const timeLeft = !this.state.isBreak && valueName === 'session' ? `${value}` : this.state.timeLeft;
        this.setState({ timeLeft, [valueName]: value });
    }

    handleClickTimer() {

    }

    render() {
        const timer = this.state.isBreak ? this.state.break : this.state.session;


        return(
            <div>
                <TimeLength
                    length={this.state.break}
                    stateName="break"
                    onHandleClick={this.handleClickTimerLength}
                />
                <Timer
                    timerLeft={timer}
                    onHanldeClick={this.handleClickTimer}
                />
                <TimeLength
                    length={this.state.session}
                    stateName="session"
                    onHandleClick={this.handleClickTimerLength}
                />
            </div>
        )
    }
}

export default App;