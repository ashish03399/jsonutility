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

const removeKey = (key) => {
  localStorage.removeItem(key);
};

module.exports = {
  getLocalStorage,
  setLocalStorage: isGlobalThisExists(setLocalStorage),
  removeKey: isGlobalThisExists(removeKey),
}
