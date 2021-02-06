const { Message } = require('discord.js');
const { deatiledEmb, colors } = require('../utilities');

module.exports = {
    name: 'divorce',
    syntax: 'divorce',
    args: false,
    type: 'Economy',
    beschreibung: 'Lässt dich dich von deinem Ehepartner trennen qwq',
    description: 'divorce ._.',
    commands: ['divorce'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let profile = await msg.client.database.UserConfigCache.getConfig(msg.author.id)
        let emb = deatiledEmb(msg).setColor(colors.economy)

        if (!profile.marry) return msg.channel.send(emb.setColor(colors.error).setDescription(`You are aren´t marryed qwq`)).catch()
        if (parseInt(profile.wallet) < 20000) return msg.channel.send(emb.setColor(colors.error).setDescription(`A divorce costs **20 000¥**, you need ${20000 - parseInt(profile.wallet)}¥ more`)).catch()

        let U = await msg.client.database.UserConfigCache.getConfig(profile.marry)
        let X = await msg.client.users.cache.get(profile.marry)
        console.log(X)

        X.send(emb.setDescription(`Du bist nun wieder single, **${msg.author.username}** hat sich von dir scheiden lassen \n
        You´r single again now, **${msg.author.username}** had organized a divorce`)).catch()

        U.marry = undefined
        profile.marry = undefined
        profile.wallet -= 20000;
        await profile.save()
        await U.save();

        return msg.channel.send(emb.setDescription("**You are now single again**").setTitle("divorce")).catch()
    }
};