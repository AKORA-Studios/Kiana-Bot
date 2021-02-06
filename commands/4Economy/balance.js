const { Message } = require('discord.js');
const { deatiledEmb, emotes, colors } = require('../utilities');

module.exports = {
    name: 'balance',
    syntax: 'balance [@user]',
    args: false,
    type: 'Economy',
    description: 'Shows a user´s balance',
    commands: ['balance', 'bal', 'money'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setColor(colors.economy)

        let user;
        if (msg.mentions.users.first()) {
            user = msg.mentions.users.first();
        } else {
            user = msg.author;
        }

        if (user.bot) return msg.channel.send(emb.setColor(colors.error).setDescription("Bots don't have money O.o")).catch()

        let profile = await msg.client.database.UserConfigCache.getConfig(user.id)
        let bal = profile.wallet + profile.bank

        emb.addField('💴 Wallet', `\`${(profile.wallet).toLocaleString()}¥\` `, true)
        emb.addField('💳 Bank', `\`${(profile.bank).toLocaleString()}¥\` `, true)
        emb.addField('🏦 Total', `\`${(bal).toLocaleString()}¥\` `, true)

        msg.channel.send(emb.setTitle(`.•☆ Balance ${user.username} ☆•.`)).catch()
    }
};