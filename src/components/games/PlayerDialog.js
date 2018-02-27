import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
//components
import PlayerMenuButton from './PlayerMenuButton'

class PlayerDialog extends PureComponent {

  render() {
    const message = 'message'
    const mayor = 'mayor'
    const dead = 'dead'

    return (
      <div>
        <PlayerMenuButton icon={message} />
        <PlayerMenuButton icon={mayor} />
        <PlayerMenuButton icon={dead} />
      </div>
    )
  }
}

export default PlayerDialog
