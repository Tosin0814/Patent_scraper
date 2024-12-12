const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patentDataSchema = new Schema({
    firstName: { 
        type: String, 
        lowercase: true, 
        trim: true,
        required: true 
    },
    lastName: { 
        type: String, 
        lowercase: true, 
        trim: true,
        required: true 
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 5,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('PatentData', patentDataSchema);



