module.exports = async (bot, interaction) => {
    if (!interaction.isRoleSelectMenu()) return;
    const roleSelectMenusHandler = require(`../../handlers/roleSelectMenusHandler`);
    const localRoleSelectMenus = roleSelectMenusHandler();
    const roleSelectMenuObject = localRoleSelectMenus.find((roleSelectMenu) => roleSelectMenu.roleSelectMenuId === interaction.customId);
    if (!roleSelectMenuObject) return;
    await roleSelectMenuObject.execute(bot, interaction);
};
