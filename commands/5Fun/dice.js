const { Message } = require('discord.js');
const { colors, rawEmb, deatiledEmb } = require('../utilities');

module.exports = {
    name: 'Dice Roll',
    syntax: 'dice [dice sides] [count]',
    args: false,
    type: 'Fun',
    description: 'Dice with any number of sides',
    DmChannel: true,
    commands: ['dice', 'roll'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setTitle('‧͙⁺˚*･༓☾　Dice ☽༓･*˚⁺‧͙')

        let result_arr = [];
        let sides = 6;
        let count = 1;

        if (args.length > 1) {
            sides = args[0];
            count = args[1];
        } else if (args.length > 0) {
            sides = args[0];
            count = 1;
        }

        if (isNaN(sides) || isNaN(count)) return msg.channel.send(emb.setColor(colors.error).setDescription("You have not entered valid numbers qwq")).catch()

        if (sides > 100 || count > 100) {
            sides %= 100;
            sides < 6 ? (sides = 6) : null;

            count %= 100;
            count < 1 ? (count = 1) : null;


            return message.channel.send(
                emb.setDescription(`Your information exceeded my performance. Here is an alternative selection for you:\n` +
                    `\n**Sides:** \`${sides}\`` +
                    `\n**Throws:**  \`${count}\``)
            ).catch();

        }

        let diceRoll;
        for (let i = 0; i < count; i++) {
            diceRoll = Math.floor(Math.random() * sides) + 1;
            result_arr.push(`**${i + 1}** - \`${diceRoll}\``);
        }

        let result = result_arr.join("\n");


        if (!result) result = "invalid arguments";
        emb.setFooter("Sides: " + sides + " Throws: " + count)
            .setDescription(
                result.length > 1024 ? "Too many characters for this embed" : result
            );

        msg.channel.send(emb).catch()
    }
};