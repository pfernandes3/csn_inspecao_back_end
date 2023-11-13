module.exports = {

  development: {
      client: 'mssql',
      connection: {
          host: 'localhost',
          //user: 'pedro.fernandes',
          //password: '123',
          user: 'pedro.v',
          password: '123456',
          database: 'db_sistema_inspecao',
          timezone: 'UTC',
          options: {
              port: 1433
          }
      },
  }
}
