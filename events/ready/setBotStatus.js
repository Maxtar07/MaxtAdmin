const Discord = require(`discord.js`);
const BotStatus = require(`../../models/BotStatus`);
module.exports = async (bot) => {
    const statusData = await BotStatus.findOne();
    if (!statusData) return;
    const { activity, motd, url, status, customInterval } = statusData;
    let currentIndex = 0;
    const updatePresence = async () => {
        const currentMotd = motd[currentIndex];
        if (activity === Discord.ActivityType.Streaming) {
            await bot.user.setPresence({
                activities: [{ name: currentMotd, type: activity, url: url }], status: status,
            });
        } else {
            await bot.user.setPresence({
                activities: [{ name: currentMotd, type: activity }], status: status,
            });
        }
        currentIndex = (currentIndex + 1) % motd.length;
    };
    if (motd.length > 1) {
        const rotationInterval = customInterval || 30;
        bot.intervalpresence = setInterval(updatePresence, rotationInterval * 1000);
    } else {
        const currentMotd = motd[0];

        if (activity === Discord.ActivityType.Streaming) {
            await bot.user.setPresence({
                activities: [{ name: currentMotd, type: activity, url: url }], status: status,
            });
        } else {
            await bot.user.setPresence({
                activities: [{ name: currentMotd, type: activity }], status: status,
            });
        }
    }
}
