const Discord = require(`discord.js`);
const { TicTacToe } = require(`discord-gamecord`);
module.exports = {
  callback: async (bot, interaction) => {
    var opponent = interaction.options.getUser(`membre`)
    if (!opponent) return;
    const Game = new TicTacToe({
      message: interaction,
      opponent: opponent,
      isSlashGame: true,
      embed: {
        title: `Morpion`,
        overTitle: `Game Over`,
        color: `#5865F2`,
        statusTitle: `Status`
      },
      emojis: { xButton: `❌`, oButton: `⭕`, blankButton: `⬛` },
      mentionUser: true,
      timeoutTime: 60000,
      timeoutMessage: `Le jeu à été arreté`,
      xButtonStyle: `DANGER`,
      oButtonStyle: `PRIMARY`,
      turnMessage: `{emoji} | Au tour de **{player}**`,
      winMessage: `{emoji} | **{player}** à gagné !`,
      tieMessage: `Égalité !`,
      requestMessage: `{player} t'a invité à faire une partie de morpion`,
      rejectMessage: `l'adevsersiare que tu as choisi à refusé ton invitation...`,
      timeoutMessage: `Le jeu s'est terminé, personne n'a gagné...`,
      playerOnlyMessage: `Seulement {player} et {opponent} peuvent utiliser ces bouttons`
    });

    Game.startGame();
    Game.on(`gameOver`, result => {
      return;
    });
  },
  name: `morpion`,
  description: `Joue au jeu Morpion.`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: `adversaire`,
      description: `Le membre contre qui tu veux jouer`,
      type: Discord.ApplicationCommandOptionType.User,
      required: true
    }
  ],
  permissionsRequired: [],
  botPermissions: []
};
