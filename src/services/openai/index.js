require('dotenv').config({ path: '../../../.env' });
const config = require('../../config/config');

const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

// Получение ответа на запрос пользователя с помощью OpenAI
async function getOpenAIResponse(userPrompt) {
    try {
        const response = await openai.createCompletion({
            model: config.OPENAI_MODEL,
            prompt: userPrompt,
            temperature: 0,
            max_tokens: config.MAX_TOKENS
        });

        return response.data.choices[0].text;
    } catch (error) {
        console.error("Ошибка при запросе OpenAi:", error);
        return config.RESPONSE_ERROR_MESSAGE;
    }
}

module.exports = { getOpenAIResponse };