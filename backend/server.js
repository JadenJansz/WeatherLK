const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dataRouter = require('./routes/dataRouter')

dotenv.config();
require("./db/conn");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/data', dataRouter)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})