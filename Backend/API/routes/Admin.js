require('dotenv').config();
const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Menu = require('../model/MenuSchema');
const User = require('../model/UserSchema');
const Promotion= require('../model/PromotionSchema');
const mongoose = require('mongoose');
var token;


//Authorizationorization function
function Authorization(req, res, next) {
  if (token != undefined) {
      jwt.verify(token, process.env.SECRET_KEY, (err, verified) => {
          if (err) {
              return res.status(404).json({
                  error: "Token not verified"
              })
          }
          req.Email = verified;
          next();
      })
  }
  else {
      return res.status(404).json({
          AccessError: "Admin needs to login first!"
      })
  }
}

//Admin Login
route.post('/login', (req, res, next) => {
  User.find({ Email: req.body.Email })
      .then(user => {
        if (user.length < 1) {
          return res.status(400).json({
              InvalidCredentials: "User not found!"
          })
      }
          if (user[0].UserRole != "Admin")
          { 
            return res.status(404).json({
             InvalidAuthorizationorization: "You don't have access to this Page!"
          })
          }
          else{
            bcrypt.compare(req.body.Password, user[0].Password, (error, result) => {
              if (!result) {
                  return res.status(400).json({
                      InvalidCredentials: "Invalid Password!"
                  })
              }
              if (result) {
                  token = jwt.sign({
                      Email: user[0].Email,
                      FirstName: user[0].FirstName,
                      LastName: user[0].LastName,
                  },
                      process.env.SECRET_KEY

                  );
                  res.status(200).json({
                      Successful: "Admin has Logged In!",
                      Email: user[0].Email,
                      FirstName: user[0].FirstName,
                      Token: token

                  })

              }

          })
          }
      }
      )
})

//Logout API
route.post('/Logout', (req, res) => {
  if (token == undefined) {
      res.status(200).json({
          LogoutError: "Admin is not Logged in currently!"
      })
  }
  else {
      const verify = jwt.verify(token, process.env.SECRET_KEY);
      token = undefined;
      res.status(200).json({
          Message: "Good Bye, " + verify.FirstName + " Have a nice day!.",
          Logout: "Admin has Logged out!"
      })
  }

})

//View all User



   //See all The Orders
 
module.exports = route;