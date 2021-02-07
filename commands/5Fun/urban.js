const { Message } = require('discord.js');
const { rawEmb, colors, deatiledEmb } = require('../utilities');
const urban = require('urban');


module.exports = {
    name: 'urban',
    syntax: 'urban <value>',
    args: true,
    type: 'Fun',
    beschreibung: 'Findet die Bedeutung deines Begriffs im Urban-Dictonary',
    description: 'Find the meaning of your term in the Urban Dictonary',
    DmChannel: true,
    needed: ['NSFW', 'EMBED_LINKS'],
    commands: ['urban'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setTitle('*＊✿❀ Urban ❀✿＊*')

        if (!args[0]) return msg.channel.send(emb.setDescription("You must enter a search term").setColor(colors.error)).catch().catch();
        emb.setDescription("**Loading . . .** \n If this message won´t change, I found nothing qwq")
        const m = await msg.channel.send(emb).catch();

        var result = urban(args.join(" "));
        var json = result.first(json => {
            if (!json) return m.edit(emb.setColor(colors.error).setDescription("No search results found qwq `404`")).catch();

            emb.setTitle(json.word)
                .setURL(json.permalink)
                .setDescription(json.definition)
            emb.addField("Example: ", json.example)
            emb.addField(json.thumbs_up, "👍", true)
                .addField(json.thumbs_down, "👎", true);
            m.edit(emb).catch();
        });
    }
};