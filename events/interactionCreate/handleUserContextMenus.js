module.exports = async (bot, interaction) => {
    if (!interaction.isUserContextMenuCommand()) return;
    const userContextMenusHandler = require(`../../handlers/userContextMenusHandler`);
    const localUserContextMenus = userContextMenusHandler();
    const userContextMenuObject = localUserContextMenus.find((mcm) => mcm.name === interaction.commandName);
    if (!userContextMenuObject) return;
    if (userContextMenuObject.permissionsRequired?.length) {
        for (const permission of userContextMenuObject.permissionsRequired) {
            if (!interaction.member.permissions.has(permission)) {
                interaction.reply({
                    content: `Vous n'avez pas la permission pour utiliser ce contextmenu.`,
                    ephemeral: true
                });
                return;
            }
        }
    }
    if (userContextMenuObject.botPermissions?.length) {
        for (const permission of userContextMenuObject.botPermissions) {
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
    await userContextMenuObject.callback(bot, interaction)
};