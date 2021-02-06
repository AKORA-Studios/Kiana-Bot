const mongoose = require('mongoose')

const UserShema = new mongoose.Schema({
    userID: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    birthday: {
        type: mongoose.SchemaTypes.String,
    },
    xp: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },
    wallet: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },
    bank: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },


    daily: {
        type: mongoose.SchemaTypes.String,
    },
    weekly: {
        type: mongoose.SchemaTypes.String,
    },
    monthly: {
        type: mongoose.SchemaTypes.String,
    },


    beg: {
        type: mongoose.SchemaTypes.String,
    },
    marry: {
        type: mongoose.SchemaTypes.String,
    },
    work: {
        type: mongoose.SchemaTypes.String,
    },

    votes: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },
})

module.exports = mongoose.model('UserShema', UserShema)