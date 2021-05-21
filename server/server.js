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
  password : "password123",
  database :"loginsystem",

})
//------------------------------------------------------------------------------------------------//
//create a Register route in the backend
app.post("/profil",(req, res)=>{

  const firstName = req.body.firstName
  const lastName = req.body.lastName 
  const weight = req.body.weight
  const height = req.body.height
  const age = req.body.age
  const gender = req.body.gender
  
    const sqlInsert = "INSERT INTO profil (FisttName,LastName,weight,height,age, gender) VALUES (?,?,?,?,?,?);"
    db.query(sqlInsert,[firstName, lastName, weight, height,age, gender],(err,result)=>{
      console.log(err);
    
  })
  })

app.post("/register",(req, res)=>{

const username = req.body.username
const password = req.body.password
const email = req.body.email

bcrypt.hash(password,saltRounds,(err,hash)=>{
  if(err){
    console.log(err);
  }
  const sqlInsert = "INSERT INTO users (username,password,email) VALUES (?,?,?);"
  db.query(sqlInsert,[username, hash, email],(err,result)=>{
    console.log(err);
  })
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

//---------------------------------------------------------------------------------------------//
app.listen(3002,()=>{
  console.log("run succesfully");
})