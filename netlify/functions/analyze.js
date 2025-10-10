// Netlify Function for generating a Gemini analysis synchronously.

export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { speciesData } = JSON.parse(event.body || '{}');

        if (!speciesData || typeof speciesData !== 'string') {
            return { statusCode: 400, body: 'Species data is required.' };
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return { statusCode: 500, body: 'API key is not configured on the server.' };
        }

        const prompt = `
            Actúa como un experto en salud intestinal y nutricionista. A continuación se muestra el estado actual de un microbioma intestinal simulado.
            **Estado del Microbioma:**
            ${speciesData}
            Proporciona en español y formato Markdown:
            1.  **Un resumen del estado actual del ecosistema.**
            2.  **Las posibles implicaciones para la salud** de este desequilibrio.
            3.  **Tres recomendaciones dietéticas concretas** para restaurar el equilibrio.`;

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;
        const payload = { contents: [{ parts: [{ text: prompt }] }] };

        const geminiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.text();
            console.error('Gemini API Error:', errorBody);
            return { statusCode: geminiResponse.status, body: `Gemini API Error: ${errorBody}` };
        }

        const result = await geminiResponse.json();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        };
    } catch (error) {
        console.error('Serverless function error:', error);
        return { statusCode: 500, body: `Internal Server Error: ${error.message}` };
    }
};
