const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');
const hmtai = require("hmtai");

module.exports = {
    name: 'blowjob',
    syntax: 'blowjob',
    args: false,
    type: 'Nsfw',

    description: 'Shows some Pictures or Gifs',
    needed: ['NSFW', 'EMBED_LINKS'],
    DmChannel: true,
    cooldown: 3,
    commands: ['blowjob'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg) {
        let emb = rawEmb(msg).setFooter('Hmtai APi').setTimestamp()
        let url;
        let m = await msg.channel.send(emb).catch()
        url = await hmtai.nsfw.blowjob()

        setTimeout(async () => {
            //nothing
        }, 9000);

        if (url) {
            emb.setTitle("blowjob")
                .setImage(url)
            m.edit(emb).catch()
        } else {
            emb.setTitle("Failed Request")
            emb.setColor(colors.error)
            m.edit(emb).catch()
        }
    }
};