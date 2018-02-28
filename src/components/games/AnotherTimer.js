import React, { PureComponent } from 'react'

export default class Loading extends PureComponent {
  state = {
      timer: null,
      counter: 0
    }

  componentDidMount() {
      let timer = setInterval(this.tick.bind(this), 1000)
      this.setState({timer})
    }

  componentWillUnmount() {
      this.clearInterval(this.state.timer)
    }

  tick() {
      this.setState({
        counter: this.state.counter + 1
      })
    }

  render() {

    return (
    <div>TickTack{"...".substr(0, this.state.counter % 3 + 1)}</div>
    )
  }
}
