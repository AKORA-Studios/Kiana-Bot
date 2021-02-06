const { Message, MessageEmbed } = require("discord.js");
const fs = require("fs")
const config = require("../config.json")

const fetch = require("node-fetch");
const bent = require('bent');
const urban = require("urban");
const getString = bent('string');

const colors = {
    error: 0xF91A3C,
    info: 0x303136,
    success: 0x13EF8D,
    warning: 0xF9D71A,
    nothing: 0x1AE3F9, //blue
    economy: 0x71232d,
    unimportant: 0x738F8A //hellgrau
}

const emotes = {
    false: "<:false:740942401413185656>",
    true: "<:true:740942401161527426>",
    mobile: "<:mobile:741225706843013122>",
    bot: "<:Clyde:741225707203592232>",
    coin: "<:coin:743414375255113739>",
    kanna: "<:KannaSip:750712438365880480>",
    owner: "<:owner:750713044606255179>",
    wumpus: "<:wumpus:750769351862255617>",
    user: "<:perso:750770344704475156>",
    id: "<:id:750770344637497415>",
    bravery: "<:Bravery:740569554681331723> ",
    balance: "<:Balance:740569554648039424> ",
    nitro: "<:nitro:740568007402717244> ",
    hypesquad: "<:hypesquad:740569344576192512> ",
    brilliance: "<:Brilliance:740569554715017226>",
    verify: "<:verify:752248606643453964>",

    staff: "<:staff:752248790198648852>",
    inactivestaff: '<:inactivstaff:757215960586518538>',
    partner: '<:partner:776486151686193162>',
    inactivepartner: '<:inactivepartner:776486192279584819>',

    link: "<:link:750770345249734747>",
    desktop: "<:desktop:741225709351206993>",
    fun: "<:fun:763075594681712720>",
    text: "<:text:767732887520673832>",
    voice: "<:voice:767712139606753300>",
    online: "<:online:767714634106273803>",
    plus: "<:plus:768749896995569674>",
    waiting: "<a:waiting:769679624203403335>",
    loading: "<a:loading:807311829177073705>",
    boost1: "<:boost1:773463901144350731>",
    boost2: "<:boost2:773463872685473802>",
    boost3: "<:Bboost3:773463846219939840>",

    bughunter: "<:BugHunter:787302675107676200>",
    bughunter2: "<:BugHunter2:787302675128647680>",
    soundwave: "<:soundwave:791019656747286560>",

    ban: "<:ban:805904813409697843>"

}
const money = {
    daily: 200,
    weekly: 1200,
    monthly: 3600,
}


/**
 * A simple Framework for a Action Confirm
 * @param {Message} msg Message from the Command
 * @param {string} text Text for the Embed
 * @param {MessageAction} confim Action executed when confirmed
 * @param {MessageAction} cancel Action executed when canceld
 */

const confirmAction = (msg, text, confim, cancel) => {
    var emb = rawEmb(msg);
    emb.setTitle('Bestätigung').setDescription(text)

    msg.channel.send(emb).then(async message => {

        const filter = (reaction, user) => {
            return (reaction.emoji.name == '✅' ||
                reaction.emoji.name === '❌') &&
                user.id == msg.author.id;
        };
        const collector = message.createReactionCollector(filter, { time: 5000 });

        message.react('✅');
        message.react('❌');

        collector.on('collect', (reaction, user) => {
            reaction.remove().catch();

            switch (reaction.emoji.name) {
                case '✅':
                    emb.setTitle('Confirmed uwu');
                    emb.setColor(colors.success);
                    message.edit(emb).then(m => {
                        confim(m);
                    });
                    collector.removeAllListeners();
                    break;
                case '❌':
                    emb.setTitle('Canceled qwq');
                    emb.setColor(colors.error);
                    message.edit(emb).then(m => {
                        cancel(m);
                    });
                    collector.removeAllListeners();
                    break;
                default:
                    reaction.remove().then().catch();
                    break;
            }
        });

        collector.on('end', collected => {
            emb.setTitle('Canceled qwq');
            emb.setColor(colors.error);
            message.edit(emb).then(m => {
                cancel(m);
            });
        });
    });
}

const marry = (msg, id, text, confim, cancel) => {
    var emb = rawEmb(msg);
    emb.setTitle('Confirmed').setDescription(text)

    msg.channel.send(emb).then(async message => {

        const filter = (reaction, user) => {
            return (reaction.emoji.name == '✅' ||
                reaction.emoji.name === '❌') &&
                user.id == id;
        };
        const collector = message.createReactionCollector(filter, { time: 5000 });

        message.react('✅');
        message.react('❌');

        collector.on('collect', (reaction, user) => {
            reaction.remove().catch();

            switch (reaction.emoji.name) {
                case '✅':
                    emb.setTitle('Confirmed uwu');
                    emb.setColor(colors.success);
                    message.edit(emb).then(m => {
                        confim(m);
                    });
                    collector.removeAllListeners();
                    break;
                case '❌':
                    emb.setTitle('Canceled qwq');
                    emb.setColor(colors.error);
                    message.edit(emb).then(m => {
                        cancel(m);
                    });
                    collector.removeAllListeners();
                    break;
                default:
                    reaction.remove().then().catch();
                    break;
            }
        });

        collector.on('end', collected => {
            emb.setTitle('Canceled qwq');
            emb.setColor(colors.error);
            message.edit(emb).then(m => {
                cancel(m);
            });
        });
    });
}

/**
 * @param {Message} msg 
 * @returns {MessageEmbed} a not-clean Embed
 */
const deatiledEmb = (msg) => {
    return new MessageEmbed()
        .setColor(colors.info)
        .setFooter(msg.client.user.tag, msg.client.user.displayAvatarURL())
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setTimestamp();
}

/**
 * @returns {MessageEmbed} a clean Embed
 */
const rawEmb = () => {
    return new MessageEmbed()
        .setColor(colors.info)
}

function checkOwner(id) {
    if (config.owner.includes(id)) { return true } else { return false }
}


function getConfiguration() {
    return config
}


function getStats() {
    var project_stats = {
        files: 0,
        lines: 0,
        size: 0 //In KB
    }

    scanDir(".");
    project_stats.size = Number(project_stats.size.toFixed(0));
    return project_stats;

    function scanDir(dirpath) {
        var ls = fs.readdirSync(dirpath).filter((name) => !(["node_modules", ".git", ".vscode", "log.log"].includes(name)));
        for (let file of ls) {
            let path = dirpath + "/" + file;
            let stat = fs.lstatSync(path);

            if (stat.isFile()) {
                project_stats.files++;
                project_stats.size += stat.size / 1024;
                project_stats.lines += fs.readFileSync(path).toString('utf8').split("\n").length;
            } else if (stat.isDirectory()) {
                scanDir(path);
            }
        }
    }
}


/**
 * @param {number} xp
 * @returns {number}
 */
const calcLevel = function (xp) {
    return Math.floor(0.07 * Math.sqrt(xp));
};

/**
 * @param {number} level
 * @returns {number}
 */
const levelToXP = function (level) {
    return (level * level / 0.0049)
};

/**
 * Returns the Ping to the address
 * @param {string} address 
 * @returns {number}
 */
const ping = async (address) => {
    try {
        const start = new Date();
        await getString(address).catch();
        const stop = new Date();

        var diff = stop - start;
        return diff;
    } catch (err) {
        return 0;
    }
}

/**
 * @param {Message} msg  Message
 * @param {string} question Question?
 * @param {number} time Time in seconds
 */
async function getAnswer(msg, question, time) {
    return new Promise(async (resolve, reject) => {
        const channel = msg.channel;
        let emb = rawEmb(msg);

        await msg.channel.send(emb.setTitle(question).setColor(colors.info).setFooter("cancel, to abort | " + time + " Seconds to answer"));
        emb = rawEmb(msg);

        const collector = channel.createMessageCollector(m => m.author.id === msg.author.id, {
            max: 1,
            time: time * 1000,
            errors: ['time']
        });

        collector.on("collect",
            /** @param {Message} m  */
            m => {
                const cont = m.content;

                if (cont === "" || !cont) {
                    msg.channel.send(emb.setTitle("Empty Message").setColor(colors.error)).then(() => {
                        reject("Empty Message Send");
                    }).catch((e) => {
                        reject("Couldnt Send Message\n" + e);
                    });
                } else if (cont.toLowerCase().includes("cancel")) {
                    msg.channel.send(emb.setTitle("Canceld").setColor(colors.error)).then(() => {
                        reject("Action Canceld");
                    }).catch((e) => {
                        reject("Couldnt Send Message\n" + e);
                    });
                } else { resolve(cont) }
            })

        collector.on("end", (collected) => {
            if (collected.size > 0) return; //Falls schon ne antwort kam

            msg.channel.send(emb.setTitle("Time Expired").setColor(colors.error)).then(() => {
                reject("Time expired");
            }).catch((e) => {
                reject("Couldnt Send Message\n" + e);
            });
        });
    });
}

module.exports = { colors, confirmAction, deatiledEmb, marry, rawEmb, ping, emotes, getStats, calcLevel, levelToXP, money, getAnswer, checkOwner, getConfiguration };