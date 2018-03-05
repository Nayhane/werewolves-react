import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FlatButton from 'material-ui/FlatButton'


class UserPage extends PureComponent {
  goToWakkerdam = () => {
      this.props.push('/readmessage/Wakkerdam')
  }

  goToSluimervoort = () => {
      this.props.push('/readmessage/Sluimervoort')
  }


  classNames() {
    const { level } = this.props
    return `Title level-${level || 1}`
  }

  render() {
    return(
      <div>
      <FlatButton primary={true}  label="Wakkerdam Messages" onClick={this.goToWakkerdam} />
      <FlatButton primary={true}  label="Sluimervoort Messages" onClick={this.goToSluimervoort} />
      </div>
    )
  }
}

export default connect(null, {push})(UserPage)
