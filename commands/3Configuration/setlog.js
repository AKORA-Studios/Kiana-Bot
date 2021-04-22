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
            return msg.channel.send(emb.setColor(colors.error).setDescription("Please enter a Channel"))
        }

        if (msg.mentions.channels.first().type !== 'text') {
            return msg.channel.send(emb.setColor(colors.error).setDescription("You need to specify a text channel"))
        }

        guild_config.logChannel = neu.id
        neu = "<#" + neu.id + ">"

        return guild_config.save().then(() => msg.channel.send(emb.setColor(colors.success).setDescription(`**Modlog setted to ${neu}**`)));
    }
}