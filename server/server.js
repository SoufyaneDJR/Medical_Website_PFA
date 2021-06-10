const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const session = require("express-session")
const cookieParser = require("cookie-parser")


const app = express()

const saltRounds = 10

app.use(express.json())
app.use(cors({
  origin : ["http://localhost:3000"],
  methods : ["GET", "POST"],
  credentials : true,
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

//initialize the session
app.use(session({
  key : "userId" , //cookie name
  secret: "subscribe",
  resave : false,
  saveUninitialized: false ,
  cookie: {
    expires : 6000*6000*24, //maintain urself logged in for 24h
  }
}))

//make the connection ---------------------------------------------------------------------------//
const db = mysql.createConnection({
  user : "root",
  host : "localhost",
  password : "soufyane",
  database :"pfa",

})
const db1 = mysql.createConnection({
  user : "root",
  host : "localhost",
  password : "soufyane",
  database :"pfa",

})
// db1.connect(function(err) {
//   if (err) throw err;
//   db1.query("SELECT * FROM fitnessexe", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
    
//   });
// });

db.connect(function(err) {
  if (err) throw err;
  db.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
//------------------------------------------------------------------------------------------------//


app.post("/register",(req, res)=>{
const firstName = req.body.firstName
const lastName = req.body.lastName
const username = req.body.username
const phone = req.body.phone
const birthday = req.body.birthday
const password = req.body.password
const email = req.body.email


const sqlSelect = "SELECT * FROM users WHERE username=?;"
db.query(sqlSelect,username,(err,result)=>{
  if(err){
    res.send({err : err})
  }
  if(result.length >0){
     res.send("user already existe")
  }else{
    bcrypt.hash(password,saltRounds,(err,hash)=>{
      if(err){
        console.log(err);
      }
      const sqlInsert = "INSERT INTO users ( username, email, password ,firstName, lastName, birthday, phone) VALUES (?,?,?,?,?,?,?);"
      db.query(sqlInsert,[username, email,hash, firstName, lastName, birthday,phone  ],(err,result)=>{
        console.log(err);
      })
    })
    }
  
})

})
//-------------------------------------------------------------------------------------------------//
//create a Login route in the backend (post)
app.post("/login",(req, res)=>{

  const username = req.body.username
  const password = req.body.password

  const sqlSelect = "SELECT * FROM users WHERE username=?;"
  db.query(sqlSelect,username,(err,result)=>{
    if(err){
      res.send({err : err})
    }
    if(result.length >0){
        bcrypt.compare(password,result[0].password,(error,response)=>{
          if(response){          
            req.session.user = result  //create a session
            console.log(req.session.user);
            res.send(result)
          }else{
            res.send("wrong username/password combination ")
          }
        })
    }else{
        res.send({message : "user doesnt existe"})
      }
    
  })
})
//create a Login route in the backend (get)
app.get("/login",(req, res)=>{
  if(req.session.user){ //if there is a session alredy created 
    res.send({loggedIn : true , user : req.session.user})
  }else{
    res.send({loggedIn : false})
  }
})
//----------------------------------------------------------------------------------------------//
app.post("/logout",(req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      return res.json({err : err})
    }
    res.clearCookie("userId")
    res.send("no err")
  })
})
//----------------------------------------------------------------------------------------------//
app.post("/send",(req,res)=>{
  fullName= req.body.fullName
  email = req.body.email
  message= req.body.message
  const sqlQ = "INSERT INTO message (fullName, email, message) VALUES (?,?,?);"
  db.query(sqlQ,[fullName,email,message],(err,result)=>{
    console.log(err);
  })
})
//---------------------------------------------------------------------------------------------//
// app.post("/fitness", function(request, result){

//   db1.query("SELECT * FROM fitnessexe;", function(err, results, fields){
//        if(err) throw err;
//       result.send(results);
//   })
// })
//---------------------------------------------------------------------------------------------//

//MEDICAMENTS:
app.get('/medicament/api', (req, res) => {
  let query = 'SELECT * FROM DRUGS WHERE DRUGNAME = "ABILIFY 10 MG, Comprimé"'
  db.query(query, (error, result) => {
      if (error) {
          res.send('Error At Fetching Data !!');
      }
      res.json(result)
  })
})

//tracker
app.use('/tracker',require('./routes/tracker'))

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});
