// TODO : will change it after updating babel configuration
const isGlobalThisExists = (fn) => {
  if (!window.localStorage || !window.JSON) {
    return;
  }
  return fn;
}

const getLocalStorage = isGlobalThisExists((key,) => {
  return JSON.parse(localStorage.getItem(key));
});

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

module.exports = {
  getLocalStorage,
  setLocalStorage: isGlobalThisExists(setLocalStorage),
}
