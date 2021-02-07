const { Message } = require('discord.js');
const { rawEmb, colors, deatiledEmb } = require('../utilities');
const bent = require('bent');

module.exports = {
    name: 'meme',
    syntax: 'meme',
    args: false,
    type: 'Fun',
    description: 'Shows some memes',
    DmChannel: true,
    commands: ['meme', 'memes'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setTitle('☆○o。Meme 。o○☆')
        const getString = bent('string');
        try {
            var res = await getString("https://some-random-api.ml/meme");

            try {
                var json = JSON.parse(res);
                emb.setImage(json.image)
                    .setDescription(json.caption)
                    .setFooter('ID: ' + json.id)
                msg.channel.send(emb);
            } catch (err) {
                console.log(err);
                msg.channel.send(emb.setColor(colors.error).setTitle("There was an error extracting the meme :0")).catch()
            }
        } catch (err) {
            console.log(err);
            msg.channel.send(emb.setColor(colors.error).setTitle("There was an error catching a meme >~>")).catch()
        }
    }
};