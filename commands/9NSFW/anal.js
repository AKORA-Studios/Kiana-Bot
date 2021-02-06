const { Message } = require('discord.js');
const { rawEmb, colors } = require('../utilities');
const bent = require('bent')

module.exports = {
    name: 'anal',
    syntax: 'anal',
    args: false,
    type: 'Nsfw',

    description: 'Shows some Pictures or Gifs',
    needed: ['NSFW', 'EMBED_LINKS'],
    DmChannel: true,
    cooldown: 3,
    commands: ['anal'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg) {
        let emb = rawEmb()
        const getString = bent('string');
        const m = await msg.channel.send(emb.setTitle('Searching . . .').setFooter(`NekoBot APi`))

        try {
            var res = await getString("https://nekobot.xyz/api/image?type=hanal");
            try {
                var json = JSON.parse(res);
                emb.setURL(json.message)
                    .setImage(json.message)
                    .setTitle("anal")
                await m.edit(emb)
            } catch (err) {
                m.edit(emb.setColor(colors.error).setTitle("There was an error extracting the Neko :0"));
            }
        } catch (err) {
            m.edit(emb.setColor(colors.error).setTitle("There was an error catching a Neko >~>"));
        }
    }
};