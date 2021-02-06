const { Message } = require('discord.js');
const { rawEmb, colors, emotes } = require('../utilities');

module.exports = {
    name: 'setgb',
    syntax: 'setgb <message|channel> <value>',
    args: true,
    type: 'Configuration',
    description: 'You can change your goodbye Settings here. Use `channel` or `message` as module.',
    perm: ['MANAGE_GUILD'],
    commands: ['setgb', 'setgoodbye'],

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

        guild_config.goodbyeChannel = channel.id
        await guild_config.save()

        emb.setDescription(`**Goodbyemessage setted for ${channel}**`)
        return guild_config.save().then(() => msg.channel.send(emb));
    }
}