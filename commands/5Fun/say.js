const { Message } = require('discord.js');
const { rawEmb, colors, checkOwner } = require('../utilities');

module.exports = {
    name: 'say',
    syntax: 'say <Message>',
    args: true,
    type: 'Fun',
    description: 'says something for you',
    DmChannel: true,
    commands: ['say'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        const sayMessage = args.join(" ");

        if (checkOwner(msg.author.id)) {
            msg.channel.send(sayMessage).catch()
        } else {
            emb.setDescription(sayMessage)
                .setAuthor(msg.author.username, msg.author.avatarURL())
            msg.channel.send(emb).catch();
        }
        try { msg.delete() } catch (er) { }
    }
};