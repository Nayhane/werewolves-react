import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class VillageMenuButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,

  }



render() {
    const { onClick } = this.props

    return (
      <button onClick={ onClick }>Move All Players</button>
    )
  }
}

export default VillageMenuButton
