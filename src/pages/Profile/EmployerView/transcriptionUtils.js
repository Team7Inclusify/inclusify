// Import the required modules.
const openai = require('openai');
const fs = require('fs');
// Load environment variables from a .env file.
require('dotenv').config();

/**
 * Transcribe an audio file using OpenAI's API.
 *
 * @param {string} filename - The name of the audio file to transcribe.
 * @param {string} apiKey - The API key for authenticating with OpenAI.
 * @returns {Promise<Object>} - A promise that resolves with the transcription result.
 */
async function transcribeAudio(filename, apiKey) {
    try {
        // Initialize the OpenAI client with the given API key.
        const openAiClient = new openai.OpenAI({ apiKey });
        
        // Send the audio file for transcription using the specified model.
        const transcription = await openAiClient.audio.transcriptions.create({
            file: fs.createReadStream(filename),
            model: 'whisper-1'
        });
        
        // Return the transcription result.
        return transcription;
    } catch (error) {
        // Log any errors that occur during transcription.
        console.error('Error', error);
    }
}

module.exports = { transcribeAudio };
