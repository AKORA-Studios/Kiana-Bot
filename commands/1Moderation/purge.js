const { Message, TextChannel, MessageEmbed } = require('discord.js');
const { rawEmb, colors } = require('../utilities');

module.exports = {
    name: 'purge',
    syntax: 'purge <amount>',
    args: true,
    type: 'Moderation',
    description: 'Deletes messages that are not older than 2 weeks UwU',
    perm: ['MANAGE_MESSAGES'],
    needed: ['MANAGE_MESSAGES'],
    commands: ['purge', 'delete'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg)
        let anzahl = args[0]

        if (isNaN(anzahl)) return msg.channel.send(emb.setColor(colors.error).setDescription('**Syntax error:** This isn´t a number')).catch()
        if (!anzahl || anzahl < 1) return msg.channel.send(emb.setColor(colors.error).setDescription("**Syntax error:** The amounbt has to be bigger than 1")).catch()

        anzahl = Number(anzahl)

        var fetched = await BigFetch(msg.channel, anzahl);
        if (search != null) fetched = fetched.filter(m => search.includes(m));

        BigBulkDelete(fetched, true).catch(error => {
            emb.setTitle(`Error`)
            msg.channel.send(emb.setDescription(error)).catch()
            throw error
        }).then((count) => {
            if (count > 0) { emb.setColor(colors.success) } else { emb.setColor(colors.error) }
            emb.setDescription(`**${count}** Messages deleted`)

            var obj = { num: count, guild: msg.guild, mod: msg.author.tag, channel: msg.channel, silent: false }
            msg.client.emit('botPurge', obj)

            emb.setFooter(`deleted out of them:  ${count}`)
            msg.channel.send(emb).catch()
        });

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