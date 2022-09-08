const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://nawazkhan:Mnk123456@authentication.dhftjxf.mongodb.net/?retryWrites=true&w=majority")
};