const mongoose = require('mongoose')

const GuildConfigShema = new mongoose.Schema({
    guildID: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: '--',
    },
    nsfw: {
        type: Boolean,
        default: false,
    },

    xpChannel: {
        type: String,
    },

    welcomeChannel: {
        type: String,
    },


    goodbyeChannel: {
        type: String,
    },

    logChannel: {
        type: String,
    },
    autoQuote: {
        type: Boolean,
        default: true,
    },

})

module.exports = mongoose.model('GuildConfigShema', GuildConfigShema)