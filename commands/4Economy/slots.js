const { Message } = require('discord.js');
const slotItems = ["🍇", "🍉", "🍊", "🍎", "⭐", "🍓", "🍒"];
const { deatiledEmb, colors } = require('../utilities');

module.exports = {
    name: 'slots',
    syntax: 'slots <amount>',
    args: true,
    type: 'Economy',
    description: 'Do you trust in your luck?',
    commands: ['slots'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let win = false;
        let emb = deatiledEmb(msg).setColor(colors.economy).setTitle(`.•☆ Slots ☆•.`)
        let profile = await msg.client.database.UserConfigCache.getConfig(msg.author.id)

        let amount = parseInt(args[0])
        if (Math.sign(amount) == -1) amount = amount * -1

        else if (isNaN(amount) || !amount || amount < 10) {
            emb.setDescription("**Please enter a valid number, min 10**")
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }

        if (profile.wallet < amount) {
            emb.setDescription("**Unfortunately you do not have that much money qwq**")
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }

        let number = []
        for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

        if (number[0] == number[1] && number[1] == number[2]) {
            amount *= 9
            win = true;
        } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
            amount *= 2
            win = true;
        }

        if (win) {
            emb.setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won **${amount.toLocaleString()}¥**`)
            profile.wallet += amount;
            await profile.save()
            return msg.channel.send(emb.setColor(colors.success)).catch()
        } else {
            emb.setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost **${amount.toLocaleString()}¥**`)
            profile.wallet -= amount;
            await profile.save()
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }
    }
};