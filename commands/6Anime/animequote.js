const { Message } = require('discord.js');
const { rawEmb, colors, emotes } = require('../utilities');
const aq = require('animequote');

module.exports = {
    name: 'animequote',
    syntax: 'animequote',
    args: false,
    type: 'Anime',
    description: 'shows you anime quotes',
    DmChannel: true,
    commands: ['animequote'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        let quote = aq()

        emb.setDescription(quote.quotesentence)
            .setAuthor(quote.quotecharacter)
            .setFooter(quote.quoteanime + '|| #' + quote.quotenumber)
        msg.channel.send(emb).catch();
    }
};