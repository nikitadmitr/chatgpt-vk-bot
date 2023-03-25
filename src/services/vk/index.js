require('dotenv').config({ path: '../../../env' });

const config = require('../../config/config');
const { getOpenAIResponse } = require('../openai/index');
const { VK } = require('vk-io')

const vk = new VK({ token: process.env.VK_API_KEY })

// Обработка сообщений VK
async function handleVKMessage(context, next) {
    const text = context.message.text;
    const isBotMessage = context.isOutbox;
    const isChat = context.isGroup || context.isChat;

    if (!isBotMessage && text.toLowerCase().startsWith('курт')) {
        const response = await getOpenAIResponse(text.slice(5));

        if (response) {
            context.send(response);
        } else {
            context.send(config.RESPONSE_ERROR_MESSAGE);
        }
    }

    await next();
}

// Запуск отслеживания событий в ВК
async function startVKUpdates() {
    try {
        await vk.updates.start();
    } catch (error) {
        console.error("Ошибка при запуске обновлений VK:", error);
    }
}

module.exports = {
    handleVKMessage,
    startVKUpdates,
    vk
};