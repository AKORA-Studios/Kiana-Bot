const { Message } = require('discord.js');
const { colors, rawEmb } = require('../utilities');

module.exports = {
    name: 'afk',
    syntax: 'afk Reason',
    args: false,
    type: 'Info',
    description: 'Sets you an afk state',
    DmChannel: true,
    commands: ['afk', 'setafk'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb()
        let reason;
        if (args[0]) reason = args.join(' ')
        if (!reason) reason = 'No Reason'

        msg.client.afkMember.set(msg.author.id, reason)
        emb.setTitle(msg.author.username + ': AFK')
            .setTimestamp()
            .setDescription(reason)
        msg.channel.send(emb).catch();
    }
};