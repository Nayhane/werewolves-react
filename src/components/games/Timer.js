import React, { PureComponent } from 'react'
import CountDown from './CountDown'
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
  constructor(props){
      super(props);

      this.state = {
        seconds: this.props.seconds ? this.props.seconds : 9000,
      };

      this.setState({
        seconds: this.getNewSeconds()
      })
}

getNewSeconds = () => {
    if(this.props.seconds !== this.state.seconds) {
      return this.props.seconds;
    } else {
      return this.props.seconds + 0.0000001;
    }
  }


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
