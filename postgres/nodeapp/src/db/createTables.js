const { client } = require("./client.js");

// write a function to create a table user in your DB
async function createUserTable () {
  const result = await client.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(50)  UNIQUE NOT NULL,
        name varchar(50) NOT NULL
        );
        `);
  console.log(result);
};

module.exports = {
    createUserTable
}