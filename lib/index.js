import React from 'react';
import { View, Animated, BackHandler } from 'react-native';
import Gesture, { GESTURES } from './Gesture';
import Transitioner from './Transitioner';
import get_styles, { STYLES, easing } from './styles';
import state from './state';
import nav from './nav';

const defaultTopBar = () => <View style={{ height: 0 }} />;

function createSwipeNavigator(config, { TopBar = defaultTopBar } = {}) {
  state.setConfig(config);

  return () => {
    const SIDES = {
      LEFT: 'LEFT',
      RIGHT: 'RIGHT',
      UP: 'UP',
      DOWN: 'DOWN',
    };

    class Manager extends React.Component {
      constructor(props) {
        super(props);

        this.stateAPI = state.getAPI();
        this.navAPI = nav.getApi();
        nav.setManagerApi({
          navigateLeft: this.navigateLeft.bind(this),
          navigateRight: this.navigateRight.bind(this),
          navigateDown: this.navigateDown.bind(this),
          navigateUp: this.navigateUp.bind(this),
          navigate: this.navigate.bind(this),
          navigateBack: this.navigateBack.bind(this),
        });

        const { screen, screenName } = this.stateAPI.getMain();

        this.state = {
          dy: new Animated.Value(0),
          dx: new Animated.Value(0),

          main: 'A',

          screen_a: screen,
          screenName_a: screenName,
          style_a: { zIndex: 2 },

          screen_b: () => <View style={{ flex: 1 }} />,
          screenName_b: '',
          style_b: { zIndex: 1 },

          overlay_zIndex: -1,
        };
      }

      componentWillMount() {
        this.onSwipeShouldAllow = this.onSwipeShouldAllow.bind(this);
        this.onSwipeStarted = this.onSwipeStarted.bind(this);
        this.onSwipeLeftStarted = this.onSwipeLeftStarted.bind(this);
        this.onSwipeRightStarted = this.onSwipeRightStarted.bind(this);
        this.onSwipeDownStarted = this.onSwipeDownStarted.bind(this);
        this.onSwipeUpStarted = this.onSwipeUpStarted.bind(this);
        this.onSwiping = this.onSwiping.bind(this);
        this.onSwipingRight = this.onSwipingRight.bind(this);
        this.onSwipingLeft = this.onSwipingLeft.bind(this);
        this.onSwipingUp = this.onSwipingUp.bind(this);
        this.onSwipingDown = this.onSwipingDown.bind(this);
        this.onRelease = this.onRelease.bind(this);
        this.onSwipeLeftRelease = this.onSwipeLeftRelease.bind(this);
        this.onSwipeRightRelease = this.onSwipeRightRelease.bind(this);
        this.onSwipeUpRelease = this.onSwipeUpRelease.bind(this);
        this.onSwipeDownRelease = this.onSwipeDownRelease.bind(this);

        this.isAnimationRunning = false;
        this.is_updating = false;
      }

      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPressHandler.bind(this));
      }

      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPressHandler.bind(this));
      }

      hardwareBackPressHandler() {
        const result = this.stateAPI.getBack();

        if (!result) {
          return false;
        }

        const { screenName, screen } = result;

        const values = (this.state.main === 'A') ?
          (
            {
              main: 'B', screen_b: screen, screenName_b: screenName, style_a: { zIndex: 1 }, style_b: { zIndex: 2 },
            }
          ) : (
            {
              main: 'A', screen_a: screen, screenName_a: screenName, style_a: { zIndex: 2 }, style_b: { zIndex: 1 },
            }
          );

        this.state.dx.setValue(0);

        this.updateState(values, () => {
          this.stateAPI.pop();
        });

        return true;
      }

      updateState(values, callback) {
        this.is_updating = true;
        this.setState(values, () => {
          callback && callback();
          this.is_updating = false;
        });
      }

      update(screenName, screen, mainStyle, style, onFinish) {
        const overlay_zIndex = 3;
        let values;

        if (this.state.main === 'A') {
          values = {
            screenName_b: screenName, screen_b: screen, style_a: mainStyle, style_b: style,
          };
        } else {
          values = {
            screenName_a: screenName, screen_a: screen, style_b: mainStyle, style_a: style,
          };
        }

        this.updateState({ ...values, overlay_zIndex }, onFinish);
      }

      defaultStyle() {
        const mainStyle = { zIndex: 2 };
        const style = { zIndex: 1 };
        let values;

        if (this.state.main === 'A') {
          values = { style_a: mainStyle, style_b: style };
        } else {
          values = { style_b: mainStyle, style_a: style };
        }

        this.updateState(values);
      }

      checkNavigationSidePermission(side) {
        let permission;
        const main = this.stateAPI.getMain();

        if (side === SIDES.LEFT) {
          permission = this.navAPI.fireOnNavigateLeftShouldAllow;
        } else if (side === SIDES.RIGHT) {
          permission = this.navAPI.fireOnNavigateRightShouldAllow;
        } else if (side === SIDES.DOWN) {
          permission = this.navAPI.fireOnNavigateDownShouldAllow;
        } else if (side === SIDES.UP) {
          permission = this.navAPI.fireOnNavigateUpShouldAllow;
        } else {
          return false;
        }

        return permission(main.screenName);
      }

      onSwipeShouldAllow() {
        const main = this.stateAPI.getMain();
        return !this.is_updating && !this.isAnimationRunning && this.navAPI.fireOnNavigateShouldAllow(main.screenName);
      }

      onSwipeStarted(gesture) {}

      onSwipeLeftStarted() {
        if (!this.checkNavigationSidePermission(SIDES.RIGHT)) return;
        const result = this.stateAPI.getRight();

        if (!result) {
          this.skipe = true;
          this.defaultStyle();
          return;
        }

        const {
          isBack, screen, screenName, type, color,
        } = result;
        const main = this.stateAPI.getMain();
        let mainStyle = {};
        let style = {};
        this.isBack = false;

        if (isBack) {
          this.isBack = true;
          [mainStyle, style] = get_styles(STYLES.NAVIGATE_BACK_RIGHT, { dx: this.state.dx }, { type: main.type, color: main.color });
        } else {
          [mainStyle, style] = get_styles(STYLES.NAVIGATE_RIGHT, { dx: this.state.dx }, { type, color });
        }

        this.update(screenName, screen, mainStyle, style, () => {
          this.navAPI.fireOnNavigateRightStartedListener(main.screenName, { interpolation: this.state.dx, isBack: this.isBack, isMain: true });
          this.navAPI.fireOnNavigateRightStartedListener(screenName, { interpolation: this.state.dx, isBack: this.isBack, isMain: false });
          this.onFinishNavigating = (completed) => {
            this.navAPI.fireOnNavigateRightCompletedListener(main.screenName, { completed, isBack: this.isBack, isMain: true });
            this.navAPI.fireOnNavigateRightCompletedListener(screenName, { completed, isBack: this.isBack, isMain: false });
          };
        });
      }

      onSwipeRightStarted() {
        if (!this.checkNavigationSidePermission(SIDES.LEFT)) return;

        const result = this.stateAPI.getLeft();

        if (!result) {
          this.skipe = true;
          this.defaultStyle();
          return;
        }

        const {
          isBack, screen, screenName, type, color,
        } = result;
        const main = this.stateAPI.getMain();
        let mainStyle = {};
        let style = {};
        this.isBack = false;

        if (isBack) {
          this.isBack = true;
          [mainStyle, style] = get_styles(STYLES.NAVIGATE_BACK_LEFT, { dx: this.state.dx }, { type: main.type, color: main.color });
        } else {
          [mainStyle, style] = get_styles(STYLES.NAVIGATE_LEFT, { dx: this.state.dx }, { type, color });
        }

        this.update(screenName, screen, mainStyle, style, () => {
          this.navAPI.fireOnNavigateLeftStartedListener(main.screenName, { interpolation: this.state.dx, isBack: this.isBack, isMain: true });
          this.navAPI.fireOnNavigateLeftStartedListener(screenName, { interpolation: this.state.dx, isBack: this.isBack, isMain: false });
          this.onFinishNavigating = (completed) => {
            this.navAPI.fireOnNavigateLeftCompletedListener(main.screenName, { completed, isBack: this.isBack, isMain: true });
            this.navAPI.fireOnNavigateLeftCompletedListener(screenName, { completed, isBack: this.isBack, isMain: false });
          };
        });
      }

      onSwipeUpStarted() {
        if (!this.checkNavigationSidePermission(SIDES.DOWN)) return;
        const result = this.stateAPI.getBottom();

        if (!result) {
          this.skipe = true;
          this.defaultStyle();
          return;
        }

        const {
          isBack, screen, screenName, type, color,
        } = result;
        let mainStyle = {};
        let style = {};
        const main = this.stateAPI.getMain();
        this.isBack = false;

        if (isBack) {
          this.isBack = true;
          [mainStyle, style] = get_styles(STYLES.NAVIGATE_BACK_DOWN, { dy: this.state.dy }, { type: main.type, color: main.color });
        } else {
          [mainStyle, style] = get_styles(STYLES.NAVIGATE_DOWN, { dy: this.state.dy }, { type, color });
        }

        this.update(screenName, screen, mainStyle, style, () => {
          this.navAPI.fireOnNavigateDownStartedListener(main.screenName, { interpolation: this.state.dy, isBack: this.isBack, isMain: true });
          this.navAPI.fireOnNavigateDownStartedListener(screenName, { interpolation: this.state.dy, isBack: this.isBack, isMain: false });
          this.onFinishNavigating = (completed) => {
            this.navAPI.fireOnNavigateDownCompletedListener(main.screenName, { completed, isBack: this.isBack, isMain: true });
            this.navAPI.fireOnNavigateDownCompletedListener(screenName, { completed, isBack: this.isBack, isMain: false });
          };
        });
      }

      onSwipeDownStarted() {
        if (!this.checkNavigationSidePermission(SIDES.UP)) return;
        const result = this.stateAPI.getTop();

        if (!result) {
          this.skipe = true;
          this.defaultStyle();
          return;
        }

        const {
          isBack, screen, screenName, type, color,
        } = result;
        let mainStyle = {};
        let style = {};
        const main = this.stateAPI.getMain();
        this.isBack = false;

        if (isBack) {
          this.isBack = true;
          [mainStyle, style] = get_styles(STYLES.NAVIGATE_BACK_UP, { dy: this.state.dy }, { type: main.type, color: main.color });
        } else {
          [mainStyle, style] = get_styles(STYLES.NAVIGATE_UP, { dy: this.state.dy }, { type, color });
        }

        this.update(screenName, screen, mainStyle, style, () => {
          this.navAPI.fireOnNavigateUpStartedListener(main.screenName, { interpolation: this.state.dy, isBack: this.isBack, isMain: true });
          this.navAPI.fireOnNavigateUpStartedListener(screenName, { interpolation: this.state.dy, isBack: this.isBack, isMain: false });
          this.onFinishNavigating = (completed) => {
            this.navAPI.fireOnNavigateUpCompletedListener(main.screenName, { completed, isBack: this.isBack, isMain: true });
            this.navAPI.fireOnNavigateUpCompletedListener(screenName, { completed, isBack: this.isBack, isMain: false });
          };
        });
      }

      onSwiping() {}

      onSwipingRight({ dx }) {
        if (!this.checkNavigationSidePermission(SIDES.LEFT) || this.skipe) return;
        dx = (dx < 0 && 1) || (dx > 250 && 250) || dx;
        this.state.dx.setValue(dx);
      }

      onSwipingLeft({ dx }) {
        if (!this.checkNavigationSidePermission(SIDES.RIGHT) || this.skipe) return;
        dx = (dx > 0 && -1) || (dx < -250 && -250) || dx;
        this.state.dx.setValue(dx);
      }

      onSwipingUp({ dy }) {
        if (!this.checkNavigationSidePermission(SIDES.DOWN) || this.skipe) return;
        dy = (dy > 0 && -1) || (dy < -250 && -250) || dy;
        this.state.dy.setValue(dy);
      }

      onSwipingDown({ dy }) {
        if (!this.checkNavigationSidePermission(SIDES.UP) || this.skipe) return;
        dy = (dy < 0 && 1) || (dy > 250 && 250) || dy;
        this.state.dy.setValue(dy);
      }

      onRelease() {}

      animate(x, values, completed) {
        this.isAnimationRunning = true;

        Animated.timing(x, { ...values, easing }).start(() => {
          const updateValues = { overlay_zIndex: -1 };
          const main = (this.state.main === 'A') ? 'B' : 'A';

          if (completed) {
            updateValues.main = main;
            updateValues.style_a = (main === 'A') ? { zIndex: 2 } : { zIndex: 1 };
            updateValues.style_b = (main === 'B') ? { zIndex: 2 } : { zIndex: 1 };
          } else {
            updateValues.style_a = (this.state.main === 'A') ? { zIndex: 2 } : { zIndex: 1 };
            updateValues.style_b = (this.state.main === 'B') ? { zIndex: 2 } : { zIndex: 1 };
          }

          this.updateState(updateValues, () => {
            if (completed) {
              if (!this.isBack) {
                this.stateAPI.push(main === 'A' ? this.state.screenName_a : this.state.screenName_b);
              } else {
                this.stateAPI.pop();
              }
            }
            this.onFinishNavigating && this.onFinishNavigating(completed);
            this.isAnimationRunning = false;
          });
        });
      }

      onSwipeLeftRelease({ dx }) {
        if (!this.checkNavigationSidePermission(SIDES.RIGHT) || this.is_updating) return;
        if (this.skipe) {
          this.skipe = false;
          return;
        }

        const values = (dx < -100) ? { toValue: -250, duration: 250 } : { toValue: 0, duration: 250 };
        const completed = (dx < -100);

        this.animate(this.state.dx, values, completed);
      }

      onSwipeRightRelease({ dx }) {
        if (!this.checkNavigationSidePermission(SIDES.LEFT) || this.is_updating) return;
        if (this.skipe) {
          this.skipe = false;
          return;
        }

        const values = (dx > 100) ? { toValue: 250, duration: 250 } : { toValue: 0, duration: 250 };
        const completed = (dx > 100);

        this.animate(this.state.dx, values, completed);
      }

      onSwipeUpRelease({ dy }) {
        if (!this.checkNavigationSidePermission(SIDES.DOWN) || this.is_updating) return;
        if (this.skipe) {
          this.skipe = false;
          return;
        }

        const values = (dy < -100) ? { toValue: -250, duration: 250 } : { toValue: 0, duration: 250 };
        const completed = (dy < -100);

        this.animate(this.state.dy, values, completed);
      }

      onSwipeDownRelease({ dy }) {
        if (!this.checkNavigationSidePermission(SIDES.UP) || this.is_updating) return;
        if (this.skipe) {
          this.skipe = false;
          return;
        }

        const values = (dy > 100) ? { toValue: 250, duration: 250 } : { toValue: 0, duration: 250 };
        const completed = (dy > 100);

        this.animate(this.state.dy, values, completed);
      }

      // exported Manager API for nav
      navigateLeft() {
        this.onSwipeRightStarted();
        this.animate(this.state.dx, { toValue: 250, duration: 250 }, true);
      }

      navigateRight() {
        this.onSwipeLeftStarted();
        this.animate(this.state.dx, { toValue: -250, duration: 250 }, true);
      }

      navigateDown() {
        this.onSwipeUpStarted();
        this.animate(this.state.dy, { toValue: 250, duration: 250 }, true);
      }

      navigateUp() {
        this.onSwipeDownStarted();
        this.animate(this.state.dy, { toValue: -250, duration: 250 }, true);
      }

      navigateBack() {
        this.hardwareBackPressHandler();
      }

      navigate(screen, config) {
        this.is_updating = true;
        this.stateAPI.push(screen, config);
        const main = this.stateAPI.getMain();

        const values = (this.state.main === 'A') ?
          (
            {
              main: 'B', screen_b: main.screen, screenName_b: main.screenName, style_a: { zIndex: 1 }, style_b: { zIndex: 2 },
            }
          ) : (
            {
              main: 'A', screen_a: main.screen, screenName_a: main.screenName, style_a: { zIndex: 2 }, style_b: { zIndex: 1 },
            }
          );

        this.updateState(values);
      }

      render() {
        return (
          <Gesture
            onSwipeShouldAllow={this.onSwipeShouldAllow}
            onSwipeStarted={this.onSwipeStarted}
            onSwipeLeftStarted={this.onSwipeLeftStarted}
            onSwipeRightStarted={this.onSwipeRightStarted}
            onSwipeUpStarted={this.onSwipeUpStarted}
            onSwipeDownStarted={this.onSwipeDownStarted}
            onSwiping={this.onSwiping}
            onSwipingRight={this.onSwipingRight}
            onSwipingLeft={this.onSwipingLeft}
            onSwipingUp={this.onSwipingUp}
            onSwipingDown={this.onSwipingDown}
            onRelease={this.onRelease}
            onSwipeLeftRelease={this.onSwipeLeftRelease}
            onSwipeRightRelease={this.onSwipeRightRelease}
            onSwipeUpRelease={this.onSwipeUpRelease}
            onSwipeDownRelease={this.onSwipeDownRelease}
          >
            <Transitioner component={this.state.screen_a} style={this.state.style_a} nav={nav.getPropsApi(this.state.screenName_a)} overlay_zIndex={this.state.overlay_zIndex} />
            <Transitioner component={this.state.screen_b} style={this.state.style_b} nav={nav.getPropsApi(this.state.screenName_b)} overlay_zIndex={this.state.overlay_zIndex} />
            {/* <Transitioner component={TopBar} style={{zIndex: 2, top: 0, left: 0}}/> */}
          </Gesture>
        );
      }
    }


    return <Manager />;
  };
}

export default createSwipeNavigator;
