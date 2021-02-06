const { Message } = require('discord.js');
const { rawEmb, colors, checkOwner } = require('../utilities');

module.exports = {
    name: 'emit',
    syntax: 'emit <join/leave>',
    args: true,
    type: 'Fun',
    description: 'Lets you test your server events. Use `join` or `leave`',
    perm: ['MANAGE_GUILD'],
    commands: ['emit'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        let event = args[0].toLowerCase()
        if (event == 'join') {
            emb.setDescription('**Event succesfully emited**')
            msg.channel.send(emb.setColor(colors.success).setTitle('ServerMemberJoin')).catch()
            msg.client.emit('guildMemberAdd', msg.member)

        } else if (event == 'leave') {
            emb.setDescription('**Event succesfully emited**')
            msg.channel.send(emb.setColor(colors.success).setTitle('ServerMemberLeave')).catch()
            msg.client.emit('guildMemberRemove', msg.member)

        } else {
            emb.setDescription('**⚠️ Invalid Event.** Use `join` or `leave`')
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }
    }
};