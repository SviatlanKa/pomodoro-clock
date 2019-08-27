import React, { Component } from 'react';
import Timer from './Timer';
import TimeLength from "./TimeLength";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            break: 5,
            session: 25,
            isPlay: false,
            isPause: false,
            isReset: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(valueName, value) {
        this.setState({ [valueName]: value });
    }

    render() {
        return(
            <div>
                <TimeLength
                    stateName="break"
                    length={this.state.break}
                    onHandleClick={this.handleClick}
                />
                <Timer
                    break={this.state.break}
                    session={this.state.session}
                    isPlay={this.state.isPlay}
                    isPause={this.state.isPause}
                    isReset={this.state.isReset}
                    onHandleClick={this.handleClick}
                />
                <TimeLength
                    stateName="session"
                    length={this.state.session}
                    onHandleClick={this.handleClick}
                />
            </div>
        )
    }
}

export default App;