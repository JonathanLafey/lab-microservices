module.exports = {
  // map the app's settings
  server: {
    port: process.env.PORT || 3000,
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URI,
  },
};
