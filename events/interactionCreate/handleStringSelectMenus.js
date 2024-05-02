module.exports = async (bot, interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    const stringSelectMenusHandler = require(`../../handlers/stringSelectMenusHandler`);
    const localStringSelectMenus = stringSelectMenusHandler();
    const stringSelectMenuObject = localStringSelectMenus.find((stringSelectMenu) => stringSelectMenu.stringSelectMenuId === interaction.customId);
    if (!stringSelectMenuObject) return;
    await stringSelectMenuObject.execute(bot, interaction);
};
