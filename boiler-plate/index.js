const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    // userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!555555')
})

app.post('/register', (req, res) => {

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
  
})

app.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if(!userInfo){
      return res.json({
        loginSuccess: false, 
        message: "해당 이메일 유저 없음."
      })
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비번틀림." })

      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        res.cookie("x_auth", user.token) 
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})