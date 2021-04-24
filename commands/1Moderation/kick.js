const { Message, GuildMember } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

RegExp.escape = function (string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
};

module.exports = {
    name: 'kick',
    syntax: 'kick <@user |user-id>',
    args: true,
    type: 'Moderation',
    description: 'Removes the unworthy beings from your server ^^',
    perm: ['KICK_MEMBERS'],
    needed: ['KICK_MEMBERS'],
    commands: ['kick'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        let member = msg.mentions.members.first() || msg.guild.members.resolve(args[0])

        if (!member) return msg.channel.send(emb.setColor(colors.error).setDescription("Please enter a user or user-id ")).catch()
        if (!member.kickable) return msg.channel.send(emb.setColor(colors.error).setDescription("**This user is not kickable**")).catch()

        await user.kick().catch()
        msg.channel.send(emb.setDescription(`**Kicked user**\n ${M.user.tag}`)).catch();
    }
};