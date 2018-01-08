import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

class Dialog extends React.Component {
  componentDidMount() {
    const { nav } = this.props;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={{color: 'black'}}>Dialog</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  wrapper: {
    height: 350,
    width: 250,
    padding: 50,
    backgroundColor: 'white',
  }
})

export default Dialog
