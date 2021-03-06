const { Message } = require('discord.js');
const { rawEmb, colors, deatiledEmb } = require('../utilities');

module.exports = {
    name: 'simprate',
    syntax: 'simprate [@user]',
    args: false,
    type: 'Fun',
    description: 'Shows if you are a simp',
    DmChannel: true,
    commands: ['simprate', 'simp'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setTitle('*°:⋆ₓₒ　Simprate　ₓₒ⋆:°*')
        let user = msg.mentions.users.first() || msg.author

        if (!user) {
            emb.setDescription("Please enter a user to be rated!")
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }

        let percent = Math.floor((user.id / Math.pow(10, 18)) * 100);
        emb.setDescription(`**${user} is to ${percent}% a simp!**`)

        emb.setThumbnail('https://media.tenor.com/images/b5cfc5d13e8640543a528c5da6412e8e/tenor.gif')
        msg.channel.send(emb).catch()
    }
};