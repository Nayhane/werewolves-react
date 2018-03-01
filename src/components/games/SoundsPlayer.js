import React, { Component } from 'react'
import ReactHowler from 'react-howler'
import mp3_file from '../../soundbites/wolf6.mp3'


class Sounds extends Component {

  render () {
    return(
      <ReactHowler
        src={mp3_file}
        playing={true}
        ref={(ref) => (this.player = ref)}
      />
    );
  }
}


export default Sounds
