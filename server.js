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

app.get("/ngo",function(req,res){
    res.render('ngo-homepage');
});



app.get("/ngo-login",function(req,res){
    res.render('ngo-login');
});

app.get("/restaurant",function(req,res){
    res.render('restaurant');
});

app.get("/restaurant-login",function(req,res){
    res.render('restaurant-login');
});

app.listen(3000,function(){
    console.log("Server Running ...");
})