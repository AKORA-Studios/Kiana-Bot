const { Message } = require('discord.js');
const { colors, rawEmb, emotes } = require('../utilities');

module.exports = {
    name: 'channelinfo',
    syntax: 'channelinfo <#Channel>',
    args: false,
    type: 'Info',
    description: 'Shows you information about a channel',
    commands: ['channelinfo', 'chinfo'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb()

        let channel;
        if (msg.mentions.channels.first()) {
            channel = msg.mentions.channels.first();
        } else if (!isNaN(args[0])) {
            channel = msg.guild.channels.resolve(args[0])
        } else {
            channel = msg.channel;
        }
        let des = channel.topic
        if (des) {
            if (des.length > 200) des = des.substr(0, 200)
            if (des.length > 1) emb.setDescription("**Channel Topic:** \n" + des)
        }
        emb.addField("**Name:**", channel, true)
            .addField("**ID:**", channel.id, true);

        emb.addField(`**Categorie:**`, channel.parentID ? ` <#${channel.parentID}>` : `Unkategorisiert`, true);

        emb.addField("**Type:**", channel.type, true)
            .setFooter("Created at: " + channel.createdAt.toUTCString().substr(0, 16))

        emb.addField("**Position:**", channel.position + 1, true)
            .addField("**NSFW:**", channel.nsfw ? emotes.true : emotes.false, true)
        msg.channel.send(emb).catch();
    }
};