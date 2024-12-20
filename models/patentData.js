const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patentDataSchema = new Schema({
    documentNumber: { 
        type: String, 
        uppercase: true, 
        trim: true,
        required: true,
        unique: true
    },
    title: { 
        type: String, 
        lowercase: true, 
        trim: true,
        required: true 
    },
    classifications: {
        type: Array,
    },
    applicationNumber: {
        type: String,
    },
    publicationNumber: {
        type: String,
    },
    dateSubmitted: {
        type: String,
    },
    publicationDate: {
        type: String,
    },
    issueDate: {
        type: String,
    },
    assigneeList: {
        type: Array,
    },
    inventorList: {
        type: Array,
    },
    abstract: {
        type: String,
    },
    description: {
        type: Array,
    },
    claims: {
        type: Array,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('PatentData', patentDataSchema);



