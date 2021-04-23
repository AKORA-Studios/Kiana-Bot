const { Message } = require('discord.js');
const { emotes, rawEmb, colors } = require('../utilities');

module.exports = {
    name: 'settings',
    syntax: 'settings',
    args: false,
    type: 'Configuration',
    beschreibung: 'Zeigt die serverspezifischen Einstellungen des Bots.',
    description: 'Shows the server-specific settings of the bot.',
    commands: ['settings'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let xpCh;
        var GuildConfig = await msg.client.database.GuildSettingsCache.getConfig(msg.guild.id);
        let emb = rawEmb(msg)
        emb.setTitle("Server Settings [" + GuildConfig.prefix + "]")

        if (GuildConfig.xpChannel) {
            if (GuildConfig.xpChannel == 'current') {
                xpCh = "current"
            } else {
                let ch = msg.guild.channels.cache.get(GuildConfig.xpChannel)
                if (ch) xpCh = "<#" + ch.id + ">"
                if (!ch) xpCh = emotes.false
            }
        }
        if (GuildConfig.logChannel) {
            let ch = msg.guild.channels.cache.get(GuildConfig.logChannel)
            if (ch) { log = "<#" + ch.id + ">" } else { log = "/" }
        } else { log = "/" }

        emb.addField("**Language:**", GuildConfig.sprache, true)
            .addField("**Autoquoting:**", GuildConfig.autoQuote ? emotes.true : emotes.false, true)
            .addField("**NSFW:**", GuildConfig.nsfw ? emotes.true : emotes.false, true)

            .addField("**XP Channel:**", xpCh, true)
            .addField("**Goodbye Channel:**", GuildConfig.goodbyeChannel ? "<#" + GuildConfig.goodbyeChannel + ">" : emotes.false, true)
            .addField('Modlog', log, true)
        msg.channel.send(emb)
    }
};