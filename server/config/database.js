module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        database: env("EOS_DATABASE_DB_DEV"),
        uri: env("EOS_DATABASE_URI_DEV"),
      },
      options: {
        ssl: true,
      },
    },
  },
});
