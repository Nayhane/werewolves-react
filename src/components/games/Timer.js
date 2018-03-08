import React, { PureComponent } from 'react'
import ReactCountdownClock from 'react-countdown-clock'
import ReactHowler from 'react-howler'
//Soounds
import mp3_bell from '../../sounds/churchBell.mp3'
import mp3_howl from '../../sounds/wolf6.mp3'

//Styling
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton  from 'material-ui/FloatingActionButton'
import RestoreIcon from 'material-ui/svg-icons/action/restore'
import Star from 'material-ui/svg-icons/action/grade'
import './Timer.css'

const  timerStyle  = {
  cursor: 'pointer',
  width: '110px',
  display: 'flex',
}

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
}

const flatButtonStyle = {
  height : '5rem',
  algin: 'center',
  fontSize: '1rem',
}

class Timer extends PureComponent {
  constructor() {
    super()

    this.state = {
      paused: true,
      color: '#1F243D',
      seconds: 300,
      open: false,
      playing: false,
      playing2: false,
    }
  }

  setPause() {
    this.setState({
      paused: !this.state.paused
    })
  }

  onTick(seconds) {
    if(seconds < 100) {
      this.setState ({
        color: "#D32F2F",
        playing: true,
      })
    }
  }

  resetTimer() {
    this.setState ({
      paused: true,
      seconds: 300 + Math.random()*0.000000000001,
      color: '#1F243D',
      playing: false,
    })
  }

  handleOpen() {
    this.setState({
      open: true,
      playing2: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
    this.resetTimer()
  }

  render() {
    const actions = [
      <FlatButton
        style={ flatButtonStyle }
        label="Continue..."
        primary={true}
        onClick={this.handleClose}
      />
    ]
    return (
    <div>
      <div style={timerStyle}>
        <ReactCountdownClock
           ref={(c) => this._timer = c}
           onTick={this.onTick.bind(this)}
           seconds={this.state.seconds}
           color={this.state.color}
           pausedText={'Play'}
           alpha={0.9}
           size={100}
           paused={this.state.paused}
           onComplete={this.handleOpen.bind(this)}
           onClick={this.setPause.bind(this) }
        />
      </div>
      <div>
       <ReactHowler
         src={mp3_bell}
         playing={this.state.playing}
         ref={(ref) => (this.player = ref)}
       />
      </div>

      <div className='resetButton'>
        <IconButton tooltip="Reset Timer" mini={true}>
          <RestoreIcon onClick={this.resetTimer.bind(this)}/>
        </IconButton>
      </div>

      <div className='nightButton'>
        <IconButton tooltip="Start Night" mini={true}>
          <Star primary={true} onClick={this.handleOpen.bind(this)}/>
        </IconButton>
      </div>


      <div>
        <Dialog
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

          <ReactHowler
            src={mp3_howl}
            playing={this.state.playing2}
            ref={(ref) => (this.player = ref)}
          />

          <h1 style={{ textAlign : 'center' }}>

            Dusk is settling in...

          </h1>

            <h3 style={{ textAlign : 'center' }}><br />

              Do not go gentle into that good night,<br />
              Old age should burn and rave at close of day; <br />
              Rage, rage against the dying of the light.<br /> <br />
              Though wise men at their end know dark is right,<br />
              Because their words had forked no lightning they<br />
              Do not go gentle into that good night.<br /><br />
              Good men, the last wave by, crying how bright<br />
              Their frail deeds might have danced in a green bay,<br />
              Rage, rage against the dying of the light.<br /><br />
              Wild men who caught and sang the sun in flight,<br />
              And learn, too late, they grieved it on its way,<br />
              Do not go gentle into that good night.<br /><br />
              Grave men, near death, who see with blinding sight<br />
              Blind eyes could blaze like meteors and be gay,<br />
              Rage, rage against the dying of the light.<br /><br />
              And you, my father, there on that sad height,<br />
              Curse, bless, me now with your fierce tears, I pray.<br />
              Do not go gentle into that good night.<br />
              Rage, rage against the dying of the light.<br />

          </h3>
        </Dialog>
      </div>
    </div>
    )
  }
}

export default Timer
