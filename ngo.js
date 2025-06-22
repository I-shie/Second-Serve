const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/donation-app');

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
    }
});






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
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    openingHours: {
        type: String,
        trim: true // e.g., "9 AM - 10 PM"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

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
        type: Number,
        required: true,
        min: 1
    },
    foodItems: [foodItemSchema],
    status: {
        type: String,
        enum: ['available', 'claimed', 'completed'],
        default: 'available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


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
    pricePerUnit: {
        type: Number,
        required: true,
        min: 0
    },
    quantityAvailable: {
        type: Number,
        required: true,
        min: 0
    }
});






const ngoModel=mongoose.model("ngoModel",ngoSchema);
const restaurantModel = mongoose.model('Restaurant', restaurantSchema);
const foodOrderModel = mongoose.model('Restaurant', foodOrderSchema);
const foodItemModel = mongoose.model('Restaurant', foodItemSchema);







// const ngo1=new ngoModel({
//     name:"NT Trust & Co",
//     city: "Dibrugarh",
//     contact: 7099043794,
//     email:"ntrust@gmail.com"
// });
ngo1.save();