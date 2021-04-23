const { Message } = require('discord.js');
const { deatiledEmb, getConfiguration } = require('../utilities');

module.exports = {
    name: 'invite',
    syntax: 'invite',
    args: false,
    type: 'Info',
    description: 'Gives you my Contact Data UwU',
    DmChannel: true,
    commands: ['invite', 'inv', 'link', 'support', 'vote'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let conf = getConfiguration()
        let link = "https://discord.com/api/oauth2/authorize?client_id=" + msg.client.user.id + "&permissions=8&scope=bot"

        let emb = deatiledEmb(msg)
            .setTitle("Invite Links")
            .addField("**Bot-Invite**", `[Klick](${link})`)
            .addField("**Support Server**", `[Klick](${conf.supportinvite})`)
            .setImage(msg.client.config.image)
            .addField("**Vote**", `[Klick](${conf.vote})`)
        msg.channel.send(emb).catch();
    }
};