import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

class Memories extends React.Component {
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

    nav.onNavigateDownStartedListener(({interpolation, start, end, isBack, isMain}) => {
      this.setState({color: 'transparent'})
    })

    nav.onNavigateDownCompletedListener(({completed, isBack}) => {
      if(completed) {
        this.setState({color: '#E53935'})
      }
    })

    nav.onNavigateUpStartedListener(({isBack, isMain}) => {
      this.setState({color: 'transparent'})
    })

    nav.onNavigateUpCompletedListener(({completed, isBack}) => {
      if(completed || isBack && !completed) {
        this.setState({color: '#E53935'})
      }
    })

  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.color }]}>
        <View style={styles.list}>
          <TextInput style={{margin: 10, height: 50, paddingLeft: 5}} placeholder="Memories here"/>
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'transparent',
    flex: 1,
  },

  list: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 80,
    borderRadius: 5,
  }
})

export default Memories
