const Discord = require(`discord.js`);
const pm2 = require(`pm2`);
module.exports = {
    callback: async (bot, interaction) => {
        interaction.reply({ content: `Restarting bot...`, ephemeral: true });
        pm2.restart(`bot.js`, (err) => {
            if (err) {
                console.error(err);
                interaction.editReply(`Failed to restart bot.`);
            } else {
                interaction.editReply(`Bot restarted successfully.`);
            }
        });
    },
    name: `restart`,
    description: `Permet de redémarrer le bot`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
