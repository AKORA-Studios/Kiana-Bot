const { Message } = require('discord.js');
const { rawEmb, colors, deatiledEmb } = require('../utilities');

module.exports = {
    name: 'calc',
    syntax: 'calc <1+1>',
    args: true,
    type: 'Fun',
    description: 'calc something for you',
    DmChannel: true,
    commands: ['calc'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setTitle('☆○o。Calc 。o○☆')

        let op = args.join('');
        if (op) {
            let err;
            let erg;

            try {
                erg = eval(op)
            } catch (e) {
                err = e;
            }

            if (err) return msg.channel.send(emb.setColor(colors.error).setDescription("No result possible")).catch()

            emb.addField(`math problem:`, op, false).addField(`Result:`, erg, true);
            msg.channel.send(emb).catch();
        }
    }
};