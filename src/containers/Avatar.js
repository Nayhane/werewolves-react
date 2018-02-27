import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPlayers} from '../actions/games/fetch'
//material ui
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import './Avatar.css'



class Avatars extends PureComponent {
  static propTypes = {
    fetchPlayers: PropTypes.func.isRequired,
    player: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.object.isRequired,
      mayor: PropTypes.bool,
      dead: PropTypes.bool,
      message: PropTypes.bool,
    }),
  }

  componentWillMount() {
    this.props.fetchPlayers();
  }

  componentWillReceiveProps(nextProps) {

  }

  renderAvatar(player, index){
   return(
     <div  key={index} className='avatar'>
     <List>
      <ListItem
       disabled={true}
       leftAvatar={
        <Avatar src={player.photo}
        size={80}
        />
       }
      >
      </ListItem>
      <br /><br /><br />
       <div className='name'>{ player.name }</div>
      </List>
      </div>
   )
  }

  render() {
    return (
      <div>
        <div>{ this.props.players.map(this.renderAvatar) }</div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, players }, { match }) => {
  return {
    players
  }
}


export default connect(mapStateToProps, { fetchPlayers })(Avatars)
