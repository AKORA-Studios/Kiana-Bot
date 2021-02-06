const { Message } = require('discord.js');
const client = require('../..');
const { user } = require('../..');
const { rawEmb, colors } = require('../utilities');

module.exports = {
    name: 'clear',
    syntax: 'clear <@user> <warning>',
    args: true,
    type: 'Moderation',
    description: 'Removes warnings from a user',
    perm: ['MANAGE_MESSAGES'],
    commands: ['clear', 'pardon'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg);
        let victim = msg.mentions.members.first();

        if (!victim) return msg.channel.send(emb.setColor(colors.error).setDescription('No user specified')).catch()
        if (victim.user.bot) return msg.channel.send(emb.setColor(colors.error).setDescription("**Bots couldn´t recieve warnings**")).catch()


        if (!args[0]) return msg.channel.send(emb.setColor(colors.error).setDescription('**Syntax Error, please specify which warn should be removed. Use: 1, 2, 3, all**')).catch()


        let posibleArray = ['1', '2', '3', 'all']
        if (!posibleArray.includes(args[1])) return msg.channel.send(emb.setColor(colors.error).setDescription('**Syntax Error, please specify which warn should be removed. Use: 1, 2, 3, all**')).catch()

        V = args[1]
        if (args[1] == "all") V = "4"

        var user_config = await msg.client.database.MemberConfigCache.getConfig(victim.id, msg.guild.id);

        if (!user_config.warn1 && !user_config.warn2 && !user_config.warn3) {
            return msg.channel.send(emb.setColor(colors.error).setDescription('The user has no warnings')).catch()
        }

        if (!user_config.warn1 && V == "1") {
            return msg.channel.send(emb.setColor(colors.error).setDescription('The user has no 1. warning')).catch()

        } else if (!user_config.warn2 && V == "2") {
            return msg.channel.send(emb.setColor(colors.error).setDescription('The user has no 2. warning')).catch()

        } else if (!user_config.warn3 && V == "3") {
            return msg.channel.send(emb.setColor(colors.error).setDescription('The user has no 3. warning')).catch()
        }

        var obj = { target: victim.user.tag, mod: msg.author.tag, num: V, warn: '', guild: msg.guild }
        switch (V) {
            case ("1"):
                {
                    obj.warn = user_config.warn1
                    msg.client.emit('warnRemove', obj)

                    if (user_config.warn2) { user_config.warn1 = user_config.warn2; } else { user_config.warn1 = undefined }
                    if (user_config.warn3) { user_config.warn2 = user_config.warn3; } else { user_config.warn2 = undefined }

                    return await user_config.save().then(() => msg.channel.send(emb.setTitle('Warning no.1 has been removed')).catch());
                    break
                }
            case ("2"):
                {
                    obj.warn = user_config.warn2
                    msg.client.emit('warnRemove', obj)
                    if (user_config.warn3) { user_config.warn2 = user_config.warn3; } else { user_config.warn2 = undefined }
                    user_config.warn2 = undefined;
                    return await user_config.save().then(() => msg.channel.send(emb.setTitle('Warning no.2 has been removed')).catch());
                    break
                }
            case ("3"):
                {
                    obj.warn = user_config.warn3
                    msg.client.emit('warnRemove', obj)
                    user_config.warn3 = undefined
                    return await user_config.save().then(() => msg.channel.send(emb.setTitle('Warning no.3 has been removed')).catch());
                    break
                }
            case ("4"):
                {
                    let texti = ''
                    if (user_config.warn1) texti += user_config.warn1 + '\n'
                    if (user_config.warn2) texti += user_config.warn2 + '\n'
                    if (user_config.warn3) texti += user_config.warn3 + '\n'
                    if (texti.length > 1999) texti = texti.substr(0, 1999)
                    obj.warn = texti
                    obj.num = 'all'

                    msg.client.emit('warnRemove', obj)
                    user_config.warn1 = undefined
                    user_config.warn2 = undefined
                    user_config.warn3 = undefined
                    return await user_config.save().then(() => msg.channel.send(emb.setTitle('All warnings have been removed')).catch());
                }
        }
    }
};