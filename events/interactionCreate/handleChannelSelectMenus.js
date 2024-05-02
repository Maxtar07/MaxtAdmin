module.exports = async (bot, interaction) => {
    if (!interaction.isChannelSelectMenu()) return;
    const channelSelectMenusHandler = require(`../../handlers/channelSelectMenusHandler`);
    const localChannelSelectMenus = channelSelectMenusHandler();
    const channelSelectMenuObject = localChannelSelectMenus.find((channelSelectMenu) => channelSelectMenu.channelSelectMenuId === interaction.customId);
    if (!channelSelectMenuObject) return;
    await channelSelectMenuObject.execute(bot, interaction);
};
