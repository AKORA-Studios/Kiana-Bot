const { Message } = require('discord.js');
const { confirmAction, checkOwner } = require('../utilities');

module.exports = {
    name: 'Shutdown',
    syntax: 'shutdown',
    args: false,
    type: 'Developer',
    description: 'Restart the Bot',
    perm: ['DEVELOPER'],
    commands: ['shutdown', 'restart', 'disconnect'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        confirmAction(msg, 'You really want to kill me? qwq', async () => {
            process.exit();
        }, () => {

        })
    }
};