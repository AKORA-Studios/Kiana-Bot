const client = require('../index.js')
const { Collection } = require("discord.js");

const GuildConfigShema = require('./GuildShema');
const MemberShema = require('./MemberShema');
const UserShema = require('./UserShema')

var GuildSettingsCache = new Collection();
var MemberConfigCache = new Collection();
var UserConfigCache = new Collection();

//==================================================================================================================================================
//==================================================================================================================================================
//==================================================================================================================================================
Reflect.defineProperty(GuildSettingsCache, "getConfig", {
    /**
     * @param {number} id Guild ID
     * @returns {Model} new User
     */
    value: async function (id) {
        var guild = await GuildSettingsCache.get(id);
        if (!guild) guild = await GuildConfigShema.findOne({ where: { guildID: id } });
        if (!guild) {
            guild = await GuildConfigShema.create({ guildID: id });
            GuildSettingsCache.set(id, guild);
        }
        return guild;
    }
});
//==================================================================================================================================================
//==================================================================================================================================================
//==================================================================================================================================================
Reflect.defineProperty(UserConfigCache, "getConfig", {
    /**
     * @param {number} id User ID
     * @returns {Model} new User
     */
    value: async function (id) {
        let user = await UserConfigCache.get(id);

        if (!user) {
            user = await UserShema.findOne({ where: { userID: id } });

            if (!user) {
                user = await UserShema.create({ userID: id });
                let A = await user.save();

                UserConfigCache.set(id, user);
            }
        }
        return user;
    }
});
Reflect.defineProperty(UserConfigCache, "addXP", {
    /**
     * @param {number} id User ID
     * @param {number} amount Amount of Cois
     * @returns {Model} new User
     */
    value: async function (id, amount) {
        let points = 0;
        if (amount) {
            points = Math.floor(Math.random() * Math.cbrt(amount) + 2);
        } else {
            points = Math.floor(Math.floor(Math.random() * (5 - 1 + 1) + 1));
        }
        let user = await UserConfigCache.get(id);
        if (!user) user = await UserShema.findOne({ where: { userID: id } });

        if (user) {
            user.xp += points
            let A = await user.save();
        } else {
            user = await UserShema.create({ userID: id, xp: points });
        }
        UserConfigCache.set(id, user);
        return user;
    }
});

//==================================================================================================================================================
//==================================================================================================================================================
//==================================================================================================================================================
Reflect.defineProperty(MemberConfigCache, "getConfig", {
    /**
     * @param {number} user_id User ID
     * @param {number} guild_id Guild ID
     * @returns {Model} new User
     */
    value: async function (user_id, guild_id) {
        let id = `${user_id}${guild_id}`
        var guild_user = await MemberConfigCache.get({ memberID: id });
        if (!guild_user) guild_user = await MemberShema.findOne({ memberID: id });
        if (!guild_user) {
            guild_user = await MemberShema.create({ memberID: id });
            MemberConfigCache.set({ memberID: id }, guild_user);
        }
        return guild_user;
    }
});

client.database = { GuildSettingsCache, MemberConfigCache, UserConfigCache };

module.exports = () => console.log("Database ready");