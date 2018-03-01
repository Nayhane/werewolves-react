import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'
import MovePlayers from 'material-ui/svg-icons/action/card-travel'

class VillageMenuButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

render() {
    const { onClick } = this.props
    return (
      <RaisedButton
        onClick={ onClick }
        label='Move All Players'
        labelPosition="before"
        primary={true}
        icon={<MovePlayers />}
      />
    )
  }
}

export default VillageMenuButton
