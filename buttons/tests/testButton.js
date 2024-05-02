module.exports = {
  name: `testButton`,
  description: `Commande de bouton de test`,
  buttonId: `testbutton`,
  execute: async (bot, interaction) => {
    return interaction.reply({
      ephemeral: true,
      embeds: [
        {
          description: `Ceci est un bouton de test !`,
        }
      ]
    });
  },
};
