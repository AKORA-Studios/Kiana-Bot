const { Message } = require('discord.js');
const { rawEmb, colors, emotes } = require('../utilities');

module.exports = {
    name: 'setlog',
    syntax: 'setlog <#channel>',
    args: true,
    type: 'Configuration',
    description: 'Setzte den Modlog Channel hier',
    description: 'You can change your Modlog channel here',
    perm: ['MANAGE_GUILD'],
    commands: ['setlog'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        var guild_config = await msg.client.database.GuildSettingsCache.getConfig(msg.guild.id);
        let emb = rawEmb(msg)

        let neu = msg.mentions.channels.first()
        if (!neu) {
            if (language == "DE") emb.setDescription("Du musst einen Kanal angeben")
            if (language == "ENG") emb.setDescription("Please enter a Channel")
            return msg.channel.send(emb.setColor(colors.error))
        }

        if (msg.mentions.channels.first().type !== 'text') {
            if (language == "DE") emb.setDescription("Bitte gib einen Text Kanal an")
            if (language == "ENG") emb.setDescription("You need to specify a text channel")
            return msg.channel.send(emb.setColor(colors.error))
        }

        guild_config.logChannel = neu.id
        neu = "<#" + neu.id + ">"

        if (language == "DE") emb.setDescription(`**Modlog für den Channel ${neu} gesetzt**`)
        if (language == "ENG") emb.setDescription(`**Modlog setted to ${neu}**`)
        return guild_config.save().then(() => msg.channel.send(emb.setColor(colors.success)));
    }
}