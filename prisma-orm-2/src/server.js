const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000 ;
const app = express();
app.use(express.json());

const demo_routes = require('./routes/demo.route');


app.use('/', demo_routes);

app.listen(PORT, (err) => {
    if (!err) {
        console.log('server started at '+PORT);
    }
    else {
        console.log('error staring server', err.message);
    }
})


