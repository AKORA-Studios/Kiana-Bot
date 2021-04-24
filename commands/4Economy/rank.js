const { Message } = require('discord.js');
const { calcLevel, deatiledEmb, colors } = require('../utilities');

module.exports = {
    name: 'ranks',
    syntax: 'ranks [@user]',
    args: false,
    type: 'Economy',
    description: 'Shows you the rank of a user',
    commands: ['ranks'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg)
        let user = msg.mentions.users.first() || msg.author
        if (user.bot) return msg.channel.send(emb.setColor(colors.error).setTitle("Bots do not have rank")).catch()

        var user_cache = msg.client.database.UserConfigCache.array();
        var xp_arr = user_cache
        var coin_array = user_cache

        xp_arr = xp_arr.sort((a, b) => b.xp - a.xp)
        var rank_xp = xp_arr.findIndex(e => e.userID == user.id) + 1
        coin_array = coin_array.sort((a, b) => (parseInt(b.wallet) + parseInt(b.bank)) - (parseInt(a.wallet) + parseInt(a.bank)))

        var rank_wallet = coin_array.findIndex(e => e.userID == user.id) + 1
        let profile = await msg.client.database.UserConfigCache.getConfig(user.id)

        emb.setDescription(`[XP] **${rank_xp}.** \`[Lvl.: ${calcLevel(profile.xp)}]\`\n [¥] **${rank_wallet}.**  \`[${(parseInt(profile.wallet) + parseInt(profile.bank)).toLocaleString()}¥]\``)
            .setFooter(`${user_cache.length} Users Ranked`)
        msg.channel.send(emb.setTitle(`.•☆ ${user.username}´s Rank ☆•.`)).catch()
    }
};