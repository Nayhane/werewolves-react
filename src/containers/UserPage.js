import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import RaisedButton from 'material-ui/RaisedButton';

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
        <span style={{marginRight: '1rem'}}><RaisedButton primary={true} style={{ color: 'white', marginTop: '1rem', marginLeft: '3.5rem' }} labelStyle={{ fontSize: '1.25rem' }} label="Wakkerdam Messages" onClick={this.goToWakkerdam} /></span>
        <span><RaisedButton  primary={true} style={{ color: 'white', margin: '0 auto '}} labelStyle={{ fontSize: '1.25rem' }} label="Sluimervoort Messages" onClick={this.goToSluimervoort} /></span>
      </div>
    )
  }
}

export default connect(null, {push})(UserPage)
