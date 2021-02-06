const { Message } = require('discord.js');
const { rawEmb, colors, emotes } = require('../utilities');

module.exports = {
    name: 'disable',
    syntax: 'disable <modul>',
    args: true,
    type: 'Configuration',
    description: `Disables individual modules of your server settings. 
    Available are: \n• xp \n• welcome \n• goodbye \n• autoquote \n• log`,
    perm: ['MANAGE_GUILD'],
    commands: ['disable'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        var guild_config = await msg.client.database.GuildSettingsCache.getConfig(msg.guild.id);
        let emb = rawEmb(msg)

        let arg = args[0].toLowerCase()
        if (arg == 'modlog') arg = 'log'

        switch (arg) {
            case "prefix":
                {
                    guild_config.prefix = "+";
                    return guild_config.save().then(() => msg.channel.send(emb.setDescription('**Resetted Prefix to: ** `+`')).catch());
                }

            case "nsfw":
                {
                    guild_config.nsfw = false

                    return guild_config.save().then(() => msg.channel.send(emb.setDescription('**NSFW-cmds deactivated**')).catch());
                }

            case "log":
                {
                    guild_config.logChannel = undefined

                    return guild_config.save().then(() => msg.channel.send(emb.setDescription('**Modlog deactivated**')).catch());
                }
            case "autoquote":
                {
                    guild_config.autoQuote = false
                    return guild_config.save().then(() => msg.channel.send(emb.setDescription('**autoquoting deactivated**')).catch());
                }


            case "xp":
                {
                    guild_config.xpChannel = undefined
                    return guild_config.save().then(() => msg.channel.send(emb.setDescription('**xp module deactivated**')).catch());
                }

            case "welcome":
                {
                    guild_config.welcomeChannel = undefined
                    return guild_config.save().then(() => msg.channel.send(emb.setDescription('**Welcomemodule deactivated**')).catch());

                }
            case "goodbye":
                {
                    guild_config.goodbyeChannel = undefined
                    return guild_config.save().then(() => msg.channel.send(emb.setDescription('**goodbyemodule deactivated**')));
                }

            default:
                {
                    emb.setDescription("**I can´t find this module. Please look at the cmd description**").setTitle('⚠️Error⚠️')
                    msg.channel.send(emb.setColor(colors.error)).catch()
                }
        }
    }
};