const express=require('express');
const bodyParser=require('body-parser');

const ejs=require('ejs');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');


app.get("/",function(req,res){
    res.render('index');
});


//NGO handling
app.get("/ngo",function(req,res){
    res.render('ngo-homepage');
});



app.get("/ngoLogin",function(req,res){
    res.render('ngo-login');
});


// app.post("/ngo-login",function(req,res){
//     const {}
// });

app.post("/ngoRegister",function(req,res){
    const name=req.body.nName;
    const ngoRegisteration=req.body.ngoRegistration;
    const city=req.body.city;
    const address=req.body.nAddress;
    const contact=req.body.nContact;
    const email=req.body.nEmail;
    const password=req.body.nPassword;
    console.log(name);
    console.log(ngoRegisteration);
    console.log(city);
    console.log(address);
    console.log(contact);
    console.log(email);
    console.log(password);
    res.redirect("/ngoLogin");
   
    
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