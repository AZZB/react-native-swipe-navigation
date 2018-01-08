import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Search extends React.Component {
  componentDidMount() {
    const { nav } = this.props;

    // nav.onNavigateShouldAllow(() => {
    //    return true;
    // });

    nav.onNavigateDownShouldAllow(() => false)

  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={{color: 'white'}}>Search</Text>
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212121',
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
})

export default Search
