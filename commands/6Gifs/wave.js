const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');
const bent = require('bent');

module.exports = {
    name: 'wave',
    syntax: 'wave',
    args: false,
    type: 'Gifs',

    description: 'Shows some Pictures or Gifs',
    needed: ['EMBED_LINKS'],
    commands: ['wave'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg) {
        let emb = rawEmb()
        const getString = bent('string');
        const m = await msg.channel.send(emb.setTitle('Searching . . .').setFooter(`WaifuPics Api || requested by ${msg.author.username}`))
        try {
            var res = await getString("https://waifu.pics/api/sfw/wave");
            try {
                var json = JSON.parse(res);
                emb.setURL(json.url)
                    .setImage(json.url)
                    .setTitle("wave " + JSON.parse((await getString('https://nekos.life/api/v2/cat'))).cat)
                await m.edit(emb)
            } catch (err) {
                m.edit(emb.setColor(colors.error).setTitle("There was an error extracting the wave :0"));
            }
        } catch (err) {
            m.edit(emb.setColor(colors.error).setTitle("There was an error catching a wave >~>"));
        }
    }
};