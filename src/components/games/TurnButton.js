import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import Paper from 'material-ui/Paper'

const buttonStyle = {
  padding: 12,
  margin: 12,
  maxWidth: 45,
  height: 45,
  flex: 1,
  textAlign: 'center',
  cursor: 'pointer'
}

class TurnButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    weapon: PropTypes.string.isRequired
  }

  icon() {
    switch(this.props.weapon) {
      case 'rock' :
        return 'hand-rock'

      case 'paper' :
        return 'hand-paper'

      case 'scissors' :
        return 'hand-scissors'

      default :
        return 'exclamation-circle'
    }
  }

  render() {
    const { onClick } = this.props

    return (
      <Paper style={buttonStyle} onClick={onClick}>
        <FontAwesome name={this.icon()} />
      </Paper>
    )
  }
}

export default TurnButton
