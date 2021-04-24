const client = require('../index')
const { goodbyeImage } = require('discord-welcome-card');
const { MessageAttachment } = require("discord.js");

client.on("guildMemberRemove", async member => {
    var settings = await client.database.GuildSettingsCache.getConfig(member.guild.id);
    let channel;

    if (settings.goodbyeChannel) {
        channel = member.guild.channels.cache.get(settings.goodbyeChannel)

        if (!channel) {
            settings.goodbyeChannel = undefined;
            await settings.save()
        }
    }
    if (!channel) return
    const image = await goodbyeImage(member);
    channel.send(new MessageAttachment(image, 'goodbye.png'))
});