module.exports = async (bot, interaction) => {
    if (!interaction.isButton()) return;
    const buttonsHandler = require(`../../handlers/buttonsHandler`);
    const chooseMusicButtons = require(`../../buttons/music/choosemusic`)
    const pollChoicesButtons = require(`../../buttons/poll/choosechoices`)
    const localButtons = buttonsHandler();
    const buttonObject = localButtons.find((button) => button.buttonId === interaction.customId);
    if (buttonObject) {
        buttonObject.execute(bot, interaction);
    } else if (interaction.customId.startsWith(`result_`)) {
        chooseMusicButtons(bot, interaction);
    } else if (interaction.customId.startsWith(`poll_`)) {
        pollChoicesButtons(bot, interaction);
    }
}
