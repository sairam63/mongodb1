const mongoose = require("mongoose");

const contactScheme = new mongoose.Schema({
    firstName: {

        type: String,
        required: [true, "First name is require"],
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate: {
            validator: function (value) {
                const nameRegex = /^[a-zA-Z\s]*$/;
                return nameRegex.test(value);
            },
            message: "first name must containe only alphabetic characters"
        }
    },
    lastName: {
        type: String,
        required: [true, "last name is required"]
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: false
    }
});

module.exports=mongoose.model("Contact",contactScheme);