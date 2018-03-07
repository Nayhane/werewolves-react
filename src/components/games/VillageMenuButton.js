import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import IconButton from 'material-ui/IconButton'
import MovePlayers from 'material-ui/svg-icons/action/card-travel'

class VillageMenuButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

render() {
    const { onClick } = this.props
    return (
      <IconButton
        tooltip={this.props.label}
        onClick={ onClick }
        labelPosition="before"
        //primary={true}
        style={{ marginTop: 5, backgroundColor: '#1f243d' }}
        icon={<MovePlayers />}
      >
        <MovePlayers />
      </IconButton>
    )
  }
}

export default VillageMenuButton
