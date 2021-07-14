const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'xsiscorner',
    user: 'postgres',
    password: '12345678'
})

module.exports = {
    pool,
    jwt_secret: '2354kjhbf%1294('
}