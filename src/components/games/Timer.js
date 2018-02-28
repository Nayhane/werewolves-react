import React, { PureComponent } from 'react'
import ReactCountdownClock from 'react-countdown-clock'
import RaisedButton from 'material-ui/RaisedButton'

import Paper from 'material-ui/Paper'

const  timerStyle  = {
  cursor: 'pointer',
  width: '110px',
}

const OPTIONS = { endDate: Date.now() + 900000}

  class Timer extends PureComponent {
    constructor() {
    super()

    this.state = {
      paused: false
    }
    console.log(this.state)
  }

  togglePaused() {
    this.setState({
      paused: !this.state.paused
    })
  }

    myCallback() {
      console.log('done')
    }

    render() {
      const { paused } = this.state

      return (
          <div style= {timerStyle}>
          <ReactCountdownClock seconds={900}
             color="#9AACB6"
             alpha={0.9}
             size={100}
             paused={this.state.paused}
             onComplete={this.myCallback}
             onClick={this.togglePaused.bind(this) } />
          </div>
        )
      }
    }

export default Timer
