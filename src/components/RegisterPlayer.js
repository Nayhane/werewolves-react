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


const styleButton = {
  marginRight: 12,
}
export class MakePhoto extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      photo: null,
      open: false,
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
  }

  handleFormSubmit = (playerName) => {
    const name = playerName
    this.setState({ name: name })
  }

  validateAll() {
    return this.validateName() &&
    this.validatePhoto()
  }

  validateName() {
    if (this.state.name.length > 1) {
      this.setState({
        nameError: null
      })
      return true
    }

    this.setState({
      nameError: 'Please provide your name'
    })
    return false
  }

  validatePhoto() {
      if (this.state.photo !== null) {
        this.setState({
          photoError: null
        })
      return true
    }
    this.setState({
      photoError: <div style={{fontSize: '1rem'}}>Please capture your picture</div>
    })
    return false
  }

  handleSaveRegistration = (event) => {
    event.preventDefault();
    if (this.validateAll()){
      this.props.saveRegistration(this.state)

      this.setState({
        photo: null,
        name: ' '
      })
    }
      return false
  }

    render() {
      const cameraBox = {
        display: 'flex',
        marginBottom: '20px'
      }

      const style = {
        margin: 4,
      }

      const styleCamera = {
        // marginBottom: '100px',
        // marginRight: '20px',
        // paddingBottom: '50px'
      }

      const stylePhoto = {
        marginTop: '130px',
        borderRadius: '100%',
        marginLeft: '100px'
      }


      const customContentStyle = {
        width: '90%',
        maxWidth: 'none',
      }

      const actions = [
        <FlatButton
        label="Registered all players"
        primary={false}
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
            title="Add new players to the game!"
            subtitle= {this.state.photoError}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            contentStyle={customContentStyle}
            autoScrollBodyContent={true}
          >
          <TextField
            style={{ backgroundColor: 'white', marginBottom: 20 }}
            inputStyle={{ color: '#1F243D', paddingBottom: 10, paddingLeft: 10 }}
            underlineShow={false}
            hintStyle={{ marginLeft: 10 }}
            hintText='Please provide your name...'
            refs="name"
            onChange={(event) => this.handleFormSubmit(event.target.value)}
            errorText={ this.state.nameError}
            value={this.state.name}
            maxLength="12"
          />
          
        <p style={{ color: 'red'}} >{this.state.photoError}</p>

        <div style={cameraBox}>
            <div className='screenshots'>
              <div className='controls'>
                <RaisedButton
                  label='Capture photo!'
                  labelPosition='before'
                  primary={true}
                  icon={<AddPhotoIcon />}
                  onClick={this.handlePhotoClick}
                  style={styleButton}
                />

                <RaisedButton
                  label='Register user!'
                  labelPosition='before'
                  primary={true}
                  icon={<DoneIcon />}
                  onClick={this.handleSaveRegistration}
                />

                </div>

                <Webcam
                  className='newPhoto'
                  audio={false}
                  ref={this.setRef}
                  screenshotFormat='image/jpeg'
                  width={400}
                  style={styleCamera}
                />


              </div>
            <div>
            {this.state.photo ? <img src={this.state.photo} alt='Player' style={stylePhoto} /> : null}
            </div>
          </div>
          </Dialog >
        </div>
      )
    }
  }

  export default connect(null, { saveRegistration })(MakePhoto)
