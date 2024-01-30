const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());  //it is require for get data from request body
app.use(bodyParser.urlencoded({ extended: true }));

const Contact = require("./routes/Contact")   //imported

app.use("/api", Contact) //using

//connectio fro m mongoose to mongodb
const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/mydatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true

        });
        console.log("connected to MongoDb");

    } catch (error) {
        console.log(error);
        process.exit(1);

    }
}
connectToDB();

const port = 5000;
app.listen(port, () => {
    console.log("server is started successfully");
});