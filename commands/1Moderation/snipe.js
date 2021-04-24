const { Message } = require('discord.js');
const { rawEmb, emotes, colors } = require('../utilities');

module.exports = {
    name: 'snipe',
    syntax: 'snipe <#channel>',
    args: false,
    type: 'Moderation',
    description: 'Snipes the last deleted message',
    commands: ['snipe'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        let channel = msg.mentions.channels.first() || msg.channel
        const snipe = msg.client.snipedMessages.get(channel.id)

        if (!snipe) return msg.channel.send(emb.setColor(colors.error).setDescription('No message found qwq'))

        emb.setAuthor(snipe.author.tag, snipe.author.displayAvatarURL())
            .setDescription(snipe.content)
            .setFooter('Message found in ' + msg.channel.name)
            .setTimestamp();
        msg.channel.send(emb);
    }
};