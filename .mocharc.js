module.exports = {
  recursive: true,
  reporter: 'spec',
  ui: 'bdd',
  require: ['chai', '@babel/register', './test/setup.js'],
}