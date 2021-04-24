const client = require('../index')
const { welcomeImage } = require('discord-welcome-card');
const { MessageAttachment } = require("discord.js");

let guildadd;
client.on("guildMemberAdd", async member => {
    if (guildadd == member.id) return
    guildadd = member.id
    var settings = await client.database.GuildSettingsCache.getConfig(member.guild.id);
    let channel;

    if (settings.welcomeChannel) {
        channel = member.guild.channels.cache.get(settings.welcomeChannel)
        if (!channel) {
            settings.welcomeChannel = undefined;
            await settings.save()
        }
    }

    if (!channel) return
    const image = await welcomeImage(member);
    channel.send(new MessageAttachment(image, 'welcome.png'))
});