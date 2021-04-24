const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

module.exports = {
    name: 'Roelcolor',
    syntax: 'rolecolor <@role> <color>',
    args: true,
    type: 'Moderation',
    description: 'Change the color of a role of',
    perm: ['MANAGE_ROLES'],
    needed: ['MANAGE_ROLES'],
    commands: ['rolecolor', 'rcolor'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let role = msg.mentions.roles.first();
        let emb = rawEmb(msg)

        if (!role) return msg.channel.send(emb.setColor(colors.error).setDescription("Syntax error: No role specified")).catch()
        if (!args[1]) return msg.channel.send(emb.setColor(colors.error).setDescription("Syntax error: No color specified")).catch()

        if (args[1].startsWith('#')) {
            var color = args[1].slice(1)
        } else { var color = args[1]; }

        let x = msg.guild.members.cache.find(m => m.id == msg.client.user.id).roles.highest;
        let y = x.comparePositionTo(role);
        if (y < 1) {
            return msg.channel.send(emb.setTitle('The role is unfortunately more powerful than me')).catch()
        }

        role.setColor(color).catch();

        emb.setTitle(`Roll color changed`)
            .addField("**Role:** ", role)
            .addField("**Color:** ", color)
        msg.channel.send(emb).catch()
    }
};