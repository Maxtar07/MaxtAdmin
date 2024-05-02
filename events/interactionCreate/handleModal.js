module.exports = async (bot, interaction) => {
    if (!interaction.isModalSubmit()) return;
    const modalsHandler = require(`../../handlers/modalsHandler`);
    const localModals = modalsHandler();
    const modalObject = localModals.find((modal) => modal.modalId === interaction.customId);
    if (modalObject) {
        modalObject.execute(bot, interaction);
    } else {
        return;
    }
};
