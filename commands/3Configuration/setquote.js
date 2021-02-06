const { Message } = require('discord.js');
const { rawEmb, emotes, colors } = require('../utilities');

module.exports = {
    name: 'setquote',
    syntax: 'setquote <true | false>',
    args: true,
    type: 'Configuration',
    beschreibung: 'Deaktiviert oder aktiviert die Auto Zitat Funktion für deinen Server',
    description: 'Disables or enables the Auto Quote feature for your server',
    perm: ['ADMINISTRATOR'],
    commands: ['setquote', 'setautoQuote', 'autoQuote'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        var guild_config = await msg.client.database.GuildSettingsCache.getConfig(msg.guild.id);

        let arg = (args.shift()).toLowerCase()
        if (arg !== "true" && arg !== "false") {
            if (language == "DE") emb.setDescription("**Eingabefehler:** Der Wert dieses Moduls kann nur `true` oder `false` betragen")
            if (language == "ENG") emb.setDescription("**Eingabefehler:** Please enter `true` or `false` as value")
            return msg.channel.send(emb.setColor(colors.error))
        }

        let TextDE = `Das Autozitieren wurde `
        let TextENG = `Autoquotign is now `

        if (arg == "true") {
            if (language == "DE") emb.setDescription(TextDE + '**aktiviert**')
            if (language == "ENG") emb.setDescription(TextENG + '**activated**')
            guild_config.autoQuote = true
            neu = emotes.true
        }
        if (arg == "false") {
            if (language == "DE") emb.setDescription(TextDE + '**deaktiviert**')
            if (language == "ENG") emb.setDescription(TextENG + '**deactivated**')
            guild_config.autoQuote = false
            neu = emotes.false
        }
        guild_config.save().then(() => msg.channel.send(emb.setColor(colors.success)));
    }
};