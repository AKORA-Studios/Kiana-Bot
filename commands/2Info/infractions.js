const { Message } = require('discord.js');
const { colors, emotes, rawEmb } = require('../utilities');

module.exports = {
    name: 'infractions',
    syntax: 'infractions [@user]',
    args: false,
    type: 'Info',
    description: 'Shows you the warnings of a user',
    commands: ['infractions', 'warnings', 'warns'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let warn1,
            warn2,
            warn3
        let emb = rawEmb()
        let text = '';

        let victim = msg.mentions.users.first();
        if (!victim) victim = msg.member.user;

        if (victim.bot) return msg.channel.send(emb.setColor(colors.error).setDescription("**Bots couldn´t recieve warnings**")).catch()

        var databaseUser = await msg.client.database.MemberConfigCache.getConfig(victim.id, msg.guild.id);
        if (databaseUser.warn1) { warn1 = databaseUser.warn1 } else { warn1 = emotes.false }
        if (databaseUser.warn2) { warn2 = databaseUser.warn2 } else { warn2 = emotes.false }
        if (databaseUser.warn3) { warn3 = databaseUser.warn3 } else { warn3 = emotes.false }

        if (!databaseUser.warn1 && !databaseUser.warn2 && !databaseUser.warn3) {
            text = '**This member doesn´t have any warnings**'
        } else {
            text += `'**Warning 1:** ${warn1}\n`
            text += `'**Warning 2:** ${warn2}\n`
            text += `'**Warning 3:** ${warn3}\n`
        }

        emb.setFooter(`Requested by: ${msg.author.tag}`)
            .setTimestamp()
            .setTitle(`${'Warnings from: '} ${victim.username}`)
            .setDescription(text)
        return msg.channel.send(emb).catch()
    }
};