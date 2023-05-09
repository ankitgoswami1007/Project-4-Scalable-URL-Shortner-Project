const mongoose = require('mongoose')


const URLSchema = new mongoose.Schema ({

    urlCode:  { type: String, required: true, unique: true, lowercase: true, trim: true }, 
    longUrl:  { type: String, required: true, trim: true }, 
    shortUrl: { type: String, required: true, unique: true, trim: true }

}, {timestamps: true});

module.exports = mongoose.model("Url" , URLSchema)



//The util.promisify() method defines in utilities module of Node.js standard library.
// It is basically used to convert a method that returns responses using a callback 
//function to return responses in a promise object

//Parameters: This method accepts a single parameter func that holds the callback based 
//function.
//Return Value: This method returns a promise based function.