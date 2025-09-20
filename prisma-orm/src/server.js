const express = require('express');
const app = express();

const { PrismaClient } = require('@prisma/client'); 

app.listen(4000, (err) => {
    if (err) {
        console.log('error in listening');
    } else {
        console.log('setver stared at 4000');
    }
})

// perform crud 