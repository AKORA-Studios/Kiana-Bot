const { Message, TextChannel } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

module.exports = {
    name: 'spurge',
    syntax: 'spurge <amount>',
    args: true,
    type: 'Moderation',
    description: 'Deletes silent messages that are not older than 2 weeks UwU. There wouldn´t come any success message',
    perm: ['MANAGE_MESSAGES'],
    needed: ['MANAGE_MESSAGES'],
    commands: ['spurge', 'silentpurge'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        let anzahl = args[0]

        msg.delete()
        anzahl = Number(anzahl)

        var fetched = await BigFetch(msg.channel, anzahl);

        BigBulkDelete(fetched, true)

        var obj = { num: anzahl, guild: msg.guild, mod: msg.author.tag, channel: msg.channel, silent: true }
        msg.client.emit('botPurge', obj)

    }
};

/**
 * @param {TextChannel} channel 
 * @param {number} limit 
 */
async function BigFetch(channel, limit) {
    let last_id = 0;
    let messages = new Array();
    let fetched = new Array();
    let options = {};

    for (limit; limit > 0; limit -= 100) {
        options.limit = limit > 100 ? 100 : limit;
        if (last_id != 0) {
            options.before = last_id;
        } else {
            options = { limit: options.limit };
        }

        messages = (await channel.messages.fetch(options)).array();

        for (let m of messages) {
            fetched.push(m)
        }

        if (messages.length < 1) continue;
        last_id = messages[messages.length - 1].id;
    }
    return fetched;
}

/**
 * @param {Message[]} messages 
 */
async function BigBulkDelete(messages) {
    let last_id = 0;
    if (messages.length < 1) return 0;
    let channel = messages[0].channel;
    let deleted = 0;
    let limit;

    while (messages.length > 1) {
        if (messages.length > 100) {
            limit = 100;
        } else {
            limit = messages.length;
        }
        let size = (await channel.bulkDelete(messages.splice(0, limit), true)).size;
        if (size != undefined) deleted += size;

        if (messages.length < 1) continue;
        last_id = messages[messages.length - 1].id;
    }

    return deleted;
}