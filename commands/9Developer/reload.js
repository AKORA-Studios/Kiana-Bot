const { Message } = require('discord.js');
const { rawEmb } = require('../utilities');

module.exports = {
    name: 'reload',
    syntax: 'reload',
    args: false,
    type: 'Developer',
    description: 'reload cmds',
    perm: ['DEVELOPER'],
    commands: ['reload'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) { }
};