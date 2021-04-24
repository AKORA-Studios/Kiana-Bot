const { Message, GuildMember } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

RegExp.escape = function (string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
};

module.exports = {
    name: 'ban',
    syntax: 'ban <@user | user-id>.',
    args: true,
    type: 'Moderation',
    description: 'Removes the unworthy beings from your server ^^',
    perm: ['BAN_MEMBERS'],
    needed: ['BAN_MEMBERS'],
    commands: ['ban'],

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
        if (!member.bannable) return msg.channel.send(emb.setColor(colors.error).setDescription("**This user is not banable**")).catch()

        await msg.guild.members.ban(member.user.id).catch()
        msg.channel.send(emb.setDescription(`**Banned user**\n ${member.user.tag}`)).catch();
    }
};