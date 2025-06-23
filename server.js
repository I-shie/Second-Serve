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


passport.use(model.NGO.createStrategy());
passport.serializeUser(model.NGO.serializeUser());
passport.deserializeUser(model.NGO.deserializeUser());


mongoose.connect("mongodb://localhost:27017/donation-app");
app.get("/",function(req,res){
    res.render('index');
});



//NGO handling
app.get("/ngo",function(req,res){
    if(req.isAuthenticated()){
        res.render('ngo');
    }
    else{
        console.log("Unauthentic User");
        res.redirect("/ngoLogin");
    }
    
});



app.get("/ngoLogin",function(req,res){

    res.render('ngo-login');
});

app.post("/ngoLogin",passport.authenticate('local',{
    successRedirect:"/ngo",
    failureRedirect:"/ngoLogin"
}));

// app.post("/ngo-login",function(req,res){
//     const {}
// });

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
        res.redirect('/');
      });
    }
    });
    
});
//Restaurant handling
app.get("/restaurant",function(req,res){
    res.render('restaurant');
});

app.get("/restaurantLogin",function(req,res){
    res.render('restaurant-login');
});


app.post("/restaurantRegister", function(req, res) {
    const name = req.body.rName;
    const address = req.body.rAddress;
    const city = req.body.city;
    const contact = req.body.rContact;
    const email = req.body.rEmail;
    const openingHours = req.body.rOpeningHours;
    const password = req.body.rPassword;

    console.log(name);
    console.log(address);
    console.log(city);
    console.log(contact);
    console.log(email);
    console.log(openingHours);
    console.log(password);

    res.redirect("/restaurantLogin");
});

//Port Listening
app.listen(3000,function(){
    console.log("Server Running ...");
})