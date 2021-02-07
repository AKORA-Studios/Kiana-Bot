const { Message } = require('discord.js');
const { rawEmb, colors, deatiledEmb } = require('../utilities');

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
        let emb = deatiledEmb(msg).setTitle('☆○o。Gayrate 。o○☆')

        let user;
        if (msg.mentions.users.first()) {
            user = msg.mentions.users.first();
        } else { user = msg.author; }

        let percent = Math.floor((user.id / Math.pow(10, 18)) * 100);
        msg.channel.send(emb.setDescription(`${user} is to ${percent}% gay! :gay_pride_flag:`)).catch()
    }
};