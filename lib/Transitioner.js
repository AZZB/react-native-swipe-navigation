import React from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';

const viewport = Dimensions.get('window');

class Transitioner extends React.Component {
  render() {
    const {
      component: Component, style, overlay_zIndex, ...rest
    } = this.props;
    const { color, ...restStyle } = style;
    const backgroundColor = color || 'transparent';

    return (
      <Animated.View style={[styles.container, restStyle]}>
        <Component {...rest} />
        <Animated.View style={[styles.overlay, { backgroundColor, zIndex: overlay_zIndex }]} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: viewport.height,
    width: viewport.width,
    top: 0,
    left: 0,
  },

  overlay: {
    position: 'absolute',
    height: viewport.height,
    width: viewport.width,
    top: 0,
    left: 0,
  },
});

export default Transitioner;
