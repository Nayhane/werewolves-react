import React, { PureComponent } from 'react'
import ReactCountdownClock from 'react-countdown-clock'
import CountDown from './CountDown'
import Paper from 'material-ui/Paper'

const  timerStyle  = {
  flexDirection: 'row',
  maxWidth: '200px',
  height: '150px',
  textAlign: 'right',
  cursor: 'pointer',
}

const OPTIONS = { endDate: Date.now() + 900000}

class Timer extends PureComponent {

myCallback() {
  console.log('done')
}


render() {
  return (
      <div>
        <Paper style={timerStyle} >
          <CountDown options={OPTIONS} />
        </Paper>
      <ReactCountdownClock seconds={900}
         color="#000"
         alpha={0.9}
         size={200}
         onClick={this.pause}
         onComplete={this.myCallback} />
      </div>
    )
  }
}

export default Timer
