const { Message } = require('discord.js');
const { deatiledEmb, colors } = require('../utilities');

module.exports = {
    name: 'deposit',
    syntax: 'deposit <amount>',
    args: true,
    type: 'Economy',
    description: 'Transfer your wallet to your bank account OvO',
    commands: ['deposit', 'dep'],
    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setTitle("Deposit")
        let Profile = await msg.client.database.UserConfigCache.getConfig(msg.author.id)

        let amount = parseInt(args[0])
        if (Math.sign(amount) == -1) amount = amount * -1

        if (!Profile.wallet) {
            return msg.channel.send(emb.setColor(colors.error).setDescription("You don´t have money in your wallet")).catch()
        } else if (args[0] == "all") {
            amount = Profile.wallet
        } else if (isNaN(amount) || !amount || amount == 0) {
            return msg.channel.send(emb.setColor(colors.error).setDescription("Please enter a valid number")).catch()
        }

        if (Profile.wallet < amount) return msg.channel.send(emb.setColor(colors.error).setDescription("Unfortunately you do not have that much money qwq")).catch()

        Profile.wallet -= amount
        Profile.bank += amount;
        await Profile.save()

        emb.setDescription(`**${amount}¥** Successfully transferred to the bank account
        \n **:yen: Wallet: :yen:** \` ${Profile.wallet.toLocaleString()}¥\` 
        \n **:bank: Bank: :bank:** \` ${Profile.bank.toLocaleString()}¥\``)
        return msg.channel.send(emb).catch()
    }
};