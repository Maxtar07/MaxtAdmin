const path = require(`path`);
const getAllFiles = require(`../utils/getAllFiles`);
module.exports = (exceptions = []) => {
    let localMessageContextMenus = [];
    const messageContextMenuCategories = getAllFiles(path.join(__dirname, `..`, `contextmenus`), true);
    for (const messageContextMenuCategory of messageContextMenuCategories) {
        const messageContextMenuFiles = getAllFiles(messageContextMenuCategory);
        for (const messageContextMenuFile of messageContextMenuFiles) {
            const messageContextMenuObject = require(messageContextMenuFile);
            if (exceptions.includes(messageContextMenuObject.messageContextMenuId)) {
                continue;
            }
            localMessageContextMenus.push(messageContextMenuObject);
        }
    }
    return localMessageContextMenus;
};