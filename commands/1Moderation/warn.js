const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

module.exports = {
    name: 'warn',
    syntax: 'warn <@user> [reason]',
    args: true,
    type: 'Moderation',
    description: 'Warns Users for max. 3 times',
    perm: ['MANAGE_MESSAGES'],
    needed: ['MANAGE_MESSAGES'],
    commands: ['warn'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg);
        let victim = msg.mentions.members.first();
        if (victim.user.bot) msg.channel.send(emb.setColor(colors.error).setDescription("**Bots couldn´t recieve warnings**")).catch()

        let reason = "No Reason specified";
        if (reason.length > 1024) return msg.channel.send(emb.setColor(colors.error).setDescription("The Reason shouldn´t expand 1024 characters!")).catch()
        if (args[1]) {
            let text = args.slice(1).join(' ')
            reason = text
        }

        var databaseUser = await msg.client.database.MemberConfigCache.getConfig(victim.id, msg.guild.id);
        let A = 1

        if (databaseUser.warn1) { A = 2 }
        if (databaseUser.warn2) { A = 3 }
        if (databaseUser.warn3) { A = 4 }

        let emb1 = rawEmb().setDescription(reason).setTitle(`New Warn [Nr. ${A}]`).setFooter(`By ${msg.author.tag}`).setTimestamp()
            .setAuthor(msg.guild.name, msg.guild.iconURL() ? msg.guild.iconURL() : victim.user.avatarURL())
            .setColor(colors.error)
            .setDescription(reason)

        if (A == 1) {
            databaseUser.warn1 = reason;
            emb.setTitle('Warn NR. 1');
            await databaseUser.save()
        }
        if (A == 2) {
            databaseUser.warn2 = reason;
            emb.setTitle('Warn NR. 2');
            await databaseUser.save()

        } else if (A == 3) {
            databaseUser.warn3 = reason;
            emb.setTitle('Warn NR. 3');
            await databaseUser.save()

        } else if (A == 4) {
            return msg.channel.send(emb.setColor(colors.error).setTitle('This User has already 3 warnings')).catch()
        }

        var obj = { warn: reason, target: victim.user.tag, mod: msg.author.tag, guild: msg.guild, num: A }
        msg.client.emit('warnAdd', obj)
        victim.user.send(emb1).catch()
        msg.channel.send(emb).catch()
    }
};