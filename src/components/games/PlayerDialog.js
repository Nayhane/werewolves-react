import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
//components
import PlayerMenuButton from './PlayerMenuButton'

class PlayerDialog extends PureComponent {

  render() {
      
    return (
      <div>
        <PlayerMenuButton icon='message' />
        <PlayerMenuButton icon='mayor' />
        <PlayerMenuButton icon='dead' />
      </div>
    )
  }
}

export default PlayerDialog
