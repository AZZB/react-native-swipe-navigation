import SwipeNavigator from 'react-native-swipe-navigation'
import Messages from './components/Messages'
import Stories from './components/Stories'
import Memories from './components/Memories'
import Camera from './components/Camera'
import Search from './components/Search'
import Discover from './components/Discover'

const Navigator = SwipeNavigator({
  Camera: {
    screen: Camera,
    left: 'Messages',
    right: 'Stories',
    bottom: 'Memories',
    top: 'Search',
  },

  Messages: {
    screen: Messages,
    color: '#64B5F6',
    type: 'over',
  },

  Discover: {
    screen: Discover,
    type: 'over',
  },

  Stories: {
    screen: Stories,
    right: 'Discover',
    color: '#9575CD',
    type: 'over',
  },

  'Memories': {
    screen: Memories,
    color: '#E53935',
    type: 'over',
  },

  Search: {
    screen: Search,
    type: 'place',
  }
})

export default Navigator
