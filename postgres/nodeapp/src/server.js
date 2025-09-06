const express = require("express");
const { Client } = require("pg");
const app = express();

app.use(express.json());


const client = new Client({
  connectionString:
    "postgresql://neondb_owner:npg_qk8YzKA5hjpc@ep-silent-bird-a8nuaz1i-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
// or if you want to use local postgres sql running through docker then the connection string will look like  
// --> postgresql://postgres:mysecretpassword@localhost/postgres

});

app.listen(4000, async (err) => {
  console.log("server started at 4000");
  createUserTable();
  await client.connect();
});


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

async function insertDataIntoTable({email, name}) {

    // ** this is not the right way to inserting any data --> problem is sql ** injections **
    // const result = await client.query(`
    //     INSERT INTO users (email, name) 
    //     VALUES 
    //     ('${email}');
    // `)
    // return result ;
    // **** 

    // *** the standard way of doing it --> 
    const values = [email, name];
    const insertQuery = `INSERT INTO users (email, name) VALUES ($1, $2)`;
    const result = await client.query(insertQuery, values);
    return result;

}

async function getUserData({email}) {
    const getQuery = `SELECT * from users WHERE email=$1`
    const result = await client.query(getQuery, [email]);
    return result.rows[0];
}

async function updateUserEmail({newEmail, id}) {
    const updateQuery = `UPDATE users SET email=$1 WHERE id=$2`;
    const values = [newEmail, id];
    const result = await client.query(updateQuery, values);
    return result;   
}

app.post('/insert-email', async (req,res) => {
    const result = await insertDataIntoTable(req .body);
    return res.json(result);
})

app.get('/get-user', async (req,res) => {
    const result = await getUserData(req.query);
    return res.json({"result":result});
})

app.post('/update-email', async (req, res) => {
    const result = await updateUserEmail(req.body);
    return res.json(result);
})