const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60
        let webLatency = new Date() - interaction.createdAt
        let apiLatency = bot.ws.ping
        let totalLatency = webLatency + apiLatency
        let emLatency = {
            Green: `🟢`,
            Yellow: `🟡`,
            Red: `🔴`,
        }
        interaction.reply({
            ephemeral: true,
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor(totalLatency < 200 ? `Green` : totalLatency < 500 ? `Yellow` : `Red`)
                    .addFields(
                        { name: `Websocket Latency`, value: `'${webLatency <= 200 ? emLatency.Green : webLatency <= 400 ? emLatency.Yellow : emLatency.Red}' '${webLatency}'ms` },
                        { name: `API Latency`, value: `'${apiLatency <= 200 ? emLatency.Green : apiLatency <= 400 ? emLatency.Yellow : emLatency.Red}' '${apiLatency}'ms` },
                        { name: `Uptime`, value: `'${days}Days' : '${hours}Hrs' : '${minutes}Mins' : '${seconds}Secs'` },
                    )
            ]
        });
    },
    name: `ping`,
    description: `Renvoi le ping du bot`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [],
    botPermissions: []
}