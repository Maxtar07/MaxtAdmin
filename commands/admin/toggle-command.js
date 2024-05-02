const Discord = require(`discord.js`);
const inactiveCommands = require(`../../models/InactiveCommands`);
const inactiveUserContextMenu = require(`../../models/InactiveUserContextMenus`);
const inactiveMessageContextMenu = require(`../../models/InactiveMessageContextMenus`);
module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const commandName = interaction.options.getString(`commande`);
        if (commandName === interaction.commandName) {
            return interaction.reply({ content: `Tu ne peux pas désactiver cette commande !`, ephemeral: true })
        }

        const commande = await inactiveCommands.findOne({ name: commandName });
        const usercontextmenu = await inactiveUserContextMenu.findOne({ name: commandName });
        const messagecontextmenu = await inactiveMessageContextMenu.findOne({ name: commandName });

        if (!commande && !usercontextmenu && !messagecontextmenu) {
            return interaction.reply({ content: `La commande spécifiée n'a pas été trouvée dans la base de données.`, ephemeral: true });
        }

        if (commande) {
            commande.inactive = !commande.inactive;
            await commande.save();
            interaction.reply({ content: `l'état de la commande ${commande.name} a été modifié. Elle est maintenant ${commande.inactive ? `inactive` : `active`}.`, ephemeral: true });
        }
        if (usercontextmenu) {
            usercontextmenu.inactive = !usercontextmenu.inactive;
            interaction.reply({ content: `l'état du usercontextmenu ${usercontextmenu.name} a été modifié. Il est maintenant ${usercontextmenu.inactive ? `inactif` : `actif`}.`, ephemeral: true });
            await usercontextmenu.save();
        }
        if (messagecontextmenu) {
            messagecontextmenu.inactive = !messagecontextmenu.inactive;
            await messagecontextmenu.save();
            interaction.reply({ content: `l'état du messagecontextmenu ${messagecontextmenu.name} a été modifié. Il est maintenant ${messagecontextmenu.inactive ? `inactif` : `actif`}.`, ephemeral: true });
        }

    },
    autocomplete: async (bot, interaction) => {
        const focusedValue = interaction.options.getFocused();
        const allChoices = [];
        allChoices.push(...(await inactiveCommands.find({})).map(command => command.name));
        allChoices.push(...(await inactiveUserContextMenu.find({})).map(command => command.name));
        allChoices.push(...(await inactiveMessageContextMenu.find({})).map(command => command.name));
        const filtered = allChoices.filter(choice => choice.includes(focusedValue)).slice(0, 25);
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice }))
        );
    },
    name: `toggle-command`,
    description: `Activer ou désactiver une commande du bot`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `commande`,
            description: `La commande à changer d'état`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true,
        },
    ],
    permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
    botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
