const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');
const hmtai = require("hmtai");

module.exports = {
    name: 'uniform',
    syntax: 'uniform',
    args: false,
    type: 'Nsfw',

    description: 'Shows some Pictures or Gifs',
    needed: ['NSFW', 'EMBED_LINKS'],
    DmChannel: true,
    cooldown: 3,
    commands: ['uniform'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg) {
        let emb = rawEmb(msg).setFooter('Hmtai Api').setTimestamp()
        let url;
        let m = await msg.channel.send(emb).catch()

        url = await hmtai.nsfw.uniform()

        setTimeout(async () => {
            //nothing
        }, 9000);

        if (url) {
            emb.setTitle("uniform")
                .setImage(url)
            m.edit(emb).catch()
        } else {
            emb.setTitle("Failed Request")
            emb.setColor(colors.error)
            m.edit(emb).catch()
        }
    }
};