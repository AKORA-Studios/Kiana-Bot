const { Message, MessageEmbed } = require('discord.js');
const { rawEmb, emotes } = require('../utilities');

module.exports = {
    name: 'setchannelnsfw',
    syntax: 'setchannelnsfw <#channel>',
    args: false,
    type: 'Moderation',
    description: 'Changes the NSFW setting of a channel',
    perm: ['MANAGE_CHANNELS'],
    needed: ['MANAGE_CHANNELS'],
    commands: ['setchannelnsfw', 'sfw'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        var channel = msg.mentions.channels.first() || msg.channel
        if (!channel.type == "text") return msg.channel.send(emb.setTitle("This is not a text channel qwq")).catch()

        if (channel.nsfw) {
            channel.setNSFW(false);
            msg.channel.send(emb.setTitle("Channel is now SFW")).catch()
        } else {
            channel.setNSFW(true);
            msg.channel.send(emb.setTitle("Channel is now NSFW!")).catch()
        }
    }
};