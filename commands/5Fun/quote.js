const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');
const bent = require('bent');

module.exports = {
    name: 'quote',
    syntax: 'quote',
    args: false,
    type: 'Fun',
    description: 'Shows some quotes',
    DmChannel: true,
    commands: ['quote', 'quotes'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        const getString = bent('string');
        try {
            var res = await getString("https://www.no-api-key.com/api/v1/quotes");

            try {
                var json = JSON.parse(res);
                emb.setDescription(json.quote)
                    .setTitle("Quotes")
                    .setFooter(json.author)
                msg.channel.send(emb);
            } catch (err) {
                console.log(err);
                msg.channel.send(emb.setColor(colors.error).setTitle("There was an error extracting the quote :0")).catch()
            }
        } catch (err) {
            console.log(err);
            msg.channel.send(emb.setColor(colors.error).setTitle("There was an error catching a quote >~>")).catch()
        }
    }
};