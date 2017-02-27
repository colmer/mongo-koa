module.exports = {
  secret: 'mysecret',
  root: process.cwd(),
  databasePath: 'mongodb://localhost/user_list',
  connectionConfig: {
    server: {
      socketOptions: {
        keepAlive: 1
      },
      poolSize: 5
    }
  }
};
