const { Message, MessageAttachment } = require('discord.js');
const { rawEmb } = require('../utilities');

module.exports = {
    name: 'up',
    syntax: 'up',
    args: false,
    type: 'Developer',
    description: 'Online.....?',
    perm: ['DEVELOPER'],
    commands: ['up'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg).setTitle("Bot is online now")
        msg.channel.send(emb);
    }
};