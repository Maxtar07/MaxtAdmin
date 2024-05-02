const Discord = require(`discord.js`);
const { Snake } = require(`discord-gamecord`);
module.exports = {
  callback: async (bot, interaction) => {
    const Game = new Snake({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: `Snake`,
        overTitle: `Game Over`,
        color: `#5865F2`
      },
      emojis: {
        board: `⬛`,
        food: `🍎`,
        up: `⬆️`,
        down: `⬇️`,
        left: `⬅️`,
        right: `➡️`,
      },
      stopButton: `Stop`,
      timeoutTime: 60000,
      snake: { head: `🟢`, body: `🟩`, tail: `🟢`, skull: `💀` },
      foods: [`🍎`, `🍇`, `🍊`, `🫐`, `🥕`, `🥝`, `🌽`], playerOnlyMessage: `Seulement {player} peux utiliser ces bouttons`
    });

    Game.startGame();
    Game.on(`gameOver`, result => {
      return;
    });
  },
  name: `snake`,
  description: `Joue au jeu Snake.`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [],
  permissionsRequired: [],
  botPermissions: []
};
