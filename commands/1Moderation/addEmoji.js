const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

RegExp.escape = function (string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
};

module.exports = {
    name: 'addEmoji',
    syntax: 'addemoji <emoji>',
    args: true,
    type: 'Moderation',
    description: 'Adds a custom emote to your server',
    needed: ['MANAGE_MESSAGES'],
    perm: ['MANAGE_MESSAGES', 'MANAGE_EMOJIS'],
    commands: ['addemoji', 'emoji'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        if (args[0].startsWith(':')) return msg.channel.send(emb.setColor(colors.error).setDescription("You can only use custom emotes")).catch()

        var emoji_regex = /<a?:[\w]*:([0-9]{18})>/g,
            animated_regex = /<a:[\w]*:([0-9]{18})>/g,
            id_regex = /([0-9]{18})/g,
            name_regex = /:[\w]*:/g;

        var emojis = msg.content.match(emoji_regex);

        if (emojis === null) return msg.channel.send(emb.setColor(colors.error).setDescription("No emoji found in your message")).catch()

        const emoji = emojis[0],
            ids = emoji.match(id_regex),
            names = emoji.match(name_regex),
            animated_match = emoji.match(animated_regex);

        let animated = false;
        if (animated_match !== null) animated = true;

        if (ids === null || names === null) return msg.channel.send(emb.setColor(colors.error).setDescription("Emoji not found ;-;")).catch()

        const id = ids[0],
            name = names[0].replace(/:/g, "");

        let link = "https://cdn.discordapp.com/emojis/" + id + "." + (animated ? "gif" : "png");

        let added = await msg.guild.emojis.create(link, args[1]).catch();
        if (!added) return msg.channel.send(emb.setColor(colors.error).setDescription("**Reached max server emotes qwq**")).catch()

        msg.channel.send(emb.setTitle("Emoji added").setURL(link).setImage(link)).catch();
    }
};