const { Message } = require('discord.js');
const { deatiledEmb, colors, emotes } = require('../utilities');

module.exports = {
    name: 'waifu',
    syntax: 'waifu',
    args: false,
    type: 'Anime',
    description: 'shows you Waifus',
    DmChannel: true,
    commands: ['waifu'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg)
        const url = `https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100000)}.jpg`

        emb.setImage(url)
            .setTitle(' ﾟ+*:ꔫ:*﹤ Waifu ﹥*:ꔫ:*+ﾟ')
            .setURL(url)
            .setTimestamp()
            .setFooter(msg.author.tag)
        msg.channel.send(emb).catch();
    }
};