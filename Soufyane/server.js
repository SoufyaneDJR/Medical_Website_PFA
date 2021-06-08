const express = require('express')
const path = require('path')
const cors = require("cors")
const mysql = require('mysql')
const bodyParser = require("body-parser")

var connection = mysql.createConnection({
    user: 'root',
    password: 'soufyane',
    database: 'PFA'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

//parse date :
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const app = express();
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}))

//GET DATA FROM DATABASE AND SEND IT TO THE ROUTE
app.get('/tracker/data/username/:username', (req, res) => {
    let query = `SELECT * FROM TRACKER WHERE username='${req.params.username}'`
    connection.query(query, (error, result) => {
        if (error) {
            res.send('Error At Fetching Data !!');
        }
        res.json(result)
    })
})

// POST DATA INTO DATABASE
app.post('/tracker/insert', (req, res) => {
    let reminder = (req.body.reminder) ? "1" : "0"
    let query = `INSERT INTO TRACKER (username,drugname,firstday,lastday,frequency,note,reminder) VALUES ('soufyane123','${req.body.drugname}','${req.body.firstday}','${req.body.lastday}','${req.body.frequency}','${req.body.note}','${reminder}')`
    connection.query(query, (error, result) => {
        if (error) {
            res.send("error at sending data")
            console.log(error);
        }
    })
})
app.post('/tracker/delete', (req, res) => {
    let query = `DELETE FROM TRACKER WHERE id = ${req.body.id}`
    connection.query(query, (error, result) => {
        if (error) {
            res.send("error at deleting data")
            console.log(error);
        }
    })
})

app.post('/tracker/reminder', (req, res) => {
    // let reminder = (req.body.reminder) ? "1" : "0"
    let query = `UPDATE TRACKER SET REMINDER = "${req.body.reminder}" WHERE username = '${req.body.username}' AND drugname = '${req.body.drugname}' AND firstday ='${formatDate(req.body.firstday)}' AND lastday ='${formatDate(req.body.lastday)}' AND frequency ='${req.body.frequency}:00' AND note = '${req.body.note}' `
    console.log(query)
    connection.query(query, (error, result) => {
        if (error) {
            res.send("error at Toggling reminder")
            console.log(error);
        }
    })
})

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});
