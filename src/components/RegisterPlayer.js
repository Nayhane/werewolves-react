import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import saveRegistration from '../actions/games/create'

import RaisedButton from 'material-ui/RaisedButton'
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo'
import AddPlayerIcon from 'material-ui/svg-icons/social/person-add'
import DoneIcon from 'material-ui/svg-icons/action/done'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import Webcam from 'react-webcam'

export class MakePhoto extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      photo: null,
      open: false
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  setRef = (webcam) => {
    this.webcam = webcam
  }

  handlePhotoClick = () => {
    const photo = this.webcam.getScreenshot();
    this.setState({ photo: photo })
    console.log(photo)
  }

  handleFormSubmit = (playerName) => {
    const name = playerName
    this.setState({ name: name })
  }

  handleSaveRegistration = (event) => {
    event.preventDefault();
    this.props.saveRegistration(this.state)

    this.setState({
      name: '',
      photo: null
    })
  }

  render() {
    const style = {
      margin: 4,
    }

    const customContentStyle = {
      width: '90%',
      maxWidth: 'none',
    }

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ]

    return (
      <div className='register'>
        <FloatingActionButton style={style} mini={true} onClick={this.handleOpen} secondary={true}>
          <AddPlayerIcon />
        </FloatingActionButton>

        <Dialog
          title="Add a new player to the game!"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
        >
          <TextField
            hintText='Please provide your name...'
            floatingLabelText='Your name...'
            onChange={(event) => this.handleFormSubmit(event.target.value)}
          />

          <Webcam
            className='newPhoto'
            audio={false}
              ref={this.setRef}
              screenshotFormat='image/jpeg'
              width={500}
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
        </Dialog >
      </div>
    )
  }
}

export default connect(null, { saveRegistration })(MakePhoto)
