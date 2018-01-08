import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Dialog from './Dialog'

class NewScreen extends React.Component {
  componentDidMount() {
    const { nav } = this.props;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 50}}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.nav.navigate(Dialog, {leaveFrom: 'bottom'})}><Text>open Dialog</Text></TouchableOpacity>
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fd9d62',
    flex: 1,
  },
  button: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 15,
  }
})

export default NewScreen
