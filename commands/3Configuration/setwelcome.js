const { Message } = require('discord.js');
const { rawEmb, colors, emotes } = require('../utilities');

module.exports = {
    name: 'setwlc',
    syntax: 'setwlc <#channel>',
    args: true,
    type: 'Configuration',
    description: 'Du kannst deine Wilkommenseintellungen hier ändern. Nutze `channel` oder `message` als Modul.',
    description: 'You can change your Welcome Settings here. Use `channel` or `message` as module.',
    perm: ['MANAGE_GUILD'],
    commands: ['setwlc', 'setwelcome'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        var guild_config = await msg.client.database.GuildSettingsCache.getConfig(msg.guild.id);
        let emb = rawEmb(msg)
        let channel = msg.mentions.channels.first()

        if (!channel) return msg.channel.send(emb.setColor(colors.error).setDescription("You need to specify a channel"))
        if (channel.type !== 'text') return msg.channel.send(emb.setColor(colors.error).setDescription("You need to specify a text channel"))

        guild_config.welcomeChannel = channel.id
        await guild_config.save()

        return guild_config.save().then(() => msg.channel.send(emb.setDescription(`**Welcomechannel setted for ${channel}**`)));
    }
}