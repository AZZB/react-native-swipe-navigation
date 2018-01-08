import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import NewScreen from './NewScreen'

class Camera extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { nav } = this.props;
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    const { nav } = this.props

    return (
      <View style={styles.container}>
        <View >
          <Text style={{fontSize: 30, marginBottom: 50}}>Camera</Text>
          <TouchableOpacity style={styles.button} onPress={() => nav.navigateLeft()}><Text>navigate Left</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => nav.navigateRight()}><Text>navigate Right</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => nav.navigateDown()}><Text>navigate Down</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => nav.navigateUp()}><Text>navigate Up</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => nav.navigate(NewScreen)}><Text>New Screen</Text></TouchableOpacity>
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b5b5b5',
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    flexDirection: 'column',
  },

  button: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 15,
  }
})

export default Camera
