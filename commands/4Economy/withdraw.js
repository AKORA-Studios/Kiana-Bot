const { Message } = require('discord.js');
const { deatiledEmb, colors } = require('../utilities');

module.exports = {
    name: 'withdraw',
    syntax: 'withdraw <amount>',
    args: true,
    type: 'Economy',
    description: 'Lets you withdraw your assets from your account OvO',
    commands: ['withdraw', 'with'],
    //withdraw 
    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setTitle("Withdraw")
        let Profile = await msg.client.database.UserConfigCache.getConfig(msg.author.id)

        let amount = parseInt(args[0])
        if (Math.sign(amount) == -1) amount = amount * -1

        if (args[0] == "all") { amount = Profile.bank }
        if (isNaN(amount) || !amount) {
            emb.setDescription("Please enter a valid number")
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }

        if (Profile.bank < amount) {
            emb.setDescription("Unfortunately you do not have that much money qwq")
            return msg.channel.send(emb.setColor(colors.error)).catch()
        }

        Profile.wallet += amount
        Profile.bank -= amount;
        await Profile.save()
        emb.setDescription(`**${amount.toLocaleString()}**¥ Successfully retrieved from your bank
        \n **:yen: Wallet: :yen:** \` ${Profile.wallet.toLocaleString()}¥\` 
        \n **:bank: Bank: :bank:** \` ${Profile.bank.toLocaleString()}¥\``)
        return msg.channel.send(emb).catch()
    }
};