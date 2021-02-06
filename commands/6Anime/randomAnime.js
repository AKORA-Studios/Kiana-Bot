const { Message } = require('discord.js');
const { rawEmb, colors, emotes } = require('../utilities');
const bent = require('bent')
const base = ('https://kitsu.io/api/edge/anime/')

module.exports = {
    name: 'randomanime',
    syntax: 'randomanime',
    args: false,
    type: 'Anime',

    description: 'shows you new animes',
    DmChannel: true,
    cooldown: 15,
    commands: ['randomanime'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        let id = (Math.floor(Math.random() * (9998 - 1 + 1) + 1)).toString()
        const getString = bent('string');
        let url = base + id

        let m = await msg.channel.send(emb.setDescription('**Searching . . . **')).catch()
        let resultUnparsed;
        try { resultUnparsed = await getString(url) } catch (er) {
            msg.channel.send(emb.setDescription('There was an error qwq ').setColor(colors.error)).catch()
        }

        let result = JSON.parse(resultUnparsed)
        let anime = result.data.attributes
        if (!anime) return m.edit(emb.setDescription('**Not found. Please try again**').setColor(colors.error)).catch()

        emb.setAuthor(`${anime.titles.en} | ${anime.showType}`, anime.posterImage.original)
            .setTitle('URL')
            .setURL(url)
            .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
            .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${anime.titles.ja_jp}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
            .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
            .addField('❯\u2000\Status', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
            .setImage(anime.posterImage.original);
        m.edit(emb).catch();
    }
};