const client = require('../index')
const { colors, rawEmb, calcLevel, emotes } = require("../commands/utilities")

//==================================================================================================================================================
//Guild Delete
//==================================================================================================================================================
client.on("guildDelete", async guild => {
    console.log(`Removed Guild: ${guild.name} [${guild.id}]`)
    let report_channel = client.report_channel
    let emb = rawEmb().setTitle(`[${client.guilds.cache.size}] Removed Guild`).setColor(colors.error)
        .setDescription(`\`${guild.memberCount}\`: **${guild.name}** [${guild.id}]`)
        .setTimestamp()
    report_channel.send(emb).catch()
})

//==================================================================================================================================================
//Guild Create
//==================================================================================================================================================
client.on("guildCreate", async guild => {
    let report_channel = client.report_channel
    console.log(`New Guid: ${guild.name} [${guild.id}] - Size:${guild.memberCount}`)

    let emb = rawEmb().setTitle(`${client.guilds.cache.size} - ${guild.name}`).setColor(colors.success)
        .setDescription(`\`${guild.memberCount}\`\n**ID:** [${guild.id}]\n <@${guild.ownerID}>`)

        .setTimestamp()
    report_channel.send(emb).catch()

    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
        if (channel.type == "text" && defaultChannel == "") {
            if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                defaultChannel = channel;
            }
        }
    })

    emb.setAuthor(guild.name, guild.iconURL() ? guild.iconURL() : client.user.avatarURL())
        .setTimestamp()
        .setImage(client.config.image)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setDescription(`Thanks for adding me to your server UwU\nType **+help** to see my Commands\nUse **+bug** to report errors`)
        .addField("\u200B", `Need help? Visit my [support server](${client.config.supportinvite})^^`)
    defaultChannel.send(emb).catch()
})