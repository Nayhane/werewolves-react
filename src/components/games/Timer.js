import React, { PureComponent } from 'react'
import CountDown from './CountDown'
import Loading from './AnotherTimer'
import Paper from 'material-ui/Paper'
import ReactCountdownClock from 'react-countdown-clock'


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
      <br />

      <Paper style={timerStyle} >
        <CountDown options={OPTIONS} />
      </Paper>

      <Loading options={OPTIONS} />

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
