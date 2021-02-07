const { Message } = require('discord.js');
const { rawEmb, colors, deatiledEmb } = require('../utilities');

module.exports = {
    name: 'Lovecalc',
    syntax: 'lovecalc <user1> <user2>',
    args: false,
    type: 'Fun',
    description: 'Find out how much two users are attracted to each other',
    commands: ['lovecalc'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let member1 = msg.mentions.members.first();
        let member2 =
            msg.mentions.members.filter(m => m.id !== member1.id).first() ||
            msg.member;

        if (!member1 || !member2) {
            member1 = msg.member
            member2 = msg.guild.members.resolve(msg.client.user.id)
        }

        let percent = Math.floor(((member1.id + member2.id) / Math.pow(10, 18 * 2)) * 100);

        let emb = deatiledEmb(msg).setTitle('☆*:.｡.　Lovecalc　.｡.:*☆')
        msg.channel.send(emb.setTitle("**💖 LoveCalc 💖**").setDescription(`${member1} 💞 **${percent}%** 💞 ${member2}`)).catch();
    }
};