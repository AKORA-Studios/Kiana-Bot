const client = require('../index')
const { colors, rawEmb, emotes } = require("../commands/utilities");

function modemb(titel) {
    e = rawEmb()
        .setTitle(titel)
        .setTimestamp()
    return e
}

async function getGuildLog(guild, event) {
    const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: event,
    });
    return fetchedLogs.entries.first();
}

client.on('botPurge', async obj => {
    const { channel, mod, guild, num, silent } = obj
    var conf = await client.database.GuildSettingsCache.getConfig(guild.id);
    if (!conf.logChannel) return

    let ch = guild.channels.resolve(conf.logChannel)
    let emb = modemb("Purged with Shinu").setColor(colors.error)
    emb.addField('Channel', `${channel.name} [${channel.id}]`, true)
        .addField('Moderator', mod, true)
        .setFooter('Count: ' + num)
    if (silent) emb.setDescription('Purged silent')
    ch.send(emb).catch()
})


client.on('warnAdd', async obj => {
    const { warn, target, mod, guild, num } = obj
    var conf = await client.database.GuildSettingsCache.getConfig(guild.id);
    if (!conf.logChannel) return

    let ch = guild.channels.resolve(conf.logChannel)
    let emb = modemb("Warm Add").setColor(colors.error)
    emb.addField('Target', target, true)
        .addField('Moderator', mod, true)
        .setDescription(warn)
        .setFooter('Warn Nr. ' + num)
    ch.send(emb).catch()
})

client.on('warnRemove', async obj => {
    const { warn, target, mod, guild, num } = obj
    var conf = await client.database.GuildSettingsCache.getConfig(guild.id);
    if (!conf.logChannel) return

    let ch = guild.channels.resolve(conf.logChannel)
    let emb = modemb("Warm Removed").setColor(colors.success)
    emb.addField('Target', target, true)
        .addField('Moderator', mod, true)
        .setDescription(warn)
        .setFooter('Warn Nr. ' + num)
    ch.send(emb).catch()
})

client.on('messageDelete', async message => {
    if (!message.guild) return;
    let emb = modemb("Message Deleted").setColor(colors.error)

    client.snipedMessages.set(message.channel.id, {
        content: message.content,
        author: message.author,
        member: message.member,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })

    var conf = await client.database.GuildSettingsCache.getConfig(message.guild.id);
    if (!conf.logChannel) return

    let ch = message.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(message.guild, 'MESSAGE_DELETE')

        let executor;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }

        emb.addField("**User:**", message.author.tag, true)
            .addField("**Channel:**", message.channel.name, true)
            .addField("**Moderator:**", executor, true)
            .setDescription(message.content)

        if (message.embeds[0]) {
            let atach_embed = message.embeds[0]
            emb.addField("**Attachments:**", `Embed`)
            if (atach_embed.description) {
                if (atach_embed.description.length > 2000) atach_embed.description = atach_embed.description.substr(2000)
                if (atach_embed.description) emb.setDescription("Description \n" + atach_embed.description)
            }
        }
        if (message.attachments) {
            for (var key of message.attachments.keys()) {
                let atach = message.attachments.get(key)
                emb.setDescription("**Attachments:**", `${atach.name} [${atach.id}]`)
            }
        }
        ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }

});

client.on('messageUpdate', async (oldmsg, newmsg) => {
    if (!oldmsg.guild) return;
    if (oldmsg.author.bot) return;
    if (oldmsg.content == newmsg.content) return;

    let size = (oldmsg.content.length) + (newmsg.content.length)
    let emb = modemb("Message Edited")
    var conf = await client.database.GuildSettingsCache.getConfig(oldmsg.guild.id);

    if (!conf.logChannel) return
    let ch = oldmsg.guild.channels.resolve(conf.logChannel)
    if (ch) {
        if (size < 3996) {
            emb.addField("**User:**", oldmsg.author.tag, true)
                .addField("**Channel:**", oldmsg.channel.name, true)
                .setDescription(oldmsg.content + "\n\n" + newmsg.content)
            return ch.send(emb).catch()
        } else if (size > 3996) {
            emb.addField("**User:**", oldmsg.author.tag, true)
                .addField("**Channel:**", oldmsg.channel.name, true)
                .setDescription(oldmsg.content)
                .setTitle("Message Edited (1/2)")
            ch.send(emb).catch()

            emb.setDescription(newmsg.content)
                .setTitle("Message Edited (2/2)")
            return ch.send(emb).catch()
        }
    } else {
        conf.logChannel = undefined
        await conf.save()
    }

});

client.on('emojiCreate', async emoji => {
    let emb = modemb("Emoji Created").setColor(colors.success)
    var conf = await client.database.GuildSettingsCache.getConfig(emoji.guild.id);
    if (!conf.logChannel) return

    let ch = emoji.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(emoji.guild, 'EMOJI_CREATE')
        let executor;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }

        emb.addField("**Emoji:**", emoji.name, true)
            .addField("**ID:**", emoji.id, true)
            .addField("**Moderator:**", executor, true)
            .setImage(emoji.url)

        return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }

});

client.on('emojiDelete', async emoji => {
    let emb = modemb("Emoji Deleted").setColor(colors.error)
    var conf = await client.database.GuildSettingsCache.getConfig(emoji.guild.id);
    if (!conf.logChannel) return

    let ch = emoji.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(emoji.guild, 'EMOJI_DELETE')
        let executor;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }

        emb.addField("**Emoji:**", emoji.name, true)
            .addField("**ID:**", emoji.id, true)
            .addField("**Moderator:**", executor, true)
            .setImage(emoji.url)

        return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});


client.on('channelCreate', async channel => {
    if (channel.type == 'dm') return
    let emb = modemb("Channel Created").setColor(colors.success)
    var conf = await client.database.GuildSettingsCache.getConfig(channel.guild.id);
    if (!conf.logChannel) return

    let ch = channel.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(channel.guild, 'CHANNEL_CREATE')
        let executor;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }

        emb.addField("**Name:**", channel.name, true)
            .addField("**ID:**", channel.id, true)
            .addField("**Moderator:**", executor, true)

        return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }

});
client.on('channelDelete', async channel => {
    let emb = modemb("Channel Deleted").setColor(colors.error)
    var conf = await client.database.GuildSettingsCache.getConfig(channel.guild.id);
    if (!conf.logChannel) return

    let ch = channel.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(channel.guild, 'CHANNEL_DELETE')
        let executor;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }

        emb.addField("**Name:**", channel.name, true)
            .addField("**ID:**", channel.id, true)
            .addField("**Moderator:**", executor, true)

        return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});


client.on('roleCreate', async role => {
    let emb = modemb("Role Created").setColor(colors.success)
    var conf = await client.database.GuildSettingsCache.getConfig(role.guild.id);
    if (!conf.logChannel) return

    let ch = role.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(role.guild, 'ROLE_CREATE')
        let executor;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }

        emb.addField("**Name:**", role.name, true)
            .addField(role.id, `<@&${role.id}>`, true)
            .addField("**Moderator:**", executor, true)

        return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});


client.on('roleDelete', async role => {
    let emb = modemb("Role Deleted").setColor(colors.error)
    var conf = await client.database.GuildSettingsCache.getConfig(role.guild.id);
    if (!conf.logChannel) return

    let ch = role.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(role.guild, 'ROLE_DELETE')
        let executor;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }

        emb.addField("**Name:**", role.name, true)
            .addField("ID", role.id, true)
            .addField("**Moderator:**", executor, true)

        return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});

let invitecreate;
client.on('inviteCreate', async invite => {
    if (invite.code == invitecreate) return
    invitecreate = invite.code
    let emb = modemb("Invite Created").setColor(colors.success)
    var conf = await client.database.GuildSettingsCache.getConfig(invite.guild.id);
    if (!conf.logChannel) return

    let ch = invite.guild.channels.resolve(conf.logChannel)
    if (ch) {
        emb.addField("**Inviter:**", invite.inviter.tag, true)
            .addField("Code", invite.code, true)
            .addField("channel", invite.channel.name, true)

            .addField("MaxUses", invite.maxUses, true)
            .addField("Expires at", invite.expiresAt.toLocaleString(), true)
            .addField("Temporary", invite.temporary ? emotes.true : emotes.false, true)

        return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});

let invitedelte;
client.on('inviteDelete', async invite => {
    if (invite.code == invitedelte) return
    invitedelte = invite.code

    let emb = modemb("Invite Deleted").setColor(colors.error)
    var conf = await client.database.GuildSettingsCache.getConfig(invite.guild.id);
    if (!conf.logChannel) return

    let ch = invite.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(invite.guild, 'INVITE_DELETE')
        let executor;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }

        emb.addField("**code:**", invite.code, true)
            .addField("uses", invite.uses, true)
            .addField("**Moderator:**", executor, true)

        return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});

let bannedadd;
client.on('guildBanAdd', async (guild, user) => {
    if (user.id == bannedadd) return
    bannedadd = user.id

    let emb = modemb("User Banned").setColor(colors.error)
    var conf = await client.database.GuildSettingsCache.getConfig(guild.id);
    if (!conf.logChannel) return

    let ch = guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(guild, 'MEMBER_BAN_ADD')
        let executor;
        let reason;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }
        if (!deletionLog) { reason = "No Reason specified" } else { reason = deletionLog.reason; }

        emb.addField("**User:**", user.tag, true)
            .addField("**Reason:**", reason, true)
            .addField("**Moderator:**", executor, true)

        return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});



client.on('guildBanRemove', async (guild, user) => {
    let emb = modemb("User Unbanned").setColor(colors.success)
    var conf = await client.database.GuildSettingsCache.getConfig(guild.id);
    if (!conf.logChannel) return

    let ch = guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(guild, 'MEMBER_BAN_REMOVE')
        let executor;
        let reason;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }
        if (!deletionLog) { reason = "No Reason specified" } else { reason = deletionLog.reason; }

        emb.addField("**User:**", user.tag, true)
            .addField("**Reason:**", reason, true)
            .addField("**Moderator:**", executor, true)

        return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});

client.on('guildMemberUpdate', async (oldmember, newmemeber) => {
    if (oldmember == newmemeber) return
    if (oldmember.nickname == newmemeber.nickname && oldmember.roles.cache.size == newmemeber.roles.cache.size) return
    if (newmemeber.id == client.user.id && !newmemeber.voice.deaf) { newmemeber.voice.setDeaf(true) }

    let emb = modemb("Member Updated").setColor(colors.warning)
    var conf = await client.database.GuildSettingsCache.getConfig(oldmember.guild.id);
    if (!conf.logChannel) return

    let ch = oldmember.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(oldmember.guild, 'MEMBER_UPDATE')
        let executor;
        let reason;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }
        if (!deletionLog) { reason = "No Reason specified" } else { reason = deletionLog.reason; }

        emb.addField("**User:**", oldmember.user.tag, true)
            .addField("**Reason:**", reason, true)
            .addField("**Moderator:**", executor, true)

        if (newmemeber.nickname !== oldmember.nickname) {
            let changednick = `**Nickname changed**\n\n \`${oldmember.nickname}\` **→** \`${newmemeber.nickname}\``
            emb.setDescription(changednick)
        }

        let re = 0;
        let ad = 0;
        let added_roles = []
        let removed_roles = []

        if (oldmember.roles.cache.size > newmemeber.roles.cache.size) {
            oldmember.roles.cache.forEach(role => {
                if (!newmemeber.roles.cache.has(role.id)) {
                    re += 1
                    removed_roles.push("<@&" + role.id + ">")
                }
            });
        } else if (oldmember.roles.cache.size < newmemeber.roles.cache.size) {
            newmemeber.roles.cache.forEach(role => {
                if (!oldmember.roles.cache.has(role.id)) {
                    ad += 1
                    added_roles.push("<@&" + role.id + ">")
                }
            });
        }

        removed_roles = removed_roles.join(", ")
        if (removed_roles.length > 1024) removed_roles = removed_roles.substr(1016) + " . . ."
        if (re >= 1) {
            emb.addField(`**Removed Roles** [${re}]`, removed_roles)
        }

        added_roles = added_roles.join(", ")
        if (added_roles.length > 1024) added_roles = added_roles.substr(1016) + " . . ."
        if (ad >= 1) {
            emb.addField(`**Added Roles** [${ad}]`, added_roles)
        }

        if (re <= 1 || ad >= 1 || oldmember.nickname !== newmemeber.nickname) return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});

let rolechanged;
client.on('roleUpdate', async (oldrole, newrole) => {
    if (oldrole == newrole) return
    if (oldrole == rolechanged) return
    rolechanged = newrole

    let emb = modemb("Role Updated").setColor(colors.warning)
    var conf = await client.database.GuildSettingsCache.getConfig(oldrole.guild.id);
    if (!conf.logChannel) return

    let ch = oldrole.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(oldrole.guild, 'ROLE_UPDATE')
        let executor;
        let reason;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }
        if (!deletionLog) { reason = "No Reason specified" } else { reason = deletionLog.reason; }

        emb.addField("**Role:**", `${newrole} [${newrole.id}]`, true)
            .addField("**Reason:**", reason, true)
            .addField("**Moderator:**", executor, true)

        if (oldrole.name !== newrole.name) emb.addField("**Name changed**", `${oldrole.name} **→** ${newrole.name}`)
        if (oldrole.color !== newrole.color) emb.addField("**Color changed**", `#${oldrole.color} **→** #${newrole.color}`)

        if (oldrole.mentionable !== newrole.mentionable) emb.addField("**Mention changed**", `${oldrole.mentionable ? emotes.true : emotes.false} **→** ${newrole.mentionable ? emotes.true : emotes.false}`)
        if (oldrole.permissions.has('ADMINISTRATOR') !== newrole.permissions.has('ADMINISTRATOR')) emb.addField("**Permission changed**", `${oldrole.permissions.has('ADMINISTRATOR') ? emotes.true : emotes.false} **→** ${newrole.permissions.has('ADMINISTRATOR') ? emotes.true : emotes.false}`)
        if (oldrole.hoist !== newrole.hoist) emb.addField("**Hoist changed**", `${oldrole.hoist ? emotes.true : emotes.false} **→** ${newrole.hoist ? emotes.true : emotes.false}`)

        if (emb.fields.length > 3) return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});

let channelchange;
client.on('channelUpdate', async (oldchannel, newchannel) => {
    if (oldchannel == newchannel) return
    if (oldchannel == channelchange) return
    channelchange = newchannel
    let emb = modemb("Channel Updated").setColor(colors.warning)
    var conf = await client.database.GuildSettingsCache.getConfig(oldchannel.guild.id);
    if (!conf.logChannel) return

    let ch = oldchannel.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(oldchannel.guild, 'CHANNEL_UPDATE')
        let executor;
        let reason;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }
        if (!deletionLog) { reason = "No Reason specified" } else { reason = deletionLog.reason; }

        emb.addField("**Channel:**", `${newchannel} [${newchannel.id}]`, true)
            .addField("**Reason:**", reason, true)
            .addField("**Moderator:**", executor, true)

        if (oldchannel.name !== newchannel.name) emb.addField("**Name changed**", `${oldchannel.name} **→** ${newchannel.name}`)
        if (oldchannel.parent !== newchannel.parent) emb.addField("**Parent changed**", `${oldchannel.parent} **→** ${newchannel.parent}`)

        if (oldchannel.rateLimitPerUser !== newchannel.rateLimitPerUser) emb.addField("**Ratelimit changed**", `${oldchannel.rateLimitPerUser} **→** ${newchannel.rateLimitPerUser}`)
        if (oldchannel.nsfw !== newchannel.nsfw) emb.addField("**NSFW changed**", `${oldchannel.nsfw ? emotes.true : emotes.false} **→** ${newchannel.nsfw ? emotes.true : emotes.false}`)
        if (oldchannel.topic !== newchannel.topic) {
            let neu = newchannel.topic
            let old = oldchannel.topic
            if (old.length > 980) old = old.substr(0, 980)
            if (neu.length > 980) neu = neu.substr(0, 980)
            emb.setDescription(`**Topic changed** ${old} \n**→**\n ${neu}`)
        }
        if (emb.fields.length > 3) return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});


let guildchange;
client.on('guildUpdate', async (oldguild, newguild) => {
    if (oldguild == newguild) return
    if (oldguild == guildchange) return
    guildchange = newguild

    let emb = modemb("Server Updated ").setColor(colors.warning)
    var conf = await client.database.GuildSettingsCache.getConfig(newguild.id);
    if (!conf.logChannel) return

    let ch = newguild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(newguild.guild, 'GUILD_UPDATE')
        let executor;
        let reason;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }
        if (!deletionLog) { reason = "No Reason specified" } else { reason = deletionLog.reason; }

        emb.addField("**Reason:**", reason, true)
            .addField("**Moderator:**", executor, true)

        if (oldguild.name !== newguild.name) emb.addField("**Name changed**", `${oldguild.name} **→** ${newguild.name}`)
        if (oldguild.owner !== newguild.owner) emb.addField("**Owner changed**", `${oldguild.owner.user.tag} **→** ${newguild.owner.user.tag}`)
        if (oldguild.verificationLevel !== newguild.verificationLevel) emb.addField("**Verification changed**", `${oldguild.verificationLevel} **→** ${newguild.verificationLevel}`)

        if (oldguild.region !== newguild.region) emb.addField("**region changed**", `${oldguild.region} **→** ${newguild.region}`)
        if (emb.fields.length > 3) return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});

let emojichange;
client.on('emojiUpdate', async (oldemoji, newemoji) => {
    if (oldemoji == newemoji) return
    if (oldemoji == emojichange) return
    emojichange = newemoji

    let emb = modemb("Emoji Updated ").setColor(colors.warning)
    var conf = await client.database.GuildSettingsCache.getConfig(oldemoji.guild.id);
    if (!conf.logChannel) return

    let ch = oldemoji.guild.channels.resolve(conf.logChannel)
    if (ch) {
        const deletionLog = await getGuildLog(oldemoji.guild, 'EMOJI_UPDATE')
        let executor;
        let reason;
        if (!deletionLog) { executor = "Not Found" } else { executor = deletionLog.executor.tag; }
        if (!deletionLog) { reason = "No Reason specified" } else { reason = deletionLog.reason; }

        emb.addField("**Name:**", `${newemoji.name} [${newemoji.id}]`)
            .addField("**Reason:**", reason, true)
            .addField("**Moderator:**", executor, true)

        if (oldemoji.name !== newemoji.name) emb.addField("**Name changed**", `${oldemoji.name} **→** ${newemoji.name}`)
        if (emb.fields.length > 3) return ch.send(emb).catch()
    } else {
        conf.logChannel = undefined
        await conf.save()
    }
});