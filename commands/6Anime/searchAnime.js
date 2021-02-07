const { Message } = require('discord.js');
const { deatiledEmb, colors, emotes } = require('../utilities');
const bent = require('bent')
const base = ('https://kitsu.io/api/edge/anime?filter[text]=')

module.exports = {
    name: 'searchanime',
    syntax: 'searchanime name',
    args: true,
    type: 'Anime',
    description: 'shows you new animes',
    DmChannel: true,
    cooldown: 20,
    commands: ['searchanime'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg)
        let searchParam = args.join(' ').replace(' ', '-')
        const getString = bent('string');
        let url = base + searchParam + '&page%5Blimit%5D=1&page%5Boffset%5D=0'

        let m = await msg.channel.send(emb.setDescription('**Searching . . . **')).catch()
        let resultUnparsed;
        try { resultUnparsed = await getString(url) } catch (er) {
            msg.channel.send(emb.setDescription('There was an error qwq ').setColor(colors.error)).catch()
        }

        let result = JSON.parse(resultUnparsed)
        let anime = result.data[0].attributes
        if (!anime) return m.edit(emb.setDescription('**Not found. Please try again**').setColor(colors.error)).catch()
        emb.setAuthor(`${anime.titles.en_jp} | ${anime.showType}`, anime.posterImage.original)
            .setTitle('*°:⋆ₓₒ　Anime Search　ₓₒ⋆:°*')
            .setURL(url)
            .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
            .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${anime.titles.ja_jp}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
            .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
            .addField('❯\u2000\Status', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
            .setImage(anime.posterImage.original);
        m.edit(emb).catch();
    }
};