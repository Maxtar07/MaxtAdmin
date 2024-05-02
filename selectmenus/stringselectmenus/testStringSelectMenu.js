module.exports = {
    name: `testStringSelectMenu`,
    description: `Commande de test pour le String Select Menu`,
    stringSelectMenuId: `teststringselectmenu`,
    execute: async (bot, interaction) => {
        const selectedOptions = interaction.values; // Récupère toutes les options sélectionnées
        let response = `Options sélectionnées :`;
        selectedOptions.forEach((option) => {
            switch (option) {
                case `option1`:
                    response += `\n- Option 1`;
                    break;
                case `option2`:
                    response += `\n- Option 2`;
                    break;
                case `option3`:
                    response += `\n- Option 3`;
                    break;
            }
        });
        interaction.reply({ content: response });
    }
};
