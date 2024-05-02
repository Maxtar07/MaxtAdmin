const Discord = require(`discord.js`);
module.exports = {
    callback: async (bot, interaction) => {
        const query = interaction.options.getString(`query`);
        interaction.reply({ content: `Vous avez choisi **${query}**`, ephemeral: true });
    },
    autocomplete: async (bot, interaction) => {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        let choices = [`Test`, `Maxtar`, `MaxtAdmin`, `raclette`, `fromage`]; // il est possible de faire une liste de choix automatique (voir commande /toggle-command)
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue)).slice(0, 25);
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice }))
        )
    },
    name: `autocomplete`,
    description: `Commande de test pour l'autocomplete`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `query`,
            description: `rentrer un truc pour tester ^^`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true,
        },
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
}