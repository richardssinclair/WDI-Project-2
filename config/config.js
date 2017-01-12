module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/pubcrawl',
  secret: process.env.SECRET || 'Secret hush hush'
};
