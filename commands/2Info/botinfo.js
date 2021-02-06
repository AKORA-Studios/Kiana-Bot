const { Message } = require('discord.js');
const { rawEmb, getStats, getConfiguration, checkOwner } = require('../utilities');
const fs = require('fs')
const os = require('os');

module.exports = {
    name: 'botinfo',
    syntax: 'botinfo',
    args: false,
    type: 'Info',
    description: 'Shows you facts about me UwU',
    DmChannel: true,
    commands: ['botinfo', 'binfo', 'me', 'support'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb()
        let streams = msg.client.voice.connections.size

        const memory = process.memoryUsage(),
            size_gb = Math.round((os.totalmem() / 1024 / 1024 / 1024) * 10) / 10,
            used_mb = Math.round((memory.heapUsed / 1024 / 1024) * 10) / 10;

        let x = await (await msg.guild.members.fetch(msg.client.user.id)).roles.highest;
        let arr = [];

        for (let currentID of (getConfiguration()).owner) {
            arr.push((await msg.client.users.fetch(currentID)).tag);
        }

        let count = msg.client.guilds.cache.map(g => g.memberCount);
        let server = msg.client.guilds.cache.map(g => g.id);

        var total = 0;
        for (var i in count) { total += count[i]; }


        const stats = getStats();
        let devs = `⚙️ **Developer** \n \`\`\`❖ ${arr.join(" \n❖ ")}\`\`\`\n`
        devs += `📁 Files: \`${stats.files.toLocaleString()}\`\n`
        devs += `📑 Lines \`${stats.lines.toLocaleString()}\` \n`
        devs += `📚 \`Discord.js\`\n`
        devs += `:speaker: Voice Connections \`${streams}\` \n`

        emb.setDescription(devs)

        emb.addField("**Version:**", version, true)
        emb.addField("**Size:**", `${stats.size} Kb`, true)
            .addField("**Highest Role:**", x, true)

        emb.addField("🗃️ Memory:", `\` ${used_mb}MB / ${size_gb}GB\``, true)
            .addField("**User:**", total.toLocaleString(), true)
            .addField("**Server:**", server.length.toLocaleString(), true)

        msg.channel.send(emb).catch();
    }
};