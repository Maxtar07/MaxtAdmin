module.exports = async (bot, interaction) => {
    if (!interaction.isMentionableSelectMenu()) return;
    const mentionableSelectMenusHandler = require(`../../handlers/mentionableSelectMenusHandler`);
    const localMentionableSelectMenus = mentionableSelectMenusHandler();
    const mentionableSelectMenuObject = localMentionableSelectMenus.find((mentionableSelectMenu) => mentionableSelectMenu.mentionableSelectMenuId === interaction.customId);
    if (!mentionableSelectMenuObject) return;
    await mentionableSelectMenuObject.execute(bot, interaction);
};
