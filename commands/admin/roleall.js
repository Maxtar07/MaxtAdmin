const Discord = require(`discord.js`);
module.exports = {
  callback: async (bot, interaction) => {
    let roleToAdd = interaction.options.getRole(`role`);
    const guild = interaction.guild;
    const action = interaction.options.getString(`action`);

    // Vérifier si les rôles et l'action ont été spécifiés
    if (!roleToAdd || !action) {
      return interaction.reply({ content: `Veuillez spécifier un rôle et une action valides.`, ephemeral: true });
    }

    // Filtrer les membres pour exclure les bots
    const members = guild.members.cache.filter(member => !member.user.bot);

    //message de confirmation de la bonne exécution de la commande
    interaction.reply({ content: `Mise à jour des rôles en cours...`, ephemeral: true })

    if (action === `add`) {
      // Ajouter le rôle aux membres
      await members.forEach(member => {
        try {
          member.roles.add(roleToAdd);
        } catch (error) {
          console.error(`Une erreur est survenue lors de l'ajout du rôle à ${member.user.tag} : ${error.message}`);
          interaction.reply({ content: `Une erreur est survenue lors de l'ajout du rôle à ${member.user.tag}. Veuillez réessayer ultérieurement.`, ephemeral: true });
        }
      });

      // Message de confirmation de l'ajout du rôle
      interaction.editReply({ content: `Le rôle ${roleToAdd.name} a bien été ajouté à tous les membres, sauf les bots.`, ephemeral: true });
    } else if (action === `remove`) {
      // Supprimer le rôle des membres
      await members.forEach(member => {
        try {
          member.roles.remove(roleToAdd);
        } catch (error) {
          console.error(`Une erreur est survenue lors de la suppression du rôle à ${member.user.tag} : ${error.message}`);
          interaction.reply({ content: `Une erreur est survenue lors de la suppression du rôle à ${member.user.tag}. Veuillez réessayer ultérieurement.`, ephemeral: true });
        }
      });

      // Message de confirmation de la suppression du rôle
      interaction.editReply({ content: `Le rôle ${roleToAdd.name} a bien été supprimé de tous les membres, sauf les bots.`, ephemeral: true });
    } else {
      // Action invalide
      interaction.reply({ content: `l'action spécifiée est invalide. Veuillez choisir entre "add" et "remove".`, ephemeral: true });
    }
  },
  name: `roleall`,
  description: `Ajouter ou supprimer un rôle à tous les membres du serveur (excepté les bots)`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: `role`,
      description: `Le rôle à ajouter ou supprimer à tous les membres du serveur (excepté les bots)`,
      type: Discord.ApplicationCommandOptionType.Role,
      required: true,
    },
    {
      name: `action`,
      description: `L'action à effectuer : "add" pour ajouter le rôle, "remove" pour le supprimer`,
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: `Ajouter`,
          value: `add`,
        },
        {
          name: `Supprimer`,
          value: `remove`,
        },
      ],
    },
  ],
  permissionsRequired: [Discord.PermissionFlagsBits.Administrator],
  botPermissions: [Discord.PermissionFlagsBits.Administrator]
};
