//Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const UserApi = require('./API/routes/User');
const AdminApi = require('./API/routes/Admin');

//DataBase Connection
mongoose.connect(process.env.DB_CONNECTION);

mongoose.connection.on('error', error => {
    console.log('Connection Failed');
});

mongoose.connection.on('connected', connected => {
    console.log('Connected Successfully');
});

//Body Parser
app.use(bodyParser.urlencoded(
    {
        extended: false
    }
));

app.use(bodyParser.json());

//API Run on call
app.use('/', UserApi);
app.use('/Admin', AdminApi);



//Message to display when wrong url is called
app.use((req,res,next) => {
    res.status(404).json( {
        error: 'Bad Request: URL not found'
    })

})

module.exports = app;