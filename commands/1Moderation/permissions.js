const { Message } = require('discord.js');
const { rawEmb, emotes } = require('../utilities');

module.exports = {
    name: 'Permissions',
    syntax: 'permissions',
    args: false,
    type: 'Moderation',
    description: 'Shows all permission which I have on your server',
    commands: ['permissions', 'perm'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb(msg).setTitle("Permissions")

        var me = msg.guild.me,
            all = msg.guild.owner.permissions.toArray(),
            text = "",
            tile_size = isNaN(Number(args[0])) ? 5 : Number(args[0]),
            tile_count = all.length % tile_size;

        if (tile_count === 0) {
            tile_count = all.length / tile_size
        } else {
            tile_count = Math.floor(all.length / tile_size) + 1;
        }

        for (let x = 0; x < tile_count; x++) {
            for (let y = 0; y < tile_size; y++) {
                let pos = (x * tile_size) + y;
                if (pos > all.length - 1) continue;
                let perm = all[pos];

                if (me.permissions.has(perm)) {
                    text += emotes.true + "`" + perm.toString() + "`";
                } else {
                    text += emotes.false + "`" + perm.toString() + "`";
                }
                text += "\n"; //New Line
            }
            emb.addField('\u200b', text, true);
            text = ""; //Reset
        }

        emb.setDescription(text);
        msg.channel.send(emb).catch();
    }
};