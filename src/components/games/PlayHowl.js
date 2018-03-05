import React, { Component } from 'react'
import ReactHowler from 'react-howler'
import mp3_howl from '../../sounds/wolf6.mp3'

class Sound2 extends Component {

  render () {
    return(
      <ReactHowler
        src={mp3_howl}
        playing={false}
        ref={(ref) => (this.player = ref)}
      />
    );
  }
}

export default Sound2
