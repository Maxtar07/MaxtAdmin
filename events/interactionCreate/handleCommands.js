module.exports = async (bot, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const commandsHandler = require(`../../handlers/commandsHandler`);
    const localCommands = commandsHandler();
    const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);
    if (!commandObject) return;
    if (commandObject.permissionsRequired?.length) {
        for (const permission of commandObject.permissionsRequired) {
            if (!interaction.member.permissions.has(permission)) {
                interaction.reply({
                    content: `Vous n'avez pas la permission pour utiliser cette commande.`,
                    ephemeral: true
                });
                return;
            }
        }
    }
    if (commandObject.botPermissions?.length) {
        for (const permission of commandObject.botPermissions) {
            const bot = interaction.guild.members.me;
            if (!bot.permissions.has(permission)) {
                interaction.reply({
                    content: `Je n'ai pas la permission d'exécuter cette commande.`,
                    ephemeral: true
                });
                return;
            }
        }
    }
    await commandObject.callback(bot, interaction)
};