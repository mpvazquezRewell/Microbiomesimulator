import { setProcessing, setResult, setError } from './resultStore.js';

// This Netlify Background Function triggers the Gemini analysis and stores
// the response so it can be retrieved asynchronously from the frontend.
export const handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let requestId = '';

    try {
        // 1. Get data from the frontend
        const { speciesData, requestId: providedRequestId } = JSON.parse(event.body);

        if (!speciesData || typeof speciesData !== 'string') {
            return { statusCode: 400, body: 'Species data is required.' };
        }

        if (!providedRequestId || typeof providedRequestId !== 'string') {
            return { statusCode: 400, body: 'A valid requestId must be provided.' };
        }

        requestId = providedRequestId;
        setProcessing(requestId);

        // 2. Get the secret API key from environment variables
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            setError(requestId, 'API key is not configured on the server.');
            return { statusCode: 500, body: 'API key is not configured on the server.' };
        }

        // 3. Prepare the prompt for the Gemini API
        const prompt = `
            Actúa como un experto en salud intestinal y nutricionista. A continuación se muestra el estado actual de un microbioma intestinal simulado.
            **Estado del Microbioma:**
            ${speciesData}
            Proporciona en español y formato Markdown:
            1.  **Un resumen del estado actual del ecosistema.**
            2.  **Las posibles implicaciones para la salud** de este desequilibrio.
            3.  **Tres recomendaciones dietéticas concretas** para restaurar el equilibrio.`;

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const payload = { contents: [{ parts: [{ text: prompt }] }] };

        // 4. Call the Gemini API
        const geminiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.text();
            console.error('Gemini API Error:', errorBody);
            setError(requestId, `Gemini API Error: ${errorBody}`);
            return { statusCode: geminiResponse.status, body: `Gemini API Error: ${errorBody}` };
        }

        const result = await geminiResponse.json();
        setResult(requestId, result);

        // Background functions ignore returned values, but returning a value
        // keeps the handler consistent with standard functions.
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'processing', requestId })
        };
    } catch (error) {
        console.error('Serverless function error:', error);
        if (requestId) {
            setError(requestId, `Internal Server Error: ${error.message}`);
        }
        return { statusCode: 500, body: `Internal Server Error: ${error.message}` };
    }
};
