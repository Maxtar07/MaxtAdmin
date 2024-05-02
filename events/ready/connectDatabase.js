const mongoose = require(`mongoose`);
const { config } = require(`../../utils/config`);
module.exports = (bot) => {
    (async () => {
        mongoose.set(`strictQuery`, false);
        await mongoose.connect(config.mongo_uri_vps);
        console.log(`Connected to DataBase`);
    })();
};