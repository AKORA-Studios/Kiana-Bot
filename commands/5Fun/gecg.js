const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');
const bent = require('bent');

module.exports = {
    name: 'gecg',
    syntax: 'gecg',
    args: false,
    type: 'Fun',
    description: 'Shows some Pictures or Gifs',
    DmChannel: true,
    needed: ['NSFW', 'EMBED_LINKS'],
    commands: ['gecg'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb()
        const getString = bent('string');
        const m = await msg.channel.send(emb.setTitle('Searching . . .').setFooter('Nekoslife Api').setTimestamp())
        try {
            var res = await getString("https://nekos.life/api/v2/img/gecg");
            try {
                var json = JSON.parse(res);
                emb.setURL(json.url)
                    .setImage(json.url)
                    .setTitle("gecg " + JSON.parse((await getString('https://nekos.life/api/v2/cat'))).cat)
                await m.edit(emb)
            } catch (err) {
                m.edit(emb.setColor(colors.error).setTitle("There was an error extracting the Neko :0")).catch()
            }
        } catch (err) {
            m.edit(emb.setColor(colors.error).setTitle("There was an error catching a Neko >~>")).catch()
        }
    }
};