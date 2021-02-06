const { Message } = require('discord.js');
const { colors, rawEmb } = require('../utilities');

module.exports = {
    name: 'servericon',
    syntax: 'servericon',
    args: false,
    type: 'Info',
    description: 'Shows u a the servers picture OvO',
    commands: ['servericon', 'sicon', 'icon'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb()

        emb.setTitle("Icon from " + msg.guild.name)
            .setImage(msg.guild.iconURL())
            .setDescription(`Not loading? Download [__here__](${msg.guild.iconURL()})`)
            .setTimestamp()
            .setFooter(msg.author.tag)
        if (!msg.guild.iconURL()) emb.setDescription('This Server hasn´t an icon')
        msg.channel.send(emb).catch();
    }
};