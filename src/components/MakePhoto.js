import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import FaceIcon from 'material-ui/svg-icons/action/face'

import Webcam from 'react-webcam'

const styles = {
  button: {
    margin: 0,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export class MakePhoto extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      tab: 0
    }
  }

  setRef = (webcam) => {
    this.webcam = webcam
  }

  handlePhotoClick = () => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot })
  }


  render() {
    return (
      <div>
        <Webcam
          className="newPhoto"
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          />

        <h2>Screenshots</h2>
        <div className='screenshots'>
          <div className='controls'>
            <RaisedButton
              label="Capture photo!"
              labelPosition="before"
              primary={true}
              icon={<FaceIcon />}
              style={styles.button}
              onClick={this.handlePhotoClick}
            />
          </div>
          {this.state.screenshot ? <img src={this.state.screenshot} alt='Player' /> : null}
        </div>
      </div>
    )
  }
}

export default connect(null, {  })(MakePhoto)
