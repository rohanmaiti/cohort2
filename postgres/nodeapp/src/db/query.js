const { client } = require('./client.js');

// insert user data
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

// read data
async function getUserData({email}) {
    const getQuery = `SELECT * from users WHERE email=$1`
    const result = await client.query(getQuery, [email]);
    return result.rows[0];
}

// update data
async function updateUserEmail({newEmail, id}) {
    const updateQuery = `UPDATE users SET email=$1 WHERE id=$2`;
    const values = [newEmail, id];
    const result = await client.query(updateQuery, values);
    return result;   
}

// delete user 
async function deleteUser( {id, email} ) {
    const deleteQuery = `DELETE FROM users WHERE id=$1 AND email=$2`;
    const values = [id, email];
    const result = await client.query(deleteQuery, values);
    return result;
}

module.exports = { 
    insertDataIntoTable,
    updateUserEmail,
    getUserData,
    deleteUser
}