const Discord = require(`discord.js`);
const BotStatus = require(`../../models/BotStatus`);
let interval;
module.exports = {
    callback: async (bot, interaction) => {
        const status = interaction.options.getString(`status`);
        const activity = interaction.options.getInteger(`activité`);
        const motd = interaction.options.getString(`motd`);
        let motdArray = motd.split(`,`).map(m => m.trim());
        const url = interaction.options.getString(`url`);
        const customInterval = interaction.options.getInteger(`interval`);
        let currentIndex = 1;

        if (bot.intervalpresence) {
            clearInterval(bot.intervalpresence)
        }
        if (interval) {
            clearInterval(interval);
        }

        if (motdArray.length > 1 && !customInterval) {
            interaction.reply({
                content: `Veuillez spécifier l'intervalle de temps (en secondes) pour les rotations de motd.`,
                ephemeral: true
            });
            return;
        }
        if (activity === Discord.ActivityType.Streaming) {
            if (!url || !isValidUrl(url)) {
                interaction.reply({
                    content: `Veuillez fournir une URL valide pour l'activité de streaming.`,
                    ephemeral: true
                });
                return;
            }
            await bot.user.setPresence({
                activities: [{ name: motdArray[0], type: activity, url: url }], status: status,
            });
            interaction.reply({
                content: `Statut du bot changé avec succès`,
                ephemeral: true
            });
            await BotStatus.findOneAndUpdate({}, { activity, motd: motdArray, url, status, customInterval }, { upsert: true });
        } else {
            await bot.user.setPresence({
                activities: [{ name: motdArray[0], type: activity }], status: status,
            });
            interaction.reply({
                content: `Statut du bot changé avec succès`,
                ephemeral: true
            });
            await BotStatus.findOneAndUpdate({}, { activity, motd: motdArray, status, customInterval }, { upsert: true });
        }

        const updatePresence = async () => {
            const currentMotd = motdArray[currentIndex];
            if (activity === Discord.ActivityType.Streaming) {
                await bot.user.setPresence({
                    activities: [{ name: currentMotd, type: activity, url: url }], status: status,
                });
            } else {
                await bot.user.setPresence({
                    activities: [{ name: currentMotd, type: activity }], status: status,
                });
            }
            currentIndex = (currentIndex + 1) % motdArray.length;
        };
        if (motdArray.length > 1) {
            const rotationInterval = customInterval || 30;
            interval = setInterval(updatePresence, rotationInterval * 1000);
        }
    },
    name: `set-status`,
    description: `Change le status du bot`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: `status`,
            description: `Status du bot`,
            required: true,
            choices: [
                {
                    name: `Online`,
                    value: `online`
                },
                {
                    name: `Inactif`,
                    value: `idle`
                },
                {
                    name: `Do Not Disturb`,
                    value: `dnd`
                },
                {
                    name: `Offline`,
                    value: `invisible`
                },
            ]
        },
        {
            type: Discord.ApplicationCommandOptionType.Integer,
            name: `activité`,
            description: `Activité du bot`,
            required: true,
            choices: [
                {
                    name: `Playing`,
                    value: Discord.ActivityType.Playing
                },
                {
                    name: `Streaming`,
                    value: Discord.ActivityType.Streaming
                },
                {
                    name: `Listening`,
                    value: Discord.ActivityType.Listening
                },
                {
                    name: `Watching`,
                    value: Discord.ActivityType.Watching
                },
                //{
                //    name: `Custom`,
                //    value: Discord.ActivityType.Custom
                //},
                {
                    name: `Competing`,
                    value: Discord.ActivityType.Competing
                },
            ]
        },
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: `motd`,
            description: `Un ou plusieurs motd (séparés pas une ",") qui changes avec un interval`,
            required: true
        },
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: `url`,
            description: `l'url pour l'activité streaming`,
            required: false
        },
        {
            type: Discord.ApplicationCommandOptionType.Integer,
            name: `interval`,
            description: `Intervalle de temps (en secondes) pour les rotations de motd`,
            required: false
        }
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};

function isValidUrl(url) {
    const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    return urlPattern.test(url);
}