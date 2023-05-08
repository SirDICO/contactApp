
const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required: [true, 'Please provide lastname'],
        maxLength: 50
    },
    lastName:{
        type:String,
        required: [true, 'Please provide lastname'],
        maxLength: 50
    },
    phone:{
        type:String,
        required: [true, 'Please provide phone number'],
        maxLength:15
    },
    address:{
        type:String,
        required: [true, 'Please provide address'],
        maxLength:200
    },
    
    employmentStatus:{
        type:String,
        enum: ['employed', 'unemployed', 'undisclosed'],
        default: 'undisclosed',
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, {timestamps:true})


module.exports = mongoose.model('Contact', ContactSchema)