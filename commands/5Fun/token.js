const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');
const bent = require('bent')

module.exports = {
    name: 'bottoken',
    syntax: 'bottoken',
    args: false,
    type: 'Fun',
    description: 'bottoken',
    DmChannel: true,
    commands: ['token', 'bottoken'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg).setTitle('Nani . .. ?!')
        const getString = bent('string');

        try {
            const result = await getString('https://some-random-api.ml/bottoken');
            return msg.channel.send(emb.setDescription((JSON.parse(result).token)));
        } catch (err) {
            emb.setDescription('Could not find any results.')
            return msg.channel.send(emb.setColor(colors.error));
        }
    }
};