import React, { Component } from 'react'
import ReactHowler from 'react-howler'
import mp3_file from '../../soundbites/wolf6.mp3'


class Sounds extends Component {
  // getHower () {
  //   this.player.howler
  // }
  //
  // getDuration () {
  //   this.player.duration()
  // }
  //
  // getSeek () {
  //   this.player.seek()
  // }
  //
  // setSeek () {
  //   this.player.seek(0.5)
  // }
  // This sound file may not work due to cross-origin setting
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
