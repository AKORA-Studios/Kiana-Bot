const { Message } = require('discord.js');
const { rawEmb, emotes } = require('../utilities');

module.exports = {
    name: 'userperm',
    syntax: 'userperm <@user | id>',
    args: false,
    type: 'Info',
    description: 'Shows you permissions of a user on the server',
    commands: ['userpermissions', 'userperm', 'uperm'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let user;
        if (msg.mentions.users.first()) {
            user = msg.mentions.users.first();
        } else if (!isNaN(args[0])) {
            user = msg.guild.members.resolve(args[0])
        } else { user = msg.author; }

        var member = msg.guild.member(user);

        let emb = rawEmb().setTitle("Permissions [" + user.username + "]")

        emb.addField("**ADMINISTRATOR**", member.permissions.has('ADMINISTRATOR') ? emotes.true : emotes.false, true)
            .addField("**CREATE_INSTANT_INVITE**", member.permissions.has('CREATE_INSTANT_INVITE') ? emotes.true : emotes.false, true)
            .addField("**KICK_MEMBERS**", member.permissions.has('KICK_MEMBERS') ? emotes.true : emotes.false, true)
            .addField("**BAN_MEMBERS**", member.permissions.has('BAN_MEMBERS') ? emotes.true : emotes.false, true)
            .addField("**ADD_REACTIONS**", member.permissions.has('ADD_REACTIONS') ? emotes.true : emotes.false, true)

            .addField("**MANAGE_CHANNELS**", member.permissions.has('MANAGE_CHANNELS') ? emotes.true : emotes.false, true)
            .addField("**MANAGE_MESSAGES**", member.permissions.has('MANAGE_MESSAGES') ? emotes.true : emotes.false, true)
            .addField("**MENTION_EVERYONE**", member.permissions.has('MENTION_EVERYONE') ? emotes.true : emotes.false, true)

            .addField("**CONNECT**", member.permissions.has('CONNECT') ? emotes.true : emotes.false, true)
            .addField("**SPEAK**", member.permissions.has('SPEAK') ? emotes.true : emotes.false, true)
            .addField("**MUTE_MEMBERS**", member.permissions.has('MUTE_MEMBERS') ? emotes.true : emotes.false, true)

            .addField("**DEAFEN_MEMBERS**", member.permissions.has('DEAFEN_MEMBERS') ? emotes.true : emotes.false, true)
            .addField("**MOVE_MEMBERS**", member.permissions.has('MOVE_MEMBERS') ? emotes.true : emotes.false, true)
            .addField("**MANAGE_NICKNAMES**", member.permissions.has('MANAGE_NICKNAMES') ? emotes.true : emotes.false, true)
            .addField("**MANAGE_ROLES_OR_PERMISSIONS**", member.permissions.has('MANAGE_ROLES_OR_PERMISSIONS') ? emotes.true : emotes.false, true)
        msg.channel.send(emb).catch()
    }
};