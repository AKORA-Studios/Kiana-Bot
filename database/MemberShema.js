const mongoose = require('mongoose')

const MemberShema = new mongoose.Schema({
    memberID: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },

    warn1: {
        type: mongoose.SchemaTypes.String,
    },
    warn2: {
        type: mongoose.SchemaTypes.String,
    },
    warn3: {
        type: mongoose.SchemaTypes.String,
    },
})

module.exports = mongoose.model('MemberShema', MemberShema)