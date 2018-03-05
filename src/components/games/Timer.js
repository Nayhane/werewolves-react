import React, { PureComponent } from 'react'
import ReactCountdownClock from 'react-countdown-clock'
import ReactHowler from 'react-howler'
//Soounds
import mp3_bell from '../../sounds/churchBell.mp3'
import PlayHowl from './PlayHowl'
//Styling
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import RestoreIcon from 'material-ui/svg-icons/action/restore'

const  timerStyle  = {
  cursor: 'pointer',
  width: '110px',
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
      seconds: 900,
      open: false,
      playing: false,
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
        color: "#D32F2F",
        playing: true,
      })
    }
  }

  resetTimer() {
    this.setState ({
      paused: true,
      seconds: 900 + Math.random()*0.000000000001,
      color: '#1F243D',
    })
  }

  handleOpen() {
    this.setState({
      open: true,
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
      <div style={timerStyle}>

        <ReactHowler
          src={mp3_bell}
          playing={this.state.playing}
          ref={(ref) => (this.player = ref)}
        />

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
           onClick={this.resetTimer.bind(this)}
           icon={<RestoreIcon />}
        />

        <Dialog
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

          <PlayHowl />

          <h1 style={{ textAlign : 'center' }}>

            Night has fallen

          </h1><br />
            <h3 style={{ textAlign : 'center' }}>

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
      )
    }
  }

export default Timer
