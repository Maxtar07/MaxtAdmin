const Discord = require(`discord.js`);
const PollsList = require(`../../models/PollsList`);
module.exports = {
    callback: async (bot, interaction) => {
        var question = interaction.options.getString(`question`);
        const choixArray = interaction.options.getString(`choix`).split(`,`).map(c => c.trim());
        const emojisArray = interaction.options.getString(`emojis`)?.split(`,`).map(e => e.trim());
        const channel = interaction.options.getChannel(`channel`) || interaction.channel;

        if (!question) {
            return interaction.reply({ content: `Veuillez spécifier une question pour le sondage.`, ephemeral: true });
        }
        if (!(choixArray.length >= 2)) {
            return interaction.reply({ content: `Veuillez spécifier au moins 2 choix pour votre sondage.`, ephemeral: true });
        }
        if ((emojisArray) && !(emojisArray.length === choixArray.length)) {
            return interaction.reply({ content: `Il n'y a pas le même nombre de choix et d'emoji !!`, ephemeral: true });
        }
        if (!question.includes(`?`)) {
            question = question + ` ?`
        }

        const pollEmbed = new Discord.EmbedBuilder()
            .setColor(`Random`)
            .setTitle(`Nouveau sondage !`)
            .setDescription(question)
            .setFooter({ text: `Sondage de ${interaction.user.displayName}`, displayAvatarURL: interaction.user.displayAvatarURL() })

        const components = [];
        let currentRow = new Discord.ActionRowBuilder();
        let button;

        for (let i = 0; i < choixArray.length; i++) {
            if (emojisArray) {
                button = new Discord.ButtonBuilder()
                    .setCustomId(`poll_${i}`)
                    .setEmoji(emojisArray[i])
                    .setLabel(choixArray[i])
                    .setStyle(`Primary`);
            } else {
                button = new Discord.ButtonBuilder()
                    .setCustomId(`poll_${i}`)
                    .setLabel(choixArray[i])
                    .setStyle(`Primary`);
            }

            if (currentRow.components.length === 5) {
                components.push(currentRow);
                currentRow = new Discord.ActionRowBuilder();
            }

            currentRow.addComponents(button);
        }

        if (currentRow.components.length > 0) {
            components.push(currentRow);
        }

        for (let i = 0; i < choixArray.length; i++) {
            if (emojisArray) {
                pollEmbed.addFields({
                    name: `${emojisArray[i]} ${choixArray[i]}`,
                    value: `Votes: 0`,
                });
            } else {
                pollEmbed.addFields({
                    name: `${choixArray[i]}`,
                    value: `Votes: 0`,
                });
            }
        }

        const message = await channel.send({ ephemeral: false, embeds: [pollEmbed], components });


        let pollsList = await PollsList.findOne({ guildId: interaction.guild.id });
        if (!pollsList) {
            pollsList = new PollsList({
                guildId: interaction.guild.id,
                guildName: interaction.guild.name,
                polls: new Map([
                    [
                        message.id,
                        {
                            pollId: message.id,
                            question: question,
                            choices: new Map()
                        },
                    ],]),
            });
            for (let i = 0; i < choixArray.length; i++) {
                pollsList.polls.get(message.id).choices.set(`Choix numéro ${i + 1}`, { choiceName: choixArray[i], usersList: new Map() });
            }

        } else {
            pollsList.guildName = interaction.guild.id
            pollsList.polls.set(message.id, { pollId: message.id, question: question, choices: new Map() })
            for (let i = 0; i < choixArray.length; i++) {
                pollsList.polls.get(message.id).choices.set(`Choix numéro ${i + 1}`, { choiceName: choixArray[i], usersList: new Map() });
            }
        }

        await pollsList.save();
        interaction.reply({ content: `Votre sondage à bien été envoyé ici : ${channel}`, ephemeral: true });
    },
    name: `poll`,
    description: `Créer un sondage`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `question`,
            description: `La question à poser`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: `choix`,
            description: `Séparer chaque choix voulu par une virgule dans l'ordre du 1er au dernier choix`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: `emojis`,
            description: `Si vous voulez associer un emoji à un choix (séparé par une virgule dans l'ordre des choix)`,
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: `channel`,
            description: `Le channel dans lequel envoyer le sondage`,
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [Discord.ChannelType.GuildText], required: false,
        },
    ],
    permissionsRequired: [],
    botPermissions: []
};
