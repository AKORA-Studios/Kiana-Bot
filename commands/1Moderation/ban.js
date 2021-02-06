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
        let reason = 'Banned by ' + msg.author.tag;

        let M,
            user

        if (msg.mentions.members.first()) {
            user = msg.mentions.members.first()
            M = user
        } else if (!isNaN(args[0])) {
            user = msg.guild.members.resolve(args[0])
            if (!user) {
                user = await msg.client.users.fetch(args[0]);
                user.user = user;
            }
            M = user
        } else return msg.channel.send(emb.setColor(colors.error).setDescription("Please enter a user or user-id ")).catch()

        if (M.bannable == false) return msg.channel.send(emb.setColor(colors.error).setDescription("**This user is not banable**")).catch()

        await msg.guild.members.ban(user.id).catch()
        msg.channel.send(emb.setDescription(`**Banned user**\n ${M.user.tag}`)).catch();

    }
};