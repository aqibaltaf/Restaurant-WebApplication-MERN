require('dotenv').config();
const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/UserSchema');
const Menu = require('../model/MenuSchema');
const Cart = require('../model/CartSchema');
const Order = require('../model/OrderSchema');
const Reservation = require('../model/ReservationSchema');
const ContactUs = require('../model/ContactUs');
const mongoose = require('mongoose');
const { cookie } = require('express/lib/response');

var token;

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
            AccessError: "User needs to login first"
        })
    }
}


//User Profile API
route.get('/Profile', Authorization, (req, res, next) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).json({
        message: "Hello, " + verify.FirstName + " " + verify.LastName,
        userInfo: verify
    })

})

//Sign Up API
route.post('/Register', (req, res, next) => {
    //Converting Password into hash for encryption
    const user = new User({
        _id: new mongoose.Types.ObjectId,
        Email: req.body.Email,
        Password: req.body.Password,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        Address: req.body.Address,
        State: req.body.State,
        City: req.body.City,
        Phone: req.body.Phone,
        UserRole: "Customer",
        Token: " "
    })

    user.save()
        .then(result => {
            res.status(200).json({
                Successful: "New User's Data entered",
                newUser: result
            })
        })
        .catch(error => {
            res.status(500).json({
                err: error
            })
        })

})



//Login API
route.post('/login', async (req, res, next) => {
    try {
        let isMatch;
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({ error: "The data is not filled" })
        }
        const userLogin = await User.findOne({ Email: Email });
        if (userLogin) {
            if (userLogin.UserRole != "Admin") {
                isMatch = await bcrypt.compare(Password, userLogin.Password);
                token = await userLogin.generateAuthToken();
            }
            else {
                isMatch = await bcrypt.compare(Password, userLogin.Password);
                token = await userLogin.generateAuthToken();

               
            }
        }

        if (!isMatch) {
            res.status(400).json({ error: "Invalid Credentials, Please enter correct information!" });
        } else {
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 86400000),
                httpOnly: true
            });

            console.log(cookie);
            res.status(200).json({
                Successful: "User is Logged In!",
                Email: userLogin.Email,
                FirstName: userLogin.FirstName,
                Address: userLogin.Address,
                City: userLogin.City,
                UserRole: userLogin.UserRole,
                Token: token

            })
        }
    } catch (err) {
        console.log(err);
    }
});

//Update Profile
route.put("/Profile/Settings", Authorization, async (req, res) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    try {
        const Update = await User.findByIdAndUpdate(
            verify.userid,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json({
            ProfileUpdated: "Changes have been made to your profile"
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//Logout API
route.post('/Logout', Authorization,  (req, res) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    if (token == undefined) {
        res.status(200).json({
            error: "No User is Logged in currently!"
        })
    }
    else {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        token = undefined;
        res.status(200).json({
            Message: "Good Bye, " + verify.FirstName + " we hope to see you soon.",
            Logout: "User Logged out!"
        })
    }

})


//-----> USER MENU
//Get the Menu
route.get("/Menu/", async (req, res) => {
    const query = req.query.new;
    try {
        const menu = query
            ? await Menu.find().sort({ _id: -1 })
            : await Menu.find();
        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json(err);
    }
});

//View your Cart Category
route.get("/Menu/:category",  async (req, res) => {
    const query = req.query.new;
    try {
        const menu = query
            ? await Menu.find({ Category: req.params.category }) : await Menu.find({ Category: req.params.category });
        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json(
            {
                "CategoryError": "No such Category access"
            }
        );
    }
});


//-----> USER CART CRUD 

//Add Dish to Cart
route.post('/Menu/AddCart/:id', Authorization, (req, res, next) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    Menu.find({ _id: req.params.id })
        .then(dish => {
            const Dish = new Cart({
                _id: new mongoose.Types.ObjectId,
                Dish_Name: dish[0].Dish_Name,
                Quantity: req.body.Quantity,
                Price: dish[0].Price * req.body.Quantity,
                Description: dish[0].Description,
                user_id: verify._id
            })

            Dish.save()
                .then(result => {
                    res.status(200).json({
                        Successful: "Dish added to the cart",
                        Dish: result
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        Error: "Error!",
                        err: error
                    })
                })

        })

})

//View Cart
route.get("/Cart/", Authorization, async (req, res) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    const query = req.query.new;
    try {
        const cart = query
            ? await Cart.find({ user_id: verify._id }) : await Cart.find({ user_id: verify._id });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Update a Cart
route.put("/Cart/Update/:id", Authorization, async (req, res) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    try {
        const UpdateOrder = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    Quantity: req.body.Quantity,
                }
            },
            { new: true }
        );
        res.status(200).json(UpdateOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//Delete a Dish From Cart
route.delete("/Cart/Delete/:id", Authorization, async (req, res) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Item is deleted from the Cart");
    } catch (err) {
        res.status(500).json(err);
    }
});


//-----> TABLE RESERVATION CRUD 

//View your reservations
route.get("/Reservation/view", Authorization, async (req, res) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    const query = req.query.new;
    try {
        const reserv = query
            ? await Reservation.find({ user_id: verify._id }) : await Reservation.find({ user_id: verify._id });
        res.status(200).json(reserv);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Cancel Reservation
route.delete("/Reservation/Cancel/:id", Authorization, async (req, res) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json("Your Reservation has been cancelled");
    } catch (err) {
        res.status(500).json(err);
    }
});


//Make a reservation
route.post('/Reservation', Authorization,  (req, res, next) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY)
    const table = new Reservation({
        _id: new mongoose.Types.ObjectId,
        Name: req.body.Name,
        Contact: req.body.Contact,
        Email: req.body.Email,
        NofPeople: req.body.NofPeople,
        Request: req.body.Request,
        Area: req.body.Area,
        Date: req.body.Date,
        Time: req.body.Time,
        user_id: verify._id
    })

    table.save()
        .then(result => {
            res.status(200).json({
                Successful: "reservation is added",
                reserved: result
            })
        })
        .catch(error => {
            res.status(500).json({
                err: error
            })
        })

})



//-----> ORDER Management 

//Proceed to Check out
route.post('/Cart/Order', Authorization, (req, res, next) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    var currenttime = new Date();
    const order = new Order({
        _id: new mongoose.Types.ObjectId,
        FirstName: verify.FirstName,
        LastName: verify.LastName,
        Address: verify.Address,
        Phone: verify.Phone,
        Order_item: req.body.Order_item,
        Order_total: req.body.Order_total,
        Time: currenttime,
        user_id: verify._id
    })

    order.save()
        .then(result => {
            res.status(200).json({
                Successful: "Order has been placed",
                Order: result
            })
        })
        .catch(error => {
            res.status(500).json({
                Error: "Error!",
                err: error
            })
        })
})

//View your reservations
route.get("/Order/view", Authorization, async (req, res) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    const query = req.query.new;
    try {
        const reserv = query
            ? await Order.find({ user_id: verify._id }) : await Order.find({ user_id: verify._id });
        res.status(200).json(reserv);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Contact the restuarant
route.post('/ContactUs', (req, res, next) => {
    const contact = new ContactUs ({
            _id: new mongoose.Types.ObjectId,
            Name: req.body.Name,
            Email: req.body.Email,
            Contact: req.body.Contact,
            ContactMessage: req.body.ContactMessage
        })



    contact.save()
        .then(result => {
            res.status(200).json({
                Successful: "Your message has been sent",
                contact: result
            })
        })
        .catch(error => {
            res.status(500).json({
                err: error
            })
        })

    })


    /////////////////////////ADMIN APIS/////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    route.get("/Users/", Authorization ,  async (req, res) => {
        const query = req.query.new;
              User.find({UserRole: "Customer"},function(err,result){
                if(err){
                   res.send(err);
                }
                else{
                   res.status(200).json(result);
                }
        });
      
      });
      
      //View specific user
      route.get("/Users/:id", Authorization , async(req, res) => {
        //const verify = jwt.verify(token, process.env.SECRET_KEY);
          try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user._doc);
          } catch (err) {
            res.status(500).json(err);
          }
        });
      
          //Delete a specific User
          route.delete("/Users/:id", async (req, res) => {
            try {
              await User.findByIdAndDelete(req.params.id);
              res.status(200).json("User account is deleted");
            } catch (err) {
              res.status(500).json(err);
            }
          });
      
      
      //Add Dish in Menu
      route.post('/Menu/Add', (req, res, next) => {
       // const verify = jwt.verify(token, process.env.SECRET_KEY);
          const Dish = new Menu({
              _id: new mongoose.Types.ObjectId,
              Dish_Name: req.body.Dish_Name,
              Price: req.body.Price,
              Category: req.body.Category,
              Serving: req.body.Serving,
              Description: req.body.Description,
              img_url: req.body.img_url
          })
      
          Dish.save()
              .then(result => {
                  res.status(200).json({
                      Successful: "New Dish is added to the Menu",
                      Dish: result
                  })
              })
              .catch(error => {
                  res.status(500).json({
                      err: error
                  })
              })
      })
      
      //Delete AllDish From Menu
      route.delete("/Menu/Delete", Authorization, async (req, res) => {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
          await Menu.deleteMany();
          res.json("All Dishes have been removed");
         
        });
      
      //Update a Dish
      route.put("/Menu/Update/:id", Authorization , async (req, res) => {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
          try {
            const UpdateDish = await Menu.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.status(200).json(UpdateDish);
          } 
          catch (err) {
            res.status(500).json(err);
          }
        });
      
      //Get a specific Dish
      route.get("/Menu/:id",  async(req, res) => {
          try {
            const Dish = await Menu.findById(req.params.id);
            res.status(200).json(Dish._doc);
          } catch (err) {
            res.status(500).json(err);
          }
        });
      
      //Get the Menu
      route.get("/Menu/",  async (req, res) => {
          const query = req.query.new;
          try {
            const menu = query ? await Menu.find().sort({"_id": -1 }) : await Menu.find();
            res.status(200).json(menu);
          } catch (err) {
            res.status(500).json(err);
          }
        });
        
        //Delete a specific dish
        route.delete("/Menu/Delete/:id", async (req, res) => {
          try {
            await Menu.findByIdAndDelete(req.params.id);
            res.status(200).json("Dish is deleted from the Menu");
          } catch (err) {
            res.status(500).json(err);
          }
        });
        
      
        //-----> Promotion Deals
      
        //Add Promotions
      route.post('/Promotion/Add',Authorization, (req, res, next) => {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
          const Deal = new Promotion({
              _id: new mongoose.Types.ObjectId,
              Dishes_Name: req.body.Dishes_Name,
              Type: req.body.Type,
              Original_Price: req.body.Original_Price,
              DiscountPercent: req.body.DiscountPercent,
              Discounted_price: req.body.Original_Price - (req.body.Original_Price * (req.body.DiscountPercent/100))
          })
      
          Deal.save()
              .then(result => {
                  res.status(200).json({
                      Successful: "New Deal is added",
                      Deal: result
                  })
              })
              .catch(error => {
                  res.status(500).json({
                      err: error
                  })
              })
      
          
      });
      
      // Retrieve Promotions
      route.get("/Promotion/:id", Authorization,  async(req, res) => {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        try {
          const Deals = await Promotion.findById(req.params.id);
          res.status(200).json(Deals._doc);
        } catch (err) {
          res.status(500).json(err);
        }
      });
      
      //View the Promotions
      route.get("/Promotion/", Authorization, async (req, res) => {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        const query = req.query.new;
        try {
          const promotion = query ? await Promotion.find().sort({"_id": -1 }) : await Promotion.find();
          res.status(200).json(promotion);
        } catch (err) {
          res.status(500).json(err);
        }
      });
      
      //Update a Promotion
      route.put("/Promotion/Update/:id",Authorization, async (req, res) => {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        try {
          const UpdateDeal = await Promotion.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(UpdateDeal);
        } 
        catch (err) {
          res.status(500).json(err);
        }
      });
      
      
      
       // Delete Specific Promotion
        route.delete("/Promotion/Delete/:id", Authorization, async (req, res) => {
          const verify = jwt.verify(token, process.env.SECRET_KEY);
          try {
          await Promotion.findByIdAndDelete(req.params.id);
          res.status(200).json("Deal is deleted from the Promotions");
        } catch (err) {
          res.status(500).json(err);
        }
      });
      
      
      
module.exports = route;

