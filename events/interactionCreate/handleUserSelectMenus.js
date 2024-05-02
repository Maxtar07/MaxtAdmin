module.exports = async (bot, interaction) => {
    if (!interaction.isUserSelectMenu()) return;
    const userSelectMenusHandler = require(`../../handlers/userSelectMenusHandler`);
    const localUserSelectMenus = userSelectMenusHandler();
    const userSelectMenuObject = localUserSelectMenus.find((userSelectMenu) => userSelectMenu.userSelectMenuId === interaction.customId);
    if (!userSelectMenuObject) return;
    await userSelectMenuObject.execute(bot, interaction);
};
