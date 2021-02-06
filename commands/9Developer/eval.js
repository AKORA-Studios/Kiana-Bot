const { Message } = require('discord.js');
const { colors, rawEmb } = require('../utilities');

module.exports = {
    name: 'Eval',
    syntax: 'eval <code>',
    args: true,
    type: 'Developer',
    description: 'Executes Javascript on the Bot Script',
    perm: ['DEVELOPER'],
    commands: ['eval', 'evaluate'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        var code = args.join(' '),
            output = "",
            emb = rawEmb()

        emb.addField("**Code:**", "```" + code + "```", false);

        try {
            output = await eval(code);
        } catch (e) {
            output = e;
        }

        emb.addField("**Output:**", "```" + output + "```", false);
        msg.channel.send(emb).catch(() => msg.channel.send(rawEmb().setColor(colors.error).setTitle("Too Long")));
    }
};