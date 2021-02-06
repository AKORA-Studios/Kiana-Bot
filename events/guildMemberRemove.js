const client = require('../index')
const { welcomeImage, goodbyeImage } = require('./images')

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

    channel.send(await goodbyeImage(member))

});