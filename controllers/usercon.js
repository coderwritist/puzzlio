const User = require("../models/user");
const express = require("express")
const app = express()
const bcrypt = require("bcrypt"); 
const bp = require("body-parser")
app.use(bp.urlencoded({extended: true}));



const regcon = async (req, res) => {
    const { username, email, password } = req.body;
    var emailregex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(!emailregex.test(email))
    {
        req.session.error = "invalid Email";
        return res.redirect("/register?error=invalid email");
    }
    let user = await User.findOne({ email });
    if (user) {
        req.session.error = "User already exists";
        return res.redirect("/register?error=user already exists");
      }
    const hasdPsw = await bcrypt.hash(password, 10);
    user = new User({
        username,
        email,
        password: hasdPsw,
        permissions: [1, 0, 0],
        door1last: "/door1",
        door2last: "/door2",
        door3last: "/door3",
        times: {puzzle1: null, puzzle2: null, puzzle3: null, puzzle4: null, puzzle5: null, puzzle6: null, puzzle7: null, puzzle8: null, puzzle9: null}
              });
      await user.save();
      res.redirect("/login");
}

const logincon = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
  
    if (!user) {
        req.session.error = "invalid Credentials";
      return res.redirect("/login?error=invalid credentials");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
        req.session.error = "nvalid Credentials";
        return res.redirect("/login?error=invalid credentials");
    }
  
    req.session.isAuth = true;
    req.session.username = user.username;
    req.session.email = user.email;
    if(user.email === "admin@root.com")
      res.redirect("/dashboard");
    else
      res.redirect("/");

};

const logout_post = (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect("/login");
    });
  };



const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
      next();
    } else {
      req.session.error = "You have to Login first";
      res.redirect("/login");
    }
  };


const isAuthA = (req, res, next) => {
  if (req.session.isAuth && req.session.email === "admin@root.com") {
    next();
  } else {
    req.session.error = "You don't have admin privileges";
    res.redirect("/login?error=you don't have admin privileges");
  }
};

const perfor3 = async (email) => {
  const user = await User.findOne({ email });
  
    if (!user) {
        req.session.error = "Invalid Credentials";
      return res.redirect("/login?error=invalid credentials");
    }
    if(user.permissions[2] == 1){
      return true;
    }
    else
      return false;
  }

  const perfor2 = async (email) => {
    const user = await User.findOne({ email });
    
      if (!user) {
          req.session.error = "Invalid Credentials";
        return res.redirect("/login?error=invalid credentials");
      }
      if(user.permissions[1] == 1){
        return true;
      }
      else
        return false;
    }

    const opendoor3 = async (req, res) => {
      const email = req.session.email;
      const filter = { email: email};
      const update = { $set: { 'permissions.2': 1 } };
      const options = { new: true }; 

      const updatedUser = await User.findOneAndUpdate(filter, update, options);
        console.log(updatedUser.permissions)
        res.send("done");
      }

      const opendoor2 = async (req, res) => {
        const email = req.session.email;
      const filter = { email: email};
      const update = { $set: { 'permissions.1': 1 } };
      const options = { new: true }; 

      const updatedUser = await User.findOneAndUpdate(filter, update, options);
        console.log(updatedUser.permissions)
        res.send("done");
        }

    const getpermissions = async (req, res) => {
      const email = req.session.email;
      const user = await User.findOne({ email });
      res.send({user: user})

    }

const door1last = async (route, email) => {

  const filter = { email: email};
  const update = { door1last : route};
  const options = { new: true };
  const updatedUser = await User.findOneAndUpdate(filter, update, options);
  console.log(updatedUser.door1last)
  return;
}

const door2last = async (route, email) => {

  const filter = { email: email};
  const update = { door2last : route};
  const options = { new: true };
  const updatedUser = await User.findOneAndUpdate(filter, update, options);
  console.log(updatedUser.door1last)
  return;
}

const door3last = async (route, email) => {

  const filter = { email: email};
  const update = { door3last : route};
  const options = { new: true };
  const updatedUser = await User.findOneAndUpdate(filter, update, options);
  console.log(updatedUser.door1last)
  return;
}

const timesave = async (req, res) => {

  console.log("INSIDE TIMESAVE")
  const email = req.session.email;
  const tim = req.body.time;
  const ind= req.body.puzzleno;
  console.log(ind);
  const filter = { email: email, [`times.${ind}`]: { $eq: null } };
  const update = { $set: { [`times.${ind}`]: tim } }; 
  const options = { new: true };
  var updatedUser;
  try {
    updatedUser = await User.findOneAndUpdate(filter, update, options);
    console.log('User updated successfully');
  } catch (err) {
    console.error(err);
  }
  if(updatedUser == null)
    console.log("Already upadted");
  res.send("done");
}


const restart = async (req, res) => {

  email = req.session.email;
  const filter = { email: email};
  const update = { permissions : [1, 0, 0], door1last: "/door1", door2last: "/door2", door3last: "/door3", times: {puzzle1: null, puzzle2: null, puzzle3: null, puzzle4: null, puzzle5: null, puzzle6: null, puzzle7: null, puzzle8: null, puzzle9: null}};
  const options = { new: true };
  const updatedUser = await User.findOneAndUpdate(filter, update, options);
  console.log(updatedUser.permissions)
  return res.redirect("/");
}


const getallusers = async (req, res) => {
  const users = await User.find({});
  res.send({users: users})

}

// export all functions
module.exports = {regcon, logincon, logout_post, isAuth, perfor3, perfor2, opendoor3, opendoor2, getpermissions, door1last, door2last, door3last, timesave, isAuthA, restart, getallusers}