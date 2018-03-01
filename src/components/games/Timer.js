import React, { PureComponent } from 'react'
import ReactCountdownClock from 'react-countdown-clock'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
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
      seconds: 5,
      open: false,
    }
  }

  setPause() {
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
      seconds: 900 + Math.random(),
      color: '#9AACB6',
    })
  }

  handleOpen() {
      this.setState({open: true})
  }

  handleClose = () => {
  this.setState({open: false})
  }

  render() {
    const { paused } = this.state
    const actions = [
      <FlatButton
        label="Something"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
      label="Discard"
      primary={true}
      onClick={this.handleClose}
      />,
    ]

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
             onComplete={this.handleOpen.bind(this)}
             onClick={this.setPause.bind(this) }
          />

           <RaisedButton
             primary={true}
             label="Reset"
             onClick={this.resetTimer.bind(this)}
          />

        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

          <h2>Night Has Fallen</h2> <br /> <button>Sleep Tight...</button>

        </Dialog>

        </div>
      )
    }
  }

export default Timer
