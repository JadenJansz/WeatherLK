const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dotenv = require('dotenv');
dotenv.config();

const client = mongoose
.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
})
.then(() => {
    console.log("DB connected");
})
.catch((error) => {
    console.log("Error: ", error);
    
    return error;
});

module.exports = client;