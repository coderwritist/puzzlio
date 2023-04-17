const express = require("express")
const app = express()
const path = require("path")
const port = 3000 || process.env.PORT;
const cors = require("cors")
const bp = require("body-parser")
const DBconn = require("./config/dbConn.js")
const { default: mongoose } = require("mongoose")
const session = require('express-session');  // session middleware
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require('./models/user.js');
const ejs = require('ejs');
require('dotenv').config();
app.set("view engine", "ejs")
const store = new MongoDBStore({
    uri: process.env.mongodblink,
    collection: "mySessions",
  });

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    // cookie: { maxAge: 60 * 60 * 1000 }
}));


DBconn()
app.use(cors())
app.use(express.json())
app.use('/', express.static(path.join(__dirname, "/public")))
app.use('/', require("./routes/prroutes"))
app.use(bp.urlencoded({extended: true}));
mongoose.set('strictQuery', true)



app.all('*', function(req, res){
    res.sendFile(path.join(__dirname, "/views/404.html"))
})

// app.listen(port, () => {        
//     console.log(`Server running on port ${port}`)
// })

mongoose.connection.once("open", ()=>{

    console.log("MongoDB connencted!")
    app.listen(port, function()
    {
        console.log('Server running at PORT '+port+"...")
    })
})

mongoose.connection.on("error", function(err)
{
    console.log(err);
})

// function that runs when window loads
