const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

module.exports = {
    name: 'bug',
    syntax: 'bug <Value>',
    args: true,
    type: 'Contact',
    description: 'report bugs to my devs',
    cooldown: 10000,
    commands: ['bug', 'suggest', 'message', 'bug'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg);
        let channel = msg.channel;

        text = args.join(' ');

        channel.send(emb.setTitle("Your error is reported"))

        dev_id = "586905336850677760";
        dev = msg.client.users.resolve(dev_id)
        text = args.join(' ');

        emb.setDescription(text)
            .setTitle("Fehler gemeldet von " + msg.author.tag)
            .setAuthor(msg.author.id, msg.author.avatarURL())
            .setFooter(msg.guild.name + ` [${msg.guild.id}]`)
        return dev.send(emb).catch()
    }
};