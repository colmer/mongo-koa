module.exports = {
  secret: 'mysecret',
  root: process.cwd(),
  databasePath: 'mongodb://localhost/user_list_test',
  connectionConfig: {
    server: {
      socketOptions: {
        keepAlive: 1
      },
      poolSize: 5
    }
  }
};