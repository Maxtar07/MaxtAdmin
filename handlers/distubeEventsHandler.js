const path = require(`path`);
const getAllFiles = require(`../utils/getAllFiles`);
module.exports = (bot) => {
  const eventFolders = getAllFiles(path.join(__dirname, `..`, `events`, `music`), true);
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);
    const eventName = eventFolder.replace(/\\/g, `/`).split(`/`).pop();
    bot.distube.on(eventName, async (...arg) => {
      for (const eventFile of eventFiles) {
        const distubeEventFunction = require(eventFile);
        await distubeEventFunction(bot, ...arg);
      }
    });
  }
};