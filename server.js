const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const app=express();
const mongoose=require('mongoose');
const model=require('./models/models');


const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

app.use(session({
    secret : "any long secret key",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

//NGO
passport.use('ngo',model.NGO.createStrategy());
//Restaurant
passport.use('restaurant',model.RESTAURANT.createStrategy());

passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    type: user.constructor.modelName // <- this is "NGO" or "Restaurant"
  });
});

passport.deserializeUser(async (obj, done) => {
  const Model = obj.type === "NGO" ? model.NGO : model.RESTAURANT;
  const user = await Model.findById(obj.id);
  done(null, user);
});



mongoose.connect("mongodb://localhost:27017/donation-app");
app.get("/",function(req,res){
    res.render('index');
});



//NGO handling
app.get("/ngoHomepage",function(req,res){
    if(req.isAuthenticated() && req.user.role=="ngo"){
        console.log(req.user);
        res.render('ngo-homepage',{user:req.user});
    }
    else{
        console.log("Unauthentic User");
        res.redirect("/ngoLogin");
    }
    
});

app.get("/ngoRestaurants",async function(req,res){
    if(req.isAuthenticated() && req.user.role=="ngo"){
        console.log(req.user);
        const orders=await model.FOODORDER.find({});
        const restaurants=await model.RESTAURANT.find({});
        res.render('ngo-restaurants',{orders:orders,restaurants:restaurants});
    }
    else{
        console.log("Unauthentic User");
        res.redirect("/ngoLogin");
    }
    
});

app.get("/ngoLogin",function(req,res){

    res.render('ngo-login');
});

app.post("/ngoLogin",passport.authenticate('ngo',{
    successRedirect:"/ngoHomepage",
    failureRedirect:"/ngoLogin"
}));



app.post("/ngoRegister",function(req,res){
     
    const newNGO=new model.NGO({
     name:req.body.nName,
     registrationNumber:req.body.ngoRegistration,
     city:req.body.city,
     address:req.body.nAddress,
     contact:req.body.nContact,
     email:req.body.nEmail,
    });
    const password=req.body.nPassword;
    console.log(password);
    model.NGO.register(newNGO,password,function (err, user) {      
    if (err) {
    
      // if some error is occurring, log that error
      console.log(err);
    }
    else {
        console.log("No error came");
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/ngoLogin');
      });
    }
    });
    
});




//Restaurant handling
app.get("/restaurant",function(req,res){
        if(req.isAuthenticated() && req.user.role=="restaurant"){
        res.render('restaurant-homepage');
    }
    else{
        console.log("Unauthentic User");
        res.redirect("/restaurantLogin");
    }
});

app.get("/restaurantLogin",function(req,res){
    res.render('restaurant-login');
});

app.post("/restaurantLogin",passport.authenticate('restaurant',{
    successRedirect:"/restaurant",
    failureRedirect:"/restaurantLogin"
}));

app.post("/restaurantRegister", function(req, res) {
    const newRestaurant=new model.RESTAURANT({
     name : req.body.rName,
     address : req.body.rAddress,
     city : req.body.city,
     contact : req.body.rContact,
     email : req.body.rEmail,
     openingHours : req.body.rOpeningHours

    });
    const password = req.body.rPassword;

    console.log(password);
    model.RESTAURANT.register(newRestaurant,password,function (err, user) {      
    if (err) {
      console.log(err);
    }
    else {
        console.log("No error came");
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/restaurantLogin');
      });
    }
    });


});

//Handle Order
app.get("/createOrder",function(req,res){
        if(req.isAuthenticated() && req.user.role=="restaurant"){
        res.render('restaurant-createOrder');
    }
    else{
        console.log("Unauthentic User");
        res.redirect("/restaurantLogin");
    }
});


app.post('/food-order', (req, res) => {
  // Access submitted fields
  if(req.isAuthenticated() && req.user.role=="restaurant"){

    const newOrder=new model.FOODORDER({
       itemName:req.body.itemName,
       description:req.body.description,
       quantity:req.body.quantity,
       restaurantid: req.user.id
    });
    newOrder.save();
  // You can now save to DB, send a response, etc.
  res.send('Food request created check orders!');
}
});

app.get("/rorderHistory",async function(req,res){
        if(req.isAuthenticated() && req.user.role=="restaurant"){
        
        const orders= await model.FOODORDER.find({restaurantid:req.user.id});

        console.log(orders);
        res.render('restaurant-orderHistory',{orders:orders});
    }
    else{
        console.log("Unauthentic User");
        res.redirect("/restaurantLogin");
    }
});


//Logout
app.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send("You have been logged out.");
  });
});

//Port Listening
app.listen(3000,function(){
    console.log("Server Running ...");
})