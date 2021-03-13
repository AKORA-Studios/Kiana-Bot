const { Message } = require('discord.js');
const { emotes, colors, checkOwner, getConfiguration, deatiledEmb } = require('../utilities');
const Emojis = {
    moderation: "⚙️  ",
    info: "📁  ",
    configuration: "🚧  ",
    economy: "💰  ",
    fun: `:tada: `,
    gifs: "💮  ",
    contact: "✉️  ",
    nsfw: "🍑  ",
    developer: "📎  ",
    anime: '⛩️ ',
}

module.exports = {
    name: 'Help',
    syntax: 'help <command>',
    args: false,
    type: 'Info',
    description: 'Shows you all my Commands',
    DmChannel: true,
    commands: ['help'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setAuthor(msg.author.tag, msg.author.avatarURL())
        let searchedCommand;
        if (args[0]) searchedCommand = args[0]

        if (searchedCommand && searchedCommand !== '2') {
            var commandObj = msg.client.commands.find(cmd => cmd.command.commands.includes(args[0].toLowerCase()));
            if (!commandObj) return msg.channel.send(emb.setDescription("Command not found qwq").setColor(colors.error)).catch();

            var { command } = commandObj;
            emb.setTitle(command.name + ` [${command.type}]`)
                .setFooter("Alias: " + command.commands.join(', '))

            if (command.cooldown) emb.addField('**Cooldown**', command.cooldown + 's', true)

            emb.setDescription(`<> = required \n [] = optional\n\n**${'Description'}:** ${command.description}\n**Syntax:** ${command.syntax}`)
            if (command.perm) emb.addField(`Permissions: (User)**`, command.perm, true)
            if (command.needed) emb.addField(`Permissions: (Bot)**`, command.needed, true)

        } else {
            let getHelpText = getModules(msg)
            let ModuleArray = getHelpText.ModuleArray
            categories = getHelpText.categories
            cmdSize = getHelpText.cmdSize

            emb.setFooter(`type +help <cmd> for more || ${cmdSize} Commands in ${categories} Categories`)
            ModuleArray.forEach(o => { emb.addField(o.name, o.text) })
            emb.setTitle(`.•☆ My Commands ☆•.`)

        }

        let conf = getConfiguration()
        let link = "https://discord.com/api/oauth2/authorize?client_id=" + msg.client.user.id + "&permissions=8&scope=bot"
        emb.addField("\u200B", `[Bot Invite](${link}) • [Support Server](${conf.supportinvite})`)
        msg.channel.send(emb).catch();
    }
};


function getModules(msg) {
    let a = 0;
    let b = 0;
    let c = 0;
    var modules = msg.client.commands.map((cmd) => cmd.module)
        .filter((mod, i, arr) => arr.indexOf(mod) == i)
        .sort((a, b) => parseInt(a) - parseInt(b));

    var ModuleArray = []
    for (let mod of modules) {
        let commands = msg.client.commands.filter(cmd => cmd.module == mod).map(cmdO => cmdO.command);
        mod = mod.substr(1)
        b += commands.length;
        a += 1;
        let prop = (mod.toString()).toLowerCase()
        let moduleObjekt = { name: undefined, text: undefined }

        if (prop == "nsfw" && !msg.channel.nsfw) {
            moduleObjekt.text = "\`This channel isn´t nsfw \`"
        } else {
            moduleObjekt.text = '\`\`\`'
            moduleObjekt.text += commands.map(v => `${v.commands[0]}`).join(', ')
            moduleObjekt.text += '\`\`\`'
        }
        moduleObjekt.name = `.•☆ ${mod} ☆•.`
        ModuleArray.push(moduleObjekt)
    }
    a -= 1
    b -= c
    return { ModuleArray, categories: a, cmdSize: b }
}