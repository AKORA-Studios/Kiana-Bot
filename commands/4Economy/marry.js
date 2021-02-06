const { Message } = require('discord.js');
const { deatiledEmb, marry, colors } = require('../utilities');

module.exports = {
    name: 'marry',
    syntax: 'marry [@user]',
    args: false,
    type: 'Economy',
    description: 'Let You marry a user',
    commands: ['marry'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let profile = await msg.client.database.UserConfigCache.getConfig(msg.author.id)
        let emb = deatiledEmb(msg).setColor(colors.economy)
        let user;

        user = msg.mentions.users.first();
        if (!user) return msg.channel.send(emb.setColor(colors.error).setDescription("You must specify a user you want to marry")).catch()

        if (user.id == msg.author.id) return msg.channel.send(emb.setColor(colors.error).setDescription("You cant´t marry yourself")).catch()
        if (user.bot) return msg.channel.send(emb.setColor(colors.error.setDescription("You cannot marry bots qwq"))).catch()


        if (profile.marry) {
            let U = msg.client.users.cache.get(profile.marry)
            if (U) { return msg.channel.send(emb.setColor(colors.error).setDescription(`You are already married with **${U.username}**, you must divorce before you can marry again`)).catch() }
        }

        let marryed = await msg.client.database.UserConfigCache.getConfig(user.id)

        if (marryed.marry) {
            let U = msg.client.users.cache.get(marryed.marry)
            return msg.channel.send(emb.setColor(colors.error).setTitle(`This Person is already marryed with **${U.username}**`)).catch()
        }
        if (profile.wallet < 50000) return msg.channel.send(emb.setColor(colors.error).setDescription(`A wedding costs **50 000¥**, you need ${50000 - profile.wallet}¥ more`)).catch()

        let q = msg.author.username + " asks you if you want to marry him/her :0"
        marry(msg, user.id, q, () => {
            profile.marry = user.id;
            profile.wallet -= 50000;
            marryed.marry = msg.author.id;
            profile.save()
            marryed.save()

            return msg.channel.send(emb.setTitle("Wedding").setDescription("**You have successfully married [<@" + user + ">]**")).catch()
        }, () => {
            return msg.channel.send(emb.setColor(colors.error).setDescription("Unfortunately he/she refuses qwq")).catch()
        })
    }
};