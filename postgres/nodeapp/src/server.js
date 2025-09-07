const express = require("express");
const { createUserTable } = require("./db/createTables.js");
const { insertDataIntoTable, getUserData, updateUserEmail, deleteUser } = require("./db/query.js");
const { client } = require("./db/client.js");
const app = express();

app.use(express.json());


app.listen(4000, async (err) => {
  console.log("server started at 4000");
  createUserTable();
  await client.connect();
});



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

app.post('delete-user', async (req, res) => {
    const result = await deleteUser(req.body);
    return res.json(result);
})