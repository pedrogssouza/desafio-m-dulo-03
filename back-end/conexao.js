const {Pool} = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'market_cubos',
    password: '1234',
    port: 5432
});

function query(text, param){
    return pool.query(text, param);
}

module.exports = {query}