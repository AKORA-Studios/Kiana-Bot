const { Message } = require('discord.js');
const { rawEmb, deatiledEmb } = require('../utilities');

module.exports = {
    name: 'random',
    syntax: 'random',
    args: false,
    type: 'Fun',
    description: 'Gives you back coincidences. For example a random number or a random user',
    commands: ['random', 'r'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setTitle('*°:⋆ₓₒ　Random　ₓₒ⋆:°*')

        var zahl = between(0, 100)

        let members = (await msg.guild.members.fetch()).array().filter(m => !m.deleted);
        var nutzer = members[Math.floor(Math.random() * members.length)];

        var farbe = Math.floor(Math.random() * 16777215).toString(16);

        let roles = (await msg.guild.roles.fetch()).cache.filter(r => {
            return !r.deleted && r.name !== "@everyone"
        }).array();

        var role = roles[Math.floor(Math.random() * roles.length)];

        emb.addField("**Number [1-100]:**", zahl)
            .addField("**Color:**", farbe)
            .setColor("#" + farbe)
            .addField("**User:**", `${nutzer.toString()} [${nutzer.user.tag}]`)
            .addField("**Role:**", `${role.toString()} [${role.name}]`)

        return msg.channel.send(emb).catch();
    }
};

function between(min, max) { return Math.floor(Math.floor(Math.random() * (max - min + 1) + min)) }