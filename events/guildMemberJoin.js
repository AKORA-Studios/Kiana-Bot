const client = require('../index')
const { colors, rawEmb, emotes } = require("../commands/utilities")
const { welcomeImage, goodbyeImage } = require('./images')

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
    channel.send(await welcomeImage(member))
});