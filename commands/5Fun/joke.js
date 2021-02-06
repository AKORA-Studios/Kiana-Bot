const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');
const bent = require('bent');

module.exports = {
    name: 'joke',
    syntax: 'joke',
    args: false,
    type: 'Fun',
    description: 'Shows some jokes',
    DmChannel: true,
    cooldown: 20,
    commands: ['joke', 'jokes'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg) {
        let emb = rawEmb(msg)
        const getString = bent('string');
        try {
            var res = await getString("https://sv443.net/jokeapi/v2/joke/Any");

            try {
                var json = JSON.parse(res);
                let flags = ""
                if (json.flags.nsfw) flags + ":underage: \n"
                if (json.flags.religious) flags + ":cross: \n"
                if (json.flags.political) flags + "political\n"
                if (json.flags.racist) flags + "racist\n"
                if (json.flags.sexist) flags + "sexist\n"

                emb.setTitle(`🎭 Joke 🎭`)
                    .setFooter(`Category: "${json.category}" Id: ${json.id}`)
                if (json.type == "twopart") emb.setDescription(`**${json.setup}**\n\n || ${json.delivery} ||`)
                if (json.type == "single") emb.setDescription(`**${json.joke}**`)

                if (flags.length > 1) emb.addField("**Flags**", flags)
                msg.channel.send(emb);
            } catch (err) {
                console.log(err);
                msg.channel.send(emb.setColor(colors.error).setTitle("There was an error extracting the Joke :0")).catch()
            }
        } catch (err) {
            console.log(err);
            msg.channel.send(emb.setColor(colors.error).setTitle("There was an error catching a Joke >~>")).catch()
        }
    }
};