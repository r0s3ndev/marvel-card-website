require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const sessions = require('express-session');
var cookies = require("cookie-parser");
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

//set global variabile for the project root
global.appRoot = path.resolve(__dirname);
global.credit = 100;

//setup cors
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

//use session based authentication
app.use(
  sessions({
    secret:  process.env.JWT_SESSION_SECRET || 'X2k9!$bFh3*%dQw@MzP&+7LcH^#Rg0Jn',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    },
    name: "PWM_sid"
  })
);

app.use('/public', express.static(path.join(appRoot, 'src/public')));
app.use(express.static(path.join(appRoot, 'src/views')));
// app.use(express.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(cookies());

// Use the API routes
const apiRoutes = require('./apis/api');
app.use('/api', apiRoutes);

// // Use pages routes
// const pages = require("./apis/index");s
// app.use('/view', pages);

// Use Users api
const users_api = require('./apis/usersdb');
const { closeDatabaseConnection } = require('./config/mongdbconfig');
const { MongoTailableCursorError } = require('mongodb');
app.use("/users", users_api);


app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});