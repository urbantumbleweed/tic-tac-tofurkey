module.exports = {
  recursive: true,
  reporter: 'spec',
  ui: 'bdd',
  require: ['chai', '@babel/register', 'ignore-styles', './test/setup.js'],
}