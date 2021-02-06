const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

module.exports = {
    name: 'Ping',
    syntax: 'ping',
    args: false,
    type: 'Info',
    description: 'Shows you the bots ping latencys',
    DmChannel: true,
    commands: ['ping'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg).setColor(colors.info).setTitle(":ping_pong:  Pong!  :ping_pong: ")
        const m = await msg.channel.send(emb).catch();

        emb.addField("**Bot**", "`" + (new Date() - m.createdTimestamp) + "ms`", true);
        emb.addField("**Discord**", "`" + msg.client.ws.ping + "ms`", true);
        m.edit(emb).catch();
    }
};