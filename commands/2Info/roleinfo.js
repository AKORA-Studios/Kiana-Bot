const { Message } = require('discord.js');
const { emotes, rawEmb, colors } = require('../utilities');

module.exports = {
    name: 'roleinfo',
    syntax: 'roleinfo <@Role>',
    args: true,
    type: 'Info',
    description: 'Shows infos about a role',
    commands: ['roleinfo', 'rinfo'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb()

        let role;
        if (msg.mentions.roles.first()) {
            role = msg.mentions.roles.first();
        } else if (!isNaN(args[0])) {
            role = msg.guild.roles.resolve(args[0])
        }

        if (!role) return msg.channel.send(emb.setColor(colors.error).setDescription("Please give a role at whose info you want me to show you")).catch();

        emb.addField("**Name:**", role, true)
            .addField("**ID:**", role.id, true)

        emb.addField(`**Color:**`, role.hexColor, true)
            .addField("**Hoist:**", role.hoist ? emotes.true : emotes.false, true)
            .addField("**Mentionable:**", role.mentionable ? emotes.true : emotes.false, true)
            .addField("**Admin Perms:**", role.permissions.has('ADMINISTRATOR') ? emotes.true : emotes.false, true)
            .addField("**User Count:**", role.members.size, true)
            .addField("**Created at:**", role.createdAt.toUTCString().substr(0, 16), true)

        msg.channel.send(emb.addField("**Position:**", role.position, true)).catch();
    }
};