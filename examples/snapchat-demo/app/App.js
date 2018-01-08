import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Navigator from './Navigator'

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App
