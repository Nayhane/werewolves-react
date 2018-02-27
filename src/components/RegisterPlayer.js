import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import saveRegistration from '../actions/games/create'

import RaisedButton from 'material-ui/RaisedButton'
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo'
import DoneIcon from 'material-ui/svg-icons/action/done'
import TextField from 'material-ui/TextField'

import Webcam from 'react-webcam'

export class MakePhoto extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      player: {
        name: '',
        photo: null,
      }
    }
  }

  setRef = (webcam) => {
    this.webcam = webcam
  }

  handlePhotoClick = () => {
    const photo = this.webcam.getScreenshot();
    this.setState({ photo: photo })
  }

  handleFormSubmit = (playerName) => {
    const name = playerName
    this.setState({ name: name })
  }

  handleSaveRegistration = (event) => {
    event.preventDefault();
    this.props.saveRegistration(this.state)

    this.setState({
      player: {
        name: '',
        photo: null
      }
    })
  }

  render() {
    return (
      <div className='register'>

        <TextField
          hintText='Please provide your name...'
          floatingLabelText='Your name...'
          onChange={(event) => this.handleFormSubmit(event.target.value)}
        />

        <Webcam
          className='newPhoto'
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat='image/jpeg'
          width={350}
        />

        <h2>Screenshots</h2>
        <div className='screenshots'>
          <div className='controls'>
            <RaisedButton
              label='Capture photo!'
              labelPosition='before'
              primary={true}
              icon={<AddPhotoIcon />}
              onClick={this.handlePhotoClick}
            />
          </div>
          {this.state.photo ? <img src={this.state.photo} alt='Player' /> : null}
        </div>

        <RaisedButton
          label='Register user!'
          labelPosition='before'
          primary={true}
          icon={<DoneIcon />}
          onClick={this.handleSaveRegistration}
        />
      </div>
    )
  }
}

export default connect(null, { saveRegistration })(MakePhoto)
