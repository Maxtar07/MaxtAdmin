module.exports = async (bot, interaction) => {
    if (!interaction.isAutocomplete()) return;
    const commandsHandler = require(`../../handlers/commandsHandler`);
    const localCommands = commandsHandler();
    const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);
    if (!commandObject) return;
    commandObject.autocomplete(bot, interaction)
};