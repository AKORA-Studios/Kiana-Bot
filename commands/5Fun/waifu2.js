const { Message } = require('discord.js');
const { rawEmb, colors, deatiledEmb } = require('../utilities');
const bent = require('bent');

module.exports = {
    name: 'waifu2',
    syntax: 'waifu2',
    args: false,
    type: 'Fun',

    description: 'Shows some Pictures or Gifs',
    DmChannel: true,
    commands: ['waifu2'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setTitle(' ﾟ+*:ꔫ:*﹤　waifu2　﹥*:ꔫ:*+ﾟ')
        const getString = bent('string');
        const m = await msg.channel.send(emb.setTitle('Searching . . .').setFooter('Nekoslife Api').setTimestamp())
        try {
            var res = await getString("https://nekos.life/api/v2/img/waifu");
            try {
                var json = JSON.parse(res);
                emb.setURL(json.url)
                    .setImage(json.url)
                    .setTitle("waifu " + JSON.parse((await getString('https://nekos.life/api/v2/cat'))).cat)
                await m.edit(emb)
            } catch (err) {
                m.edit(emb.setColor(colors.error).setTitle("There was an error extracting the Neko :0"));
            }
        } catch (err) {
            m.edit(emb.setColor(colors.error).setTitle("There was an error catching a Neko >~>"));
        }
    }
};