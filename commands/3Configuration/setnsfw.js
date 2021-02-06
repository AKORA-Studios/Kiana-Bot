const { Message } = require('discord.js');
const { rawEmb, colors, emotes } = require('../utilities');

module.exports = {
    name: 'setnsfw',
    syntax: 'setnsfw <true | false>',
    args: true,
    type: 'Configuration',
    beschreibung: 'Deaktiviert odeer Aktiviert NSFW CMDs auf deinem server. Nutze `false` oder `true`',
    description: 'Ändert die NSFW Einstellung für NSFW cmdsDisables or enables NSFW CMDs on your server. Use `false` or `true',
    perm: ['MANAGE_GUILD'],
    commands: ['setnsfw'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        var guild_config = await msg.client.database.GuildSettingsCache.getConfig(msg.guild.id);
        let emb = rawEmb(msg)
        let arg = (args.shift()).toLowerCase()
        if (arg !== "true" && arg !== "false") {
            if (language == "DE") emb.setDescription("**Eingabefehler:** Der Wert dieses Moduls kann nur `true` oder `false` betragen")
            if (language == "ENG") emb.setDescription("**Eingabefehler:** Please enter `true` or `false` as value")
            return msg.channel.send(emb.setColor(colors.error))
        }

        let TextDE = `NSFW-Einstellungen wurden`
        let TextENG = `NSFW-Settings are now`

        if (arg == "true") {
            guild_config.nsfw = true;
            if (language == "DE") emb.setDescription(TextDE + ' **aktiviert**')
            if (language == "ENG") emb.setDescription(TextENG + ' **activated**')
            return guild_config.save().then(() => msg.channel.send(emb));

        } else if (arg == "false") {
            guild_config.nsfw = false;
            if (language == "DE") emb.setDescription(TextDE + ' **deaktiviert**')
            if (language == "ENG") emb.setDescription(TextENG + ' **deactivated**')
            return guild_config.save().then(() => msg.channel.send(emb));
        }
    }
};