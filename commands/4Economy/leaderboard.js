const { Message } = require('discord.js');
const { deatiledEmb, calcLevel, colors } = require('../utilities');

module.exports = {
    name: 'leaderboard',
    syntax: 'leaderboard [coins | level]',
    args: false,
    type: 'Economy',
    description: 'Shows the ranking by `coins` or `level`',
    commands: ['leaderboard', 'lb', 'top'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setColor(colors.economy)

        if (args[0] == "coins") {
            emb.setTitle(".•☆ Leaderbboard coins ☆•.")

            var users = msg.client.database.UserConfigCache.array();
            users = users
                .sort((a, b) => (parseInt(b.wallet) + parseInt(b.bank)) - (parseInt(a.wallet) + parseInt(a.bank)))
                .filter((v, i, arr) => i < 10)
                .map((user, index) => {
                    let u = msg.client.users.resolve(user.userID);
                    if (!u) {
                        entry = {
                            a: `\`${index + 1}. | Not Found\``,
                            b: `\`${(parseInt(user.wallet) + parseInt(user.bank)).toLocaleString()}\` ¥`
                        }
                    } else {
                        entry = {
                            a: `\`${index + 1}. | ${(u.tag).replace('`', '')}\``,
                            b: `\`${(parseInt(user.wallet) + parseInt(user.bank)).toLocaleString()}\` ¥`
                        }
                    }
                    return entry
                });

        } else {
            emb.setTitle(".•☆ Leaderbboard xp ☆•.");
            var users = msg.client.database.UserConfigCache.array();
            users = users
                .sort((a, b) => b.xp - a.xp)
                .filter((v, i, arr) => i < 10)
                .map((user, index) => {
                    let u = msg.client.users.resolve(user.userID);
                    if (!u) {
                        entry = {
                            a: `\`${index + 1}. | Not Found\``,
                            b: `Lvl. **${calcLevel(user.xp)}** - \`[${(user.xp).toLocaleString()}]\``
                        }
                    } else {
                        entry = {
                            a: `\`${index + 1}. | ${(u.tag).replace('`', '')}\``,
                            b: `Lvl. **${calcLevel(user.xp)}** \`[${(user.xp).toLocaleString()}]\``
                        }
                    }
                    return entry
                });
        }

        users.forEach(entry => {
            emb.addField(entry.a, entry.b)
        });

        return msg.channel.send(emb).catch()
    }
};