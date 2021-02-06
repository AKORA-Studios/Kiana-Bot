const { Message } = require('discord.js');
const { rawEmb } = require('../utilities');

module.exports = {
    name: 'prefix',
    syntax: 'prefix <value>',
    args: true,
    type: 'Configuration',
    description: 'Ändert das Bot Prefix für deinen Server',
    perm: ['ADMINISTRATOR'],
    commands: ['prefix', 'setprefix'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        var guild_config = await msg.client.database.GuildSettingsCache.getConfig(msg.guild.id);
        let new_prefix = args[0];

        guild_config.prefix = new_prefix;
        guild_config.save().then(() => msg.channel.send(emb.setDescription(`**Prefix changed to:** \`${new_prefix}\``)));
    }
};