module.exports = {
  // map the app's settings
  server: {
    port: process.env.PORT || 3000,
  },
  db: {
    db: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER || '127.0.0.1:27017',
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URI,
  },
};
