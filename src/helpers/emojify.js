export const emojify = (v, defaultValue = '') => {
  return {
    'X': '🍗',
    'O': '🍞',
  }[v] || defaultValue;
}

export default emojify;
