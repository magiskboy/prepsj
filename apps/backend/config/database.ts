export default ({ env }) => {
  const certData = env('DATABASE_SSL_CA', '');
  const ca = Buffer.from(certData, 'base64').toString('ascii');

  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'prepsj'),
        user: env('DATABASE_USERNAME', 'prepsj'),
        password: env('DATABASE_PASSWORD', 'prepsj'),
        ssl: {
          ca,
          rejectUnauthorized: env.bool(
            'DATABASE_SSL_REJECT_UNAUTHORIZED',
            false,
          ),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 4) },
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
