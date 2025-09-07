
const { Client } = require("pg");

const client = new Client({
  connectionString:
    "postgresql://neondb_owner:npg_qk8YzKA5hjpc@ep-silent-bird-a8nuaz1i-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
// or if you want to use local postgres sql running through docker then the connection string will look like  
// --> postgresql://postgres:mysecretpassword@localhost/postgres

});
module.exports = { client };