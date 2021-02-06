const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

module.exports = {
    name: 'Gayrate',
    syntax: 'gayrate [@user]',
    args: false,
    type: 'Fun',
    description: 'Shows how gay you are :gay_pride_flag:',
    DmChannel: true,
    commands: ['gayrate', 'rate'],

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

        if (!user) return msg.channel.send(emb.setColor(colors.error).setDescription("Please enter a user to be rated!")).catch()
        let percent = Math.floor((user.id / Math.pow(10, 18)) * 100);

        msg.channel.send(emb.setTitle("Gay Rate").setDescription(`${user} is to ${percent}% gay! :gay_pride_flag:`)).catch()
    }
};