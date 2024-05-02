const Discord = require(`discord.js`);
const fs = require(`fs`);
const path = require(`path`);

module.exports = {
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Interaction} interaction 
     */
    callback: async (bot, interaction) => {
        const commandName = interaction.options.getString(`commande`);
        const categories = getCommandCategories();

        if (commandName) {
            const command = getCommandByName(commandName);

            if (command) {
                const category = getCategoryByCommand(command);

                const help_command_embed = new Discord.EmbedBuilder()
                    .setTitle(`Aide pour la commande ${command.name}`)
                    .setDescription(command.description)
                    .addFields(
                        {
                            name: `Catégorie`,
                            value: category || `Aucune catégorie`
                        },
                        {
                            name: `Utilisation`,
                            value: `/${command.name} ${command.usage || ``}`
                        }
                    )
                    .setColor(`#00FF00`)
                    .setFooter({ text: `Utilisez la commande /help pour afficher la liste des commandes par catégorie.` });

                interaction.reply({ embeds: [help_command_embed] });
            } else {
                interaction.reply({ content: `Commande ${commandName} introuvable.`, ephemeral: true });
            }
        } else {
            const help_embed = new Discord.EmbedBuilder()
                .setTitle(`Commandes disponibles par catégorie`)
                .setDescription(categories.map(category => {
                    const commands = getCommandsInCategory(category);
                    return `**${category}**\n${commands.map(cmd => `\`${cmd.name}\``).join(`, `)}`;
                }).join(`\n\n`))
                .setColor(`#00FF00`)
                .setFooter({ text: `Utilisez la commande /help [commande] pour obtenir des informations détaillées sur une commande spécifique.` });

            interaction.reply({ embeds: [help_embed] });
        }
    },
    name: `help`,
    description: `Affiche les commandes dispos par catégorie ou lesinformations sur une commande spécifique`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `commande`,
            description: `Nom de la commande pour obtenir des informations détaillées`,
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    permissionsRequired: [],
    botPermissions: []
};

function getCommandCategories() {
    const commandsDir = path.join(__dirname, `..`, `..`, `commands`);
    const categories = fs.readdirSync(commandsDir).filter(file => fs.lstatSync(path.join(commandsDir, file)).isDirectory());
    return categories;
}

function getCommandsInCategory(category) {
    const commandsDir = path.join(__dirname, `..`, `..`, `commands`, category);
    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith(`.js`));
    const commands = commandFiles.map(file => require(path.join(commandsDir, file)));
    return commands;
}

function getCommandByName(name) {
    const categories = getCommandCategories();
    for (const category of categories) {
        const commands = getCommandsInCategory(category);
        const command = commands.find(cmd => cmd.name === name);
        if (command) {
            return command;
        }
    }
    return null;
}

function getCategoryByCommand(command) {
    const categories = getCommandCategories();
    for (const category of categories) {
        const commands = getCommandsInCategory(category);
        if (commands.includes(command)) {
            return category;
        }
    }
    return null;
}
