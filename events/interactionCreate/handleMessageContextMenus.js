module.exports = async (bot, interaction) => {
    if (!interaction.isMessageContextMenuCommand()) return;
    const messageContextMenusHandler = require(`../../handlers/messageContextMenusHandler`);
    const localMessageContextMenus = messageContextMenusHandler();
    const messageContextMenuObject = localMessageContextMenus.find((mcm) => mcm.name === interaction.commandName);
    if (!messageContextMenuObject) return;
    if (messageContextMenuObject.permissionsRequired?.length) {
        for (const permission of messageContextMenuObject.permissionsRequired) {
            if (!interaction.member.permissions.has(permission)) {
                interaction.reply({
                    content: `Vous n'avez pas la permission pour utiliser ce contextmenu.`,
                    ephemeral: true
                });
                return;
            }
        }
    }
    if (messageContextMenuObject.botPermissions?.length) {
        for (const permission of messageContextMenuObject.botPermissions) {
            const bot = interaction.guild.members.me;
            if (!bot.permissions.has(permission)) {
                interaction.reply({
                    content: `Je n'ai pas la permission d'exécuter ce contextmenu`,
                    ephemeral: true
                });
                return;
            }
        }
    }
    await messageContextMenuObject.callback(bot, interaction)
};