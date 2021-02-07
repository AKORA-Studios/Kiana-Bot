const { Message } = require('discord.js');
const { rawEmb } = require('../utilities');

module.exports = {
    name: 'Pop',
    syntax: 'pop [size]',
    args: false,
    type: 'Fun',
    description: 'Pop!',
    DmChannel: true,
    commands: ['pop'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg).setTitle('⋆ ˚｡⋆୨୧˚ Pop ˚୨୧⋆｡˚ ⋆')

        let size = Number(args.length ? args[0] : 4) || 4;
        size < 2 ? size = 2 : "";

        let arr = new Array();

        for (let x = 0; x < size; x++) {
            arr[x] = new Array();
            for (let y = 0; y < size; y++) {
                arr[x][y] = '⛓';
            }
        }

        let x = Math.floor(Math.random() * size);
        let y = Math.floor(Math.random() * size);

        arr[x][y] = '🧨';
        emb.setDescription('Find the POP!\n' +
            arr.map(a =>
                a.map(v => `||${v}||`)
                    .join('')
            ).join('\n')
        )
        msg.channel.send(emb).catch()
    }
};