const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');
const akaneko = require('akaneko');

module.exports = {
    name: 'panties',
    syntax: 'panties',
    args: false,
    type: 'Nsfw',

    description: 'Shows some Pictures or Gifs',
    needed: ['NSFW', 'EMBED_LINKS'],
    DmChannel: true,
    cooldown: 3,
    commands: ['panties'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg) {
        let emb = rawEmb(msg).setFooter('Akaneko Api').setTimestamp()
        let url;
        let m = await msg.channel.send(emb).catch()

        url = await akaneko.nsfw.panties()

        setTimeout(async () => {
            //nothing
        }, 9000);

        if (url) {
            emb.setTitle("panties")
                .setImage(url)
            m.edit(emb).catch()
        } else {
            emb.setTitle("Failed Request")
            emb.setColor(colors.error)
            m.edit(emb).catch()
        }
    }
};