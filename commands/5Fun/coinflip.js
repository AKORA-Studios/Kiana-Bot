const { Message } = require('discord.js');
const { rawEmb } = require('../utilities');

module.exports = {
    name: 'Coinflip',
    syntax: 'flip',
    args: false,
    type: 'Fun',
    description: 'Throws a coin for You',
    DmChannel: true,
    commands: ['coinflip', 'flip'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        function englisch() {
            var rand = ["Head!", "Number!"];
            return rand[Math.floor(Math.random() * rand.length)];
        }

        msg.channel.send(emb.setTitle(englisch())).catch()
    }
};