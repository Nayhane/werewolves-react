import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Webcam from 'react-webcam';

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

  handleClick = () => {
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
            <button onClick={this.handleClick}>capture</button>
          </div>
          {this.state.screenshot ? <img src={this.state.screenshot} alt='Player' /> : null}
        </div>
      </div>
    )
  }
}

export default connect(null, {  })(MakePhoto)
