const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');
const client = require("tnai");
const tnai = new client();

module.exports = {
    name: 'feed',
    syntax: 'feed',
    args: false,
    type: 'Gifs',

    description: 'Shows some Pictures or Gifs',
    needed: ['EMBED_LINKS'],
    commands: ['feed'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg).setTitle(`Searching . . .`).setFooter(`Tnai Api || requested by ${msg.author.username}`)
        let m = await msg.channel.send(emb).catch()

        let url = await tnai.sfw.feed();
        if (url) {
            emb.setTitle(`${msg.author.username} ist feeding you :0`)
                .setImage(url)
            m.edit(emb).catch()
        } else {
            emb.setTitle("Failed Request")
            emb.setColor(colors.error)
            m.edit(emb).catch()
        }
    }
};