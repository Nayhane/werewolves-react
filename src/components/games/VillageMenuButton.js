import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import FlatButton from 'material-ui/RaisedButton'
import MovePlayers from 'material-ui/svg-icons/action/card-travel'

class VillageMenuButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

render() {
    const { onClick } = this.props
    return (
      <FlatButton
        onClick={ onClick }
        label={ this.props.label }
        labelPosition="before"
        primary={true}
        style={{ marginTop: 5, backgroundColor: 'none' }}
        icon={<MovePlayers />}
      />
    )
  }
}

export default VillageMenuButton
