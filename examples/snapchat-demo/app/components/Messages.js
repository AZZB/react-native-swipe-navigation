import React from 'react'
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native'

class Messages extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: 'transparent',
    }
  }

  componentDidMount() {
    const { nav } = this.props;

    nav.onNavigateShouldAllow(() => {
       return true;
    });

    nav.onNavigateLeftStartedListener(({interpolation, start, end, isBack, isMain}) => {
      if(isBack) {
        this.setState({color: 'transparent'})
      }
    })

    nav.onNavigateLeftCompletedListener(({completed}) => {
      if(completed) {
        this.setState({color: '#64B5F6'})
      }
    })

    nav.onNavigateRightStartedListener(({isBack}) => {
      if(isBack) {
        this.setState({color: 'transparent'})
      }
    })

    nav.onNavigateRightCompletedListener(({completed, isBack}) => {
      if(!completed && isBack) {
        this.setState({color: '#64B5F6'})
      }
    })
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    return (
      <Animated.View style={[styles.container, { backgroundColor: this.state.color }]}>
        <View style={styles.list}>
          <TextInput style={{margin: 10, height: 50, paddingLeft: 5}} placeholder="Message here"/>
        </View>
      </Animated.View>
    )

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

export default Messages
