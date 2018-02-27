import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'



class Sidebar extends PureComponent {
  static propTypes = {
    fetchOneGame: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    game: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      winnerId: PropTypes.string,
      players: PropTypes.arrayOf(playerShape).isRequired,
      draw: PropTypes.bool,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
    currentPlayer: playerShape,
    isPlayer: PropTypes.bool,
    isJoinable: PropTypes.bool,
  }

  componentWillMount() {
this.fetchPlayers();
  }

  componentWillReceiveProps(nextProps) {

  }



  render() {

    return (

    )
  }
}

const mapStateToProps = ({ currentUser, games }, { match }) => {

  }
}

export default connect(mapStateToProps, {

})(Sidebar)
