require('dotenv').config({ path: '../.env' });

const { handleVKMessage, startVKUpdates, vk } = require('./services/vk/index');
const { VK } = require('vk-io');

async function main() {
    vk.updates.on('message', handleVKMessage);
    await startVKUpdates();
}

main();