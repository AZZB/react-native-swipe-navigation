import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

class Stories extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: '#9575CD',
    }
  }

  componentDidMount() {
    const { nav } = this.props;

    nav.onNavigateShouldAllow(() => {
       return true;
    });

    nav.onNavigateLeftStartedListener(({interpolation, start, end, isBack, isMain}) => {
      if(isBack && !isMain) {
        this.setState({color: '#9575CD'})
      } else if(isBack) {
        this.setState({color: 'transparent'})
      }
    })

    nav.onNavigateLeftCompletedListener(({completed, isBack}) => {
      if(!completed && isBack) {
        this.setState({color: '#9575CD'})
      }
    })

    nav.onNavigateRightStartedListener(({isBack, isMain}) => {
      if(!isMain) {
        this.setState({color: 'transparent'})
      }
    })

    nav.onNavigateRightCompletedListener(({completed}) => {
      if(completed) {
        this.setState({color: '#9575CD'})
      }
    })
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.color }]}>
        <View style={styles.list}>
          <TextInput style={{margin: 10, height: 50, paddingLeft: 5}} placeholder="Stories here"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  //  backgroundColor: 'transparent',
    flex: 1,
  },

  list: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 80,
    borderRadius: 5,
  }
})

export default Stories
