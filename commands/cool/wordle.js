const Discord = require(`discord.js`);
const { Wordle } = require(`discord-gamecord`);
module.exports = {
  callback: async (bot, interaction) => {
    const game = new Wordle({
      message: interaction,
      isSlashGame: false,
      embed: {
        title: `Wordle`,
        color: `#5865f2`
      },
      timeoutTime: 60000,
      winMessage: `Tu as gagné !! Le mot était **{word}**`,
      loseMesage: `Tu as perdu !! Le mot était **{word}**`,
      playerOnlyMessage: `Seulement {player} peux utiliser les bouttons`
    })
    game.startGame();
    game.on(`gameOver`, result => {
      return;
    })
  },
  name: `wordle`,
  description: `Joue au jeu Wordle.`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [],
  permissionsRequired: [],
  botPermissions: []
};
