const { Message } = require('discord.js');
const { rawEmb, colors, emotes, checkOwner } = require('../utilities');

module.exports = {
    name: 'Weeb',
    syntax: 'weeb [@user]',
    args: false,
    type: 'Fun',
    description: 'Shows how weeb you are :smirk:',
    DmChannel: true,
    commands: ['weeb'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg).setTitle("Weeb Rate")

        let user;
        if (msg.mentions.users.first()) {
            user = msg.mentions.users.first();
        } else { user = msg.author; }

        if (!user) {
            emb.setDescription("Please enter a user to be scanned!")
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }

        let percent = Math.floor((user.id / Math.pow(10, 18)) * 100);

        if (checkOwner(msg.author.id)) {
            emb.setDescription(`${emotes.kanna} **${user} is to 110% Weeb UwU**`)
            return msg.channel.send(emb).catch()
        }

        emb.setDescription(`**${user} is to ${percent}% Weeb OvO**`)
        return msg.channel.send(emb).catch()
    }
};