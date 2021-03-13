const { Message } = require('discord.js');
const { deatiledEmb, colors } = require('../utilities');

module.exports = {
    name: 'roulett',
    syntax: 'roulett <color> <amount>',
    args: true,
    type: 'Economy',
    description: 'Do you trust in your luck?',
    commands: ['roulett', 'roulette'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg)
        let profile = await msg.client.database.UserConfigCache.getConfig(msg.author.id)

        let colour = args[0].toLowerCase()
        let amount = parseInt(args[1])
        let random = Math.floor(Math.random() * 37);

        if (!colour) {
            emb.setTitle("Specify a color | Red [1.5x] Black [2x] Green [15x]")
            return msg.channel.send(emb.setColor(colors.error)).catch()
        } else if (colour != "red" && colour != "black" && colour != "green") {
            if (language == "DE") emb.setTitle("Gib eine Frabe an | Red [1.5x] Black [2x] Green [15x]")
            emb.setTitle("Specify a color | Red [1.5x] Black [2x] Green [15x]")
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }

        if (Math.sign(amount) == -1) amount = amount * -1

        else if (isNaN(amount) || !amount || amount < 10) {
            emb.setTitle("Please enter a valid number, min 10")
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }

        if (profile.wallet < amount) {
            emb.setTitle("Unfortunately you do not have that much amount qwq")
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }

        if (colour == "black") colour = 0;
        else if (colour == "red") colour = 1;
        else if (colour == "green") colour = 2;

        if (random == 0 && colour == 2) { // Green
            amount *= 15
            profile.wallet += amount;
            await profile.save()
            emb.setDescription(`You won **${amount.toLocaleString()}¥**\n\nMultiplier: 15x`);
            emb.setColor(colors.success)
        } else if (isOdd(random) && colour == 1) { // Red
            amount *= 1.5
            profile.wallet += amount;
            await profile.save()
            emb.setDescription(`You won **${amount.toLocaleString()}¥**\n\nMultiplier: 1.5x`);
            emb.setColor(colors.success)
        } else if (!isOdd(random) && colour == 0) { // Black
            amount *= 2
            profile.wallet += amount;
            await profile.save()
            emb.setDescription(`You won **${amount.toLocaleString()}¥**\n\nMultiplier: 2x`);
            emb.setColor(colors.success)
        } else { // Wrong
            profile.wallet -= amount;
            await profile.save()
            emb.setDescription(`You lost **${amount.toLocaleString()}¥**\n\nMultiplier: 0x`);
            emb.setColor(colors.error)
        }
        return msg.channel.send(emb).catch()
    }
};

function isOdd(num) {
    if ((num % 2) == 0) return false;
    else if ((num % 2) == 1) return true;
}