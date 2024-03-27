const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dataRouter = require('./routes/dataRouter')

dotenv.config();
require("./db/conn");

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET']
}

app.use('/api/v1/weather/districts', cors(corsOptions))

app.use(express.json());

app.use('/api/v1/weather', dataRouter)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})