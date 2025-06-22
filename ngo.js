const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/donation-app');

const ngoSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minLength:1,
        maxLength:50
    },
    city:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    }

});

const ngoModel=mongoose.model("ngoModel",ngoSchema);

const ngo1=new ngoModel({
    name:"NT Trust & Co",
    city: "Dibrugarh",
    contact: 7099043794,
    email:"ntrust@gmail.com"
});
ngo1.save();