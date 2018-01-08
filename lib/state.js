
let config = {};
const stack = [];

const BACK = '@BACK';

function setConfig(_config) {
  config = setupConfig(_config);
  stack.push(Object.keys(config)[0]);
}

function setupConfig(config) {
  config = { ...config };

  const keys = Object.keys(config);

  keys.forEach((key) => {
    if (!config[key]) {
      throw new Error(`config ${key} should be an object`);
    }

    let {
      screen, right, left, bottom, top, color, type,
    } = config[key];

    if(!type) type = 'push';

    if(type !== 'over' && type !== 'push' && type !== 'place') {
      throw new Error('the type property accept one of "over" "push" "place"')
    }

    if(color && !(/^#([A-Fa-f0-9]{3}){1,2}$/.test(color))) {
      throw new Error('the color accepts just hex type')
    }

    if (typeof screen !== 'function') {
      throw new Error(`screen ${key} should be a function`);
    }

    if (screen === BACK) {
      throw new Error(`screen should not be ${BACK} in ${key}`);
    }

    if (right && right !== BACK) {
      if (!config[right]) {
        throw new Error(`the right property "${right}" in the screen ${key} should be point to an existence screen`);
      }

      config[right].left = BACK;
    }

    if (left && left !== BACK) {
      if (!config[left]) {
        throw new Error(`the left property "${left}" in the screen ${key} should be point to an existence screen`);
      }

      config[left].right = BACK;
    }

    if (bottom && bottom !== BACK) {
      if (!config[bottom]) {
        throw new Error(`the bottom property "${bottom}" in the screen ${key} should be point to an existence screen`);
      }

      config[bottom].top = BACK;
    }

    if (top && top !== BACK) {
      if (!config[top]) {
        throw new Error(`the top property "${top}" in the screen ${key} should be point to an existence screen`);
      }

      config[top].bottom = BACK;
    }
  });

  return config;
}

function log() {
  console.log('------------- state -----------');
  console.log('config: ', config);
  console.log('stack: ', stack);
  console.log('-------------------------------');
}

// API
function getAPI() {
  return {
    getMain,
    getLeft,
    getRight,
    getTop,
    getBottom,
    getBack,
    push,
    pop,
  };
}

function getMain() {
  const screenName = stack[stack.length - 1];
  const { screen, color, type } = config[screenName];

  return {
    screenName, screen, color, type,
  };
}

function getLeft() {
  const screenName = stack[stack.length - 1];
  const { left } = config[screenName];

  if (left === BACK) {
    return getBack();
  }

  if (left) {
    const { screen, color, type } = config[left];
    return {
      screenName: left, screen, color, type,
    };
  }

  return null;
}

function getRight() {
  const screenName = stack[stack.length - 1];
  const { right } = config[screenName];

  if (right === BACK) {
    return getBack();
  }

  if (right) {
    const { screen, color, type } = config[right];
    return {
      screenName: right, screen, color, type,
    };
  }

  return null;
}

function getTop() {
  const screenName = stack[stack.length - 1];
  const { top } = config[screenName];

  if (top === BACK) {
    return getBack();
  }

  if (top) {
    const { screen, color, type } = config[top];
    return {
      screenName: top, screen, color, type,
    };
  }

  return null;
}

function getBottom() {
  const screenName = stack[stack.length - 1];
  const { bottom } = config[screenName];

  if (bottom === BACK) {
    return getBack();
  }

  if (bottom) {
    const { screen, color, type } = config[bottom];
    return {
      screenName: bottom, screen, color, type,
    };
  }

  return null;
}

function getBack() {
  if (stack.length < 2) return null;

  const screenName = stack[stack.length - 2];
  const { screen, color, type } = config[screenName];
  return {
    isBack: true, screenName, screen, color, type,
  };
}

function push(screenName, { leaveFrom = 'right', type = 'over', color } = {}) {
  if (typeof screenName === 'string') {
    if (!config[screenName]) {
      throw new Error(`${screenName} doesn't exist`);
    }
  } else if (typeof screenName === 'function') {
    if(leaveFrom === 'left') {
      leaveFrom = 'right'
    } else if(leaveFrom === 'right') {
      leaveFrom = 'left'
    } else if(leaveFrom === 'top') {
      leaveFrom = 'bottom'
    } else {
      leaveFrom = 'top'
    }

    const screen = screenName;
    screenName = `screen-${Date.now()}-${Math.random()}`;
    config[screenName] = {
      screen, [leaveFrom]: BACK, type, color,
    };
  } else {
    throw new Error('screen should be a string or a function');
  }

  stack.push(screenName);
}

function pop() {
  stack.pop();
}

export default {
  setConfig,
  log,
  getAPI,
};
