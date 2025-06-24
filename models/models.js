

const mongoose=require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minLength: 5
    },
    contact: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role:{
        type:String,
        default: "ngo"
    }
    
});


ngoSchema.plugin(passportLocalMongoose,{ usernameField: 'email' });
const NGO=mongoose.model("NGO",ngoSchema);




const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        unique: true
    },
    openingHours: {
        type: String,
        trim: true // e.g., "9 AM - 10 PM"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role:{
        type:String,
        default: "restaurant"
    }
});

restaurantSchema.plugin(passportLocalMongoose,{ usernameField: 'email' });
const RESTAURANT=mongoose.model("RESTAURANT",restaurantSchema);

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    quantityAvailable: {
        type: Number,
        required: true,
        min: 0
    }
});

const FOODITEM=mongoose.model("FOODITEM",foodItemSchema);

const foodOrderSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    quantity: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'claimed', 'completed'],
        default: 'available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    restaurantId:{
        type: String,
        required: true,
        trim: true
    }
});

const FOODORDER=mongoose.model("FOODORDER",foodOrderSchema);



module.exports={
    NGO,
    RESTAURANT,
    FOODITEM,
    FOODORDER
};






