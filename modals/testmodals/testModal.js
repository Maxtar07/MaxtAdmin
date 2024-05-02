module.exports = {
    name: `testmodal`,
    description: `Formulaire de test pour essayer`,
    modalId: `testmodal`,
    execute: async (bot, interaction) => {
        interaction.reply({ content: `Votre formulaire à bien été envoyé`, ephemeral: true });
        const name = interaction.fields.getTextInputValue(`testname`);
        const about = interaction.fields.getTextInputValue(`testabout`);

        console.log(`Name: ${name} \n \nAbout the person: ${about}`)
    }

};