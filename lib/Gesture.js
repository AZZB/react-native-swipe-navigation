import React from 'react';
import PropTypes from 'prop-types';
import { View, PanResponder } from 'react-native';

export const GESTURES = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

class Gesture extends React.Component {

  componentWillMount() {
    const {
      onSwipeShouldAllow,
      onSwipeStarted,
      onSwipeUpStarted,
      onSwipeDownStarted,
      onSwipeLeftStarted,
      onSwipeRightStarted,
      onSwiping,
      onSwipingUp,
      onSwipingDown,
      onSwipingLeft,
      onSwipingRight,
      onRelease,
      onSwipeUpRelease,
      onSwipeDownRelease,
      onSwipeLeftRelease,
      onSwipeRightRelease,
    } = this.props;

    this.panResponder = PanResponder.create({

      onStartShouldSetPanResponderCapture: () => false,

      onMoveShouldSetPanResponderCapture: (e, { dx, dy }) => (Math.abs(dy) > 2 || Math.abs(dx) > 2) && onSwipeShouldAllow(),

      onPanResponderGrant: () => {

      },

      onPanResponderMove: (e, gestureState) => {
        const {
          dy, dx, moveX, moveY, x0, y0,
        } = gestureState;

        if (!this.gesture && (Math.abs(dy) > 3 || Math.abs(dx) > 3)) {
          const angle = Math.atan2(moveY - y0, moveX - x0) * 180 / Math.PI;

          if (angle > 45 && angle <= 135) {
            this.gesture = GESTURES.SWIPE_DOWN;
            onSwipeDownStarted(gestureState);
          }
          if (angle >= 135 && angle <= 180 || angle < -135 && angle >= -180) {
            this.gesture = GESTURES.SWIPE_LEFT;
            onSwipeLeftStarted(gestureState);
          }
          if (angle < -45 && angle >= -135) {
            this.gesture = GESTURES.SWIPE_UP;
            onSwipeUpStarted(gestureState);
          }
          if (angle > -45 && angle <= 45) {
            this.gesture = GESTURES.SWIPE_RIGHT;
            onSwipeRightStarted(gestureState);
          }

          onSwipeStarted(this.gesture, gestureState);
        }

        if (this.gesture) {
          switch (this.gesture) {
            case GESTURES.SWIPE_UP: {
              onSwipingUp(gestureState);
              break;
            }

            case GESTURES.SWIPE_DOWN: {
              onSwipingDown(gestureState);
              break;
            }

            case GESTURES.SWIPE_LEFT: {
              onSwipingLeft(gestureState);
              break;
            }

            case GESTURES.SWIPE_RIGHT: {
              onSwipingRight(gestureState);
              break;
            }
          }

          onSwiping(this.gesture, gestureState);
        }
      },

      onPanResponderRelease: (e, gestureState) => {
        if (this.gesture === GESTURES.SWIPE_UP) {
          onSwipeUpRelease(gestureState);
        } else if (this.gesture === GESTURES.SWIPE_DOWN) {
          onSwipeDownRelease(gestureState);
        } else if (this.gesture === GESTURES.SWIPE_LEFT) {
          onSwipeLeftRelease(gestureState);
        } else {
          onSwipeRightRelease(gestureState);
        }

        onRelease(gestureState, this.gesture);
        this.gesture = null;
      },
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }} {...this.panResponder.panHandlers}>
        {this.props.children}
      </View>
    );
  }
}

Gesture.propTypes = {
  onSwipeShouldAllow: PropTypes.func,
  onSwipeStarted: PropTypes.func,
  onSwipeDownStarted: PropTypes.func,
  onSwipeUpStarted: PropTypes.func,
  onSwipeRightStarted: PropTypes.func,
  onSwipeLeftStarted: PropTypes.func,
  onSwiping: PropTypes.func,
  onSwipingDown: PropTypes.func,
  onSwipingUp: PropTypes.func,
  onSwipingRight: PropTypes.func,
  onSwipingLeft: PropTypes.func,
  onSwipeUpRelease: PropTypes.func,
  onSwipeDownRelease: PropTypes.func,
  onSwipeLeftRelease: PropTypes.func,
  onSwipeRightRelease: PropTypes.func,
  onRelease: PropTypes.func,
};

Gesture.defaultProps = {
  onSwipeShouldAllow: () => true,
  onSwipeStarted: () => {},
  onSwipeDownStarted: () => {},
  onSwipeUpStarted: () => {},
  onSwipeRightStarted: () => {},
  onSwipeLeftStarted: () => {},
  onSwiping: () => {},
  onSwipingDown: () => {},
  onSwipingUp: () => {},
  onSwipingRight: () => {},
  onSwipingLeft: () => {},
  onSwipeUpRelease: () => {},
  onSwipeDownRelease: () => {},
  onSwipeLeftRelease: () => {},
  onSwipeRightRelease: () => {},
  onRelease: () => {},
};

export default Gesture;
