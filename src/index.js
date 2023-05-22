const express = require('express');
require('dotenv').config()
const path = require("path");
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',express.static(path.join(__dirname,"../client/build")))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDb is Connected"))
  .catch((err) => console.log(err));

app.use('/apiV1', route);
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/build","index.html"))
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});
