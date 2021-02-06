const { Message } = require('discord.js');
const { rawEmb } = require('../utilities');

module.exports = {
    name: '8-Ball',
    syntax: '8 ball',
    args: false,
    type: 'Fun',
    description: 'throws an 8ball for you OnO',
    DmChannel: true,
    commands: ['8ball', 'ball'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let text = args.join(" ")
        let emb = rawEmb(msg)
        if (text.endsWith('?')) text += '?'

        if (text.length < 1) text = 'No Question qwq'

        emb.setDescription(`${text} \n\n :8ball: **${englisch()}**`)
        msg.channel.send(emb).catch()
    }
};
function englisch() {
    var rand = [
        " Absolute",
        " Definitely not",
        " It is true",
        " Impossible",
        " Of course",
        " I don't think so",
        " True",
        " This is wrong",
        " I doubt that very much",
        " I agree with you",
        " My sources refer to \"No\"",
        " Theories have proven it",
        " 404 not found ^^",
        " Maybe",
        " I prefer to leave this uncertain",
        " I can't say that for sure",
        " Concretize and then ask again"
    ];
    return rand[Math.floor(Math.random() * rand.length)];
}