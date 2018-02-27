import DateBetween from './DateBetween'
import React, { Component } from 'react'
// import './CountDown.css'

export default class Countdown extends Component {

  constructor (props) {
    super(props)
    this.state = { remaining: [] }
  }

  componentDidMount() {
    this.tick()
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    let startDate = new Date()
    let endDate = new Date(this.props.options.endDate)
    let remaining = DateBetween(startDate, endDate)

    if(remaining === false){
      window.clearInterval(this.interval)
      if (this.props.options['cb']) {
        this.props.options.cb()
      }
    }

    this.setState({
      remaining: remaining ? remaining : ['Sleeping Time']
    })
  }

  render() {
    const countdown = this.state.remaining
    return (
      <div className="react-count-down">
       <div className="counter day">{ countdown[0] }</div>
       <div className="counter hour">{ countdown[1] }</div>
       <div className="counter minute">{ countdown[2] }</div>
       <div className="counter second">{ countdown[3] }</div>
      </div>
    )
  };
}
