const { Message } = require('discord.js');
const { rawEmb, colors, checkOwner } = require('../utilities');

module.exports = {
    name: 'serverlist',
    syntax: 'serverlist',
    args: false,
    type: 'Developer',
    description: 'Eine liste aller server auf denen ich bin UwU',
    description: 'A list of servers I´m in UwU',
    perm: ['DEVELOPER'],
    cooldown: 10,
    commands: ['serverlist', 'slist'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)

        let names = msg.client.guilds.cache.map(g => g.name);
        let ids = msg.client.guilds.cache.map(g => g.id);
        let count = msg.client.guilds.cache.map(g => g.memberCount);

        let joinedAt = msg.client.guilds.cache.map(g => g.joinedAt.toLocaleDateString("de-DE"));
        for (let i = 0; i < names.length; i++) {
            emb.addField(`**[${count[i]}] ${names[i]}**`, `\`${ids[i]}\` [${joinedAt[i]}]\n\n`)
        }

        emb.setFooter(`${msg.client.guilds.cache.size} Server mit ${(msg.client.users.cache.size).toLocaleString()} Usern`)
        msg.channel.send(emb);
    }
};