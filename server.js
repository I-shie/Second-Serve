const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const ejs=require('ejs');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

app.get("/",function(req,res){
    res.render('index');
});

app.listen(3000,function(){
    console.log("Server Running ...");
})