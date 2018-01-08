
/**
  Listeners
*/
const allows = {};
const navigateLeftAllows = {};
const navigateRightAllows = {};
const navigateUpAllows = {};
const navigateDownAllows = {};
const navigateLeftStartedListeners = {};
const navigateLeftCompletedListeners = {};
const navigateRightStartedListeners = {};
const navigateRightCompletedListeners = {};
const navigateDownStartedListeners = {};
const navigateDownCompletedListeners = {};
const navigateUpStartedListeners = {};
const navigateUpCompletedListeners = {};


/**
  Manager API
*/
let managerAPI = {};

function setManagerApi(api) {
  managerAPI = api;
}

/**
  Internal API
*/
function getApi() {
  return {
    fireOnNavigateShouldAllow,
    fireOnNavigateLeftShouldAllow,
    fireOnNavigateRightShouldAllow,
    fireOnNavigateUpShouldAllow,
    fireOnNavigateDownShouldAllow,
    fireOnNavigateLeftStartedListener,
    fireOnNavigateLeftCompletedListener,
    fireOnNavigateRightStartedListener,
    fireOnNavigateRightCompletedListener,
    fireOnNavigateDownStartedListener,
    fireOnNavigateDownCompletedListener,
    fireOnNavigateUpStartedListener,
    fireOnNavigateUpCompletedListener,
  };
}

function fireOnNavigateShouldAllow(screenName) {
  const fn = allows[screenName];
  if (!fn) return true;

  // TODO: We have to assert the result of fn to be Boolean type
  return fn();
}

function fireOnNavigateLeftShouldAllow(screenName) {
  const fn = navigateLeftAllows[screenName];
  if (!fn) return true;

  // TODO: We have to assert the result of fn to be Boolean type
  return fn();
}

function fireOnNavigateRightShouldAllow(screenName) {
  const fn = navigateRightAllows[screenName];
  if (!fn) return true;

  // TODO: We have to assert the result of fn to be Boolean type
  return fn();
}

function fireOnNavigateUpShouldAllow(screenName) {
  const fn = navigateUpAllows[screenName];
  if (!fn) return true;

  // TODO: We have to assert the result of fn to be Boolean type
  return fn();
}

function fireOnNavigateDownShouldAllow(screenName) {
  const fn = navigateDownAllows[screenName];
  if (!fn) return true;

  // TODO: We have to assert the result of fn to be Boolean type
  return fn();
}

function fireOnNavigateLeftStartedListener(screenName, config) {
  const listener = navigateLeftStartedListeners[screenName];
  if (!listener) return;

  listener(config);
}

function fireOnNavigateLeftCompletedListener(screenName, completed) {
  const listener = navigateLeftCompletedListeners[screenName];
  if (!listener) return;

  listener(completed);
}

function fireOnNavigateRightStartedListener(screenName, config) {
  const listener = navigateRightStartedListeners[screenName];
  if (!listener) return;

  listener(config);
}

function fireOnNavigateRightCompletedListener(screenName, completed) {
  const listener = navigateRightCompletedListeners[screenName];
  if (!listener) return;

  listener(completed);
}

function fireOnNavigateDownStartedListener(screenName, config) {
  const listener = navigateDownStartedListeners[screenName];
  if (!listener) return;

  listener(config);
}

function fireOnNavigateDownCompletedListener(screenName, completed) {
  const listener = navigateDownCompletedListeners[screenName];
  if (!listener) return;

  listener(completed);
}

function fireOnNavigateUpStartedListener(screenName, config) {
  const listener = navigateUpStartedListeners[screenName];
  if (!listener) return;

  listener(config);
}

function fireOnNavigateUpCompletedListener(screenName, completed) {
  const listener = navigateUpCompletedListeners[screenName];
  if (!listener) return;

  listener(completed);
}

/**
  Props API
*/
function getPropsApi(screenName) {
  if (!screenName) return;

  return {
    onNavigateShouldAllow: onNavigateShouldAllow(screenName),
    onNavigateLeftShouldAllow: onNavigateLeftShouldAllow(screenName),
    onNavigateRightShouldAllow: onNavigateRightShouldAllow(screenName),
    onNavigateUpShouldAllow: onNavigateUpShouldAllow(screenName),
    onNavigateDownShouldAllow: onNavigateDownShouldAllow(screenName),
    onNavigatingListener: onNavigatingListener(screenName),
    onNavigateLeftStartedListener: onNavigateLeftStartedListener(screenName),
    onNavigateRightCompletedListener: onNavigateRightCompletedListener(screenName),
    onNavigateRightStartedListener: onNavigateRightStartedListener(screenName),
    onNavigateLeftCompletedListener: onNavigateLeftCompletedListener(screenName),
    onNavigateDownStartedListener: onNavigateDownStartedListener(screenName),
    onNavigateDownCompletedListener: onNavigateDownCompletedListener(screenName),
    onNavigateUpStartedListener: onNavigateUpStartedListener(screenName),
    onNavigateUpCompletedListener: onNavigateUpCompletedListener(screenName),
    navigateLeft,
    navigateRight,
    navigateUp,
    navigateDown,
    navigateBack,
    navigate,
    cleanUp: cleanUp(screenName),
  };
}

function onNavigateShouldAllow(screenName) {
  return (fn) => {
    allows[screenName] = fn;
  };
}

function onNavigateLeftShouldAllow(screenName) {
  return (fn) => {
    navigateLeftAllows[screenName] = fn;
  };
}

function onNavigateRightShouldAllow(screenName) {
  return (fn) => {
    navigateRightAllows[screenName] = fn;
  };
}

function onNavigateUpShouldAllow(screenName) {
  return (fn) => {
    navigateUpAllows[screenName] = fn;
  };
}

function onNavigateDownShouldAllow(screenName) {
  return (fn) => {
    navigateDownAllows[screenName] = fn;
  };
}

function onNavigatingListener(screenName) {
  return (listener) => {
    navigatingListeners[screenName] = listener;

    return () => {
      navigatingListeners[listener] = undefined;
    };
  };
}

function onNavigateLeftStartedListener(screenName) {
  return (listener) => {
    navigateLeftStartedListeners[screenName] = listener;

    return () => {
      navigateLeftStartedListeners[screenName] = undefined;
    };
  };
}

function onNavigateLeftCompletedListener(screenName) {
  return (listener) => {
    navigateLeftCompletedListeners[screenName] = listener;

    return () => {
      navigateLeftCompletedListeners[screenName] = undefined;
    };
  };
}

function onNavigateRightStartedListener(screenName) {
  return (listener) => {
    navigateRightStartedListeners[screenName] = listener;

    return () => {
      navigateRightStartedListeners[screenName] = undefined;
    };
  };
}

function onNavigateRightCompletedListener(screenName) {
  return (listener) => {
    navigateRightCompletedListeners[screenName] = listener;

    return () => {
      navigateRightCompletedListeners[screenName] = undefined;
    };
  };
}

function onNavigateDownStartedListener(screenName) {
  return (listener) => {
    navigateDownStartedListeners[screenName] = listener;

    return () => {
      navigateDownStartedListeners[screenName] = undefined;
    };
  };
}

function onNavigateDownCompletedListener(screenName) {
  return (listener) => {
    navigateDownCompletedListeners[screenName] = listener;

    return () => {
      navigateDownCompletedListeners[screenName] = undefined;
    };
  };
}

function onNavigateUpStartedListener(screenName) {
  return (listener) => {
    navigateUpStartedListeners[screenName] = listener;

    return () => {
      navigateUpStartedListeners[screenName] = undefined;
    };
  };
}

function onNavigateUpCompletedListener(screenName) {
  return (listener) => {
    navigateUpCompletedListeners[screenName] = listener;

    return () => {
      navigateUpCompletedListeners[screenName] = undefined;
    };
  };
}

function navigateLeft() {
  managerAPI.navigateLeft();
}

function navigateRight() {
  managerAPI.navigateRight();
}

function navigateUp() {
  managerAPI.navigateUp();
}

function navigateDown() {
  managerAPI.navigateDown();
}

function navigateBack() {
  managerAPI.navigateBack();
}

function navigate(screen, config) {
  managerAPI.navigate(screen, config);
}

function cleanUp(screenName) {
  return () => {
    allows[screenName] = undefined;
    navigateLeftAllows[screenName] = undefined;
    navigateRightAllows[screenName] = undefined;
    navigateUpAllows[screenName] = undefined;
    navigateDownAllows[screenName] = undefined;
    navigateLeftStartedListeners[screenName] = undefined;
    navigateLeftCompletedListeners[screenName] = undefined;
    navigateRightStartedListeners[screenName] = undefined;
    navigateRightCompletedListeners[screenName] = undefined;
    navigateDownStartedListeners[screenName] = undefined;
    navigateDownCompletedListeners[screenName] = undefined;
    navigateUpStartedListeners[screenName] = undefined;
    navigateUpCompletedListeners[screenName] = undefined;
  };
}

export default {
  setManagerApi,
  getApi,
  getPropsApi,
};
