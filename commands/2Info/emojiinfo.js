const { Message } = require('discord.js');
const { colors, deatiledEmb } = require('../utilities');

module.exports = {
    name: 'emojiinfo',
    syntax: 'emojiinfo',
    args: false,
    type: 'Info',
    description: 'Shows u a users profilepicture OvO',
    DmChannel: true,
    commands: ['emojiinfo', 'emojis'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg)
        let arr = []
        let animatedArr = []
        msg.guild.emojis.cache.forEach(e => {
            if (e.animated) return animatedArr.push(`${e.name} [${e.id}]`)
            arr.push(`${e.name} [${e.id}]`)
        })
        let text = '**Normal ones:**\n'
        text += arr.length >= 1 ? arr.join('\n') : 'None'
        text += '\n\n**Animated ones**\n'
        text += animatedArr.length >= 1 ? animatedArr.join('\n') : 'None'

        emb.setTitle('Emojiinfo')
            .setDescription(text)
        msg.channel.send(emb).catch();
    }
};