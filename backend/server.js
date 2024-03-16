const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/data')
app.post('/api/data');


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})