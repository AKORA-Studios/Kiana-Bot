const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

module.exports = {
    name: 'uptime',
    syntax: 'uptime>',
    args: false,
    type: 'Info',
    description: 'Shows you how long the bot has been online uwu',
    DmChannel: true,
    commands: ['uptime'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        const date = new Date(msg.client.uptime);
        const days = date.getUTCDate() - 1,
            hours = date.getUTCHours(),
            minutes = date.getUTCMinutes(),
            seconds = date.getUTCSeconds();

        let segments = [];
        if (days > 0) segments.push(days + ' Day' + ((days == 1) ? '' : 's'));
        if (hours > 0) segments.push(hours + ' Hour' + ((hours == 1) ? '' : 's'));
        if (minutes > 0) segments.push(minutes + ' Minute' + ((minutes == 1) ? '' : 's'));
        if (seconds > 0) segments.push(seconds + ' Second' + ((seconds == 1) ? '' : 's'));

        const timeString = segments.join(', ');

        let emb = rawEmb()
            .setDescription(timeString)
        msg.channel.send(emb).catch();
    }
};