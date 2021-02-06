const { Message } = require('discord.js');
const { rawEmb, checkOwner, emotes, deatiledEmb } = require('../utilities');

module.exports = {
    name: 'update',
    syntax: 'update [ping]',
    args: false,
    type: 'Developer',
    description: 'my neweest update',
    commands: ['update', 'updates', 'changelog'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setTitle("Update 4.3.1 [05.02]")
        let text = `${emotes.staff} **Changed** ${emotes.staff}\n` +
            "• avatar\n• serverinfo\n\n" +
            `${emotes.plus} **Added** ${emotes.plus} \n` +
            "• emojiinfo\n• changelog\n\n"
        //     `:warning:  **Removed** :warning: \n` +
        // "• massrole\n• nsfwneko "
        emb.setDescription(text)
        msg.channel.send(emb)
    }
};