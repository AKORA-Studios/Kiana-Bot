const { Message } = require('discord.js');
const { colors, rawEmb } = require('../utilities');

module.exports = {
    name: 'avatar',
    syntax: 'avatar',
    args: false,
    type: 'Info',
    beschreibung: 'Schickt dir den Avatar eines Nutzers OvO',
    description: 'Shows u a users profilepicture OvO',
    DmChannel: true,
    commands: ['avatar'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        let user;

        if (msg.mentions.users.first()) {
            user = msg.mentions.users.first();
        } else if (!isNaN(args[0])) {
            user = await msg.client.users.fetch(args[0]);
        } else if (!user) { user = msg.author; }

        let avatar = user.avatarURL();
        emb.setTitle(user.username + '´s Avatar')
            .setImage(avatar).setURL(avatar)
            .setFooter(msg.author.tag)
            .setTimestamp()
            .setDescription(`Not loading? Download [__here__](${avatar})`)
        msg.channel.send(emb).catch();
    }
};