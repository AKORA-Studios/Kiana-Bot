const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

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
        let emb = rawEmb(msg)

        let user;
        if (msg.mentions.users.first()) {
            user = msg.mentions.users.first();
        } else { user = msg.author; }

        if (!user) {
            emb.setDescription("Please enter a user to be rated!")
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }

        let percent = Math.floor((user.id / Math.pow(10, 18)) * 100);
        emb.setDescription(`**${user} is to ${percent}% a simp!**`)

        emb.setTitle("Simp Rate").setThumbnail('https://media.tenor.com/images/b5cfc5d13e8640543a528c5da6412e8e/tenor.gif')
        msg.channel.send(emb).catch()
    }
};