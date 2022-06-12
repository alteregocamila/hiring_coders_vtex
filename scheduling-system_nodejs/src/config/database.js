module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '310789',
  database: 'system',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
  // sslmode: 'required',
  // dialectOptions: {
  //   ssl: {
  //     rejectUnauthorized: false
  //   }
  // }
}
