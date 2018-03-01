import React, { PureComponent } from 'react'
import ReactCountdownClock from 'react-countdown-clock'
import RaisedButton from 'material-ui/RaisedButton'



import PauseIcon from 'material-ui/svg-icons/av/pause'

const  timerStyle  = {
  cursor: 'pointer',
  width: '110px',
}

class Timer extends PureComponent {
  constructor() {
    super()

    this.state = {
      paused: true,
      color: '#9AACB6',
      seconds: 302,
    }
    console.log(this.state)
  }

  onClick() {
    this.setState({
      paused: !this.state.paused
    })
  }

  onTick(seconds) {
    if(seconds < 300) {
      this.setState ({
        color: "#ff0000"
      })
    }
  }

  resetTimer() {
    this.setState ({
      seconds: 305 + Math.random(),
      color: '#9AACB6',
    })
  }

  myCallback() {
    console.log('done')
  }

  render() {
    const { paused } = this.state

    return (
        <div style= {timerStyle}>
          <ReactCountdownClock
             ref={(c) => this._timer = c}
             onTick={this.onTick.bind(this)}
             seconds={this.state.seconds}
             color={this.state.color}
             alpha={0.9}
             size={100}
             paused={this.state.paused}
             onComplete={this.myCallback}
             onClick={this.onClick.bind(this) }
          />

           <RaisedButton
             primary={true}
             label="Reset"
             onClick={this.resetTimer.bind(this)}
          />
        </div>
      )
    }
  }

export default Timer
