const { Message } = require('discord.js');
const { rawEmb, colors, checkOwner } = require('../utilities');

module.exports = {
    name: 'choose',
    syntax: 'choose option1 option2',
    args: true,
    type: 'Fun',
    description: 'choose something',
    DmChannel: true,
    commands: ['choose'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        const randomNumber = Math.floor(Math.random() * (args.length - 0) + 0);

        let choosenOption = `**#${randomNumber + 1}**\n ${args[randomNumber]}`
        emb.setDescription(choosenOption).setFooter(`#${randomNumber + 1}/${args.length}`)

        msg.channel.send(emb.setTitle(`I choose . . . `)).catch()
    }
};