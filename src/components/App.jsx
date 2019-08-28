import React, { Component } from 'react';
import Timer from './Timer';
import TimeLength from "./TimeLength";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            isPlay: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(valueName, value) {
        console.log(`stateName: ${valueName}, value: ${value}`);
        this.setState({ [valueName]: value });
    }

    render() {
        return(
            <div>
                <h1 className="title">Pomodoro Clock</h1>
                <TimeLength
                    stateName="break"
                    length={this.state.breakLength}
                    isPlay={this.state.isPlay}
                    onHandleClick={this.handleClick}
                />
                <Timer
                    breakLength={this.state.breakLength}
                    sessionLength={this.state.sessionLength}
                    isPlay={this.state.isPlay}
                    onHandleClick={this.handleClick}
                />
                <TimeLength
                    stateName="session"
                    length={this.state.sessionLength}
                    isPlay={this.state.isPlay}
                    onHandleClick={this.handleClick}
                />
            </div>
        )
    }
}

export default App;