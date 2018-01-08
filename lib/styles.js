import { Dimensions, Animated, Easing } from 'react-native';
import hexToRgbA from './hex_to_rgba';

const { width, height } = Dimensions.get('window');

export const STYLES = {
  NAVIGATE_LEFT: 'NAVIGATE_LEFT',
  NAVIGATE_BACK_LEFT: 'NAVIGATE_BACK_LEFT',
  NAVIGATE_RIGHT: 'NAVIGATE_RIGHT',
  NAVIGATE_BACK_RIGHT: 'NAVIGATE_BACK_RIGHT',
  NAVIGATE_DOWN: 'NAVIGATE_DOWN',
  NAVIGATE_BACK_UP: 'NAVIGATE_BACK_UP',
  NAVIGATE_UP: 'NAVIGATE_UP',
  NAVIGATE_BACK_DOWN: 'NAVIGATE_BACK_DOWN',
};

export const easing = Easing.bezier(0, 0, 0.34, 0.8);

export default function styles(style_type, { dx, dy }, config) {
  switch (style_type) {
    case STYLES.NAVIGATE_LEFT: {
      return [navigateLeftMainStyle(dx, config), navigateLeftStyle(dx, config)];
    }
    case STYLES.NAVIGATE_BACK_RIGHT: {
      return [navigateBackRightMainStyle(dx, config), navigateBackRightStyle(dx, config)];
    }
    case STYLES.NAVIGATE_RIGHT: {
      return [navigateRightMainStyle(dx, config), navigateRightStyle(dx, config)];
    }
    case STYLES.NAVIGATE_BACK_LEFT: {
      return [navigateBackLeftMainStyle(dx, config), navigateBackLeftStyle(dx, config)];
    }
    case STYLES.NAVIGATE_DOWN: {
      return [navigateDownMainStyle(dy, config), navigateDownStyle(dy, config)];
    }
    case STYLES.NAVIGATE_BACK_UP: {
      return [navigateBackUpMainStyle(dy, config), navigateBackUpStyle(dy, config)];
    }
    case STYLES.NAVIGATE_UP: {
      return [navigateUpMainStyle(dy, config), navigateUpStyle(dy, config)];
    }
    case STYLES.NAVIGATE_BACK_DOWN: {
      return [navigateBackDownMainStyle(dy, config), navigateBackDownStyle(dy, config)];
    }
    default: {
      return [{}, {}];
    }
  }
}

function navigateLeftMainStyle(dx, { type, color }) {
  let left;

  if (type === 'over' || type === 'place') {
    left = 0;
  } else {
    left = dx.interpolate({ inputRange: [0, 250], outputRange: [0, width] });
  }
  color = (!color && 'transparent') || dx.interpolate({ inputRange: [0, 220], outputRange: [hexToRgbA(color, 0), hexToRgbA(color, 1)] });

  return {
    zIndex: 1, top: 0, left, color,
  };
}

function navigateLeftStyle(dx, { type }) {
  let left = 0,
    opacity = 1;

  if (type === 'place') {
    opacity = dx.interpolate({ inputRange: [0, 200], outputRange: [0, 1], easing });
  } else {
    left = dx.interpolate({ inputRange: [0, 250], outputRange: [-width, 0], easing });
  }

  return {
    zIndex: 2, top: 0, left, opacity,
  };
}

function navigateBackRightMainStyle(dx, { type }) {
  let left,
    opacity = 1;

  if (type === 'place') {
    left = 0;
    opacity = dx.interpolate({ inputRange: [-200, 0], outputRange: [0, 1], easing });
  } else {
    left = dx.interpolate({ inputRange: [-250, 0], outputRange: [-width, 0], easing });
  }

  return {
    zIndex: 2, top: 0, left, opacity,
  };
}

function navigateBackRightStyle(dx, { type, color }) {
  let left;

  if (type === 'over') {
    left = 0;
  } else if (type === 'place') {
    left = 0;
  } else {
    left = dx.interpolate({ inputRange: [-250, 0], outputRange: [0, width], easing });
  }

  color = (!color && 'transparent') || dx.interpolate({ inputRange: [-220, 0], outputRange: [hexToRgbA(color, 0), hexToRgbA(color, 1)], easing });

  return {
    zIndex: 1, top: 0, left, color,
  };
}

function navigateRightMainStyle(dx, { type, color }) {
  let left = 0;

  if (type === 'over' || type === 'place') {
    left = 0;
  } else {
    left = dx.interpolate({ inputRange: [-250, 0], outputRange: [-width, 0], easing });
  }

  color = (!color && 'transparent') || dx.interpolate({ inputRange: [-220, 0], outputRange: [hexToRgbA(color, 1), hexToRgbA(color, 0)], easing });

  return {
    zIndex: 1, top: 0, left, color,
  };
}

function navigateRightStyle(dx, { type }) {
  let left = 0,
    opacity = 1;

  if (type === 'place') {
    opacity = dx.interpolate({ inputRange: [-200, 0], outputRange: [1, 0], easing });
  } else {
    left = dx.interpolate({ inputRange: [-250, 0], outputRange: [0, width], easing });
  }

  return {
    zIndex: 2, top: 0, left, opacity,
  };
}

function navigateBackLeftMainStyle(dx, { type }) {
  let left,
    opacity = 1;

  if (type === 'place') {
    left = 0;
    opacity = dx.interpolate({ inputRange: [0, 250], outputRange: [1, 0], easing });
  } else {
    left = dx.interpolate({ inputRange: [0, 250], outputRange: [0, width], easing });
  }

  return {
    zIndex: 2, top: 0, left, opacity,
  };
}

function navigateBackLeftStyle(dx, { type, color }) {
  let left;

  if (type === 'over') {
    left = 0;
  } else if (type === 'place') {
    left = 0;
  } else {
    left = dx.interpolate({ inputRange: [0, 250], outputRange: [-width, 0], easing });
  }

  color = (!color && 'transparent') || dx.interpolate({ inputRange: [0, 220], outputRange: [hexToRgbA(color, 1), hexToRgbA(color, 0)], easing });

  return {
    zIndex: 1, top: 0, left, color,
  };
}

function navigateDownMainStyle(dy, { type, color }) {
  let top = 0;

  if (type === 'over' || type === 'place') {
    top = 0;
  } else {
    top = dy.interpolate({ inputRange: [-250, 0], outputRange: [-height, 0], easing });
  }

  color = (!color && 'transparent') || dy.interpolate({ inputRange: [-220, 0], outputRange: [hexToRgbA(color, 1), hexToRgbA(color, 0)], easing });

  return {
    zIndex: 1, left: 0, top, color,
  };
}

function navigateDownStyle(dy, { type }) {
  let top = 0,
    opacity = 1;

  if (type === 'place') {
    opacity = dy.interpolate({ inputRange: [-250, 0], outputRange: [1, 0], easing });
  } else {
    top = dy.interpolate({ inputRange: [-250, 0], outputRange: [0, height], easing });
  }

  return {
    zIndex: 2, left: 0, top, opacity,
  };
}

function navigateBackUpMainStyle(dy, { type }) {
  let top,
    opacity = 1;

  if (type === 'place') {
    top = 0;
    opacity = dy.interpolate({ inputRange: [0, 250], outputRange: [1, 0], easing });
  } else {
    top = dy.interpolate({ inputRange: [0, 250], outputRange: [0, height], easing });
  }

  return {
    zIndex: 2, left: 0, top, opacity,
  };
}

function navigateBackUpStyle(dy, { type, color }) {
  let top;

  if (type === 'over') {
    top = 0;
  } else if (type === 'place') {
    top = 0;
  } else {
    top = dy.interpolate({ inputRange: [0, 250], outputRange: [-height, 0], easing });
  }

  color = (!color && 'transparent') || dy.interpolate({ inputRange: [0, 220], outputRange: [hexToRgbA(color, 1), hexToRgbA(color, 0)], easing });

  return {
    zIndex: 1, left: 0, top, color,
  };
}

function navigateUpMainStyle(dy, { type, color }) {
  let top = 0;

  if (type === 'over' || type === 'place') {
    top = 0;
  } else {
    top = dy.interpolate({ inputRange: [0, 250], outputRange: [0, height], easing });
  }

  color = (!color && 'transparent') || dy.interpolate({ inputRange: [0, 220], outputRange: [hexToRgbA(color, 0), hexToRgbA(color, 1)], easing });

  return {
    zIndex: 1, left: 0, top, color,
  };
}

function navigateUpStyle(dy, { type }) {
  let top = 0,
    opacity = 1;

  if (type === 'place') {
    opacity = dy.interpolate({ inputRange: [0, 250], outputRange: [0, 1], easing });
  } else {
    top = dy.interpolate({ inputRange: [0, 250], outputRange: [-height, 0], easing });
  }

  return {
    zIndex: 2, left: 0, top, opacity,
  };
}

function navigateBackDownMainStyle(dy, { type }) {
  let top,
    opacity = 1;

  if (type === 'place') {
    top = 0;
    opacity = dy.interpolate({ inputRange: [-250, 0], outputRange: [0, 1], easing });
  } else {
    top = dy.interpolate({ inputRange: [-250, 0], outputRange: [-height, 0], easing });
  }

  return {
    zIndex: 2, left: 0, top, opacity,
  };
}

function navigateBackDownStyle(dy, { type, color }) {
  let top;

  if (type === 'over') {
    top = 0;
  } else if (type === 'place') {
    top = 0;
  } else {
    top = dy.interpolate({ inputRange: [-250, 0], outputRange: [0, height], easing });
  }

  color = (!color && 'transparent') || dy.interpolate({ inputRange: [-220, 0], outputRange: [hexToRgbA(color, 0), hexToRgbA(color, 1)], easing });

  return {
    zIndex: 1, left: 0, top, color,
  };
}
