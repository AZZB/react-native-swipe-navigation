import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class TopBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>BENEKA AZZEDDINE</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 250,
    backgroundColor: 'transparent',
  },

  text: {
    fontSize: 20,
    color: 'white',
  }
})

export default TopBar
