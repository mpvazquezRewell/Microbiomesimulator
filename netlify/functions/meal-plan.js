// This is the Netlify Function for generating a meal plan.
// It takes the previous analysis as context to create a relevant plan.

export const handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // 1. Get the previous analysis from the frontend
        const { lastAnalysis } = JSON.parse(event.body);
        if (!lastAnalysis) {
            return { statusCode: 400, body: 'Analysis context is required.' };
        }
        
        // 2. Get the secret API key from environment variables
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return { statusCode: 500, body: 'API key is not configured on the server.' };
        }

        // 3. Prepare the prompt for the Gemini API
        const prompt = `
            Basado en el siguiente análisis y recomendaciones para mejorar la salud intestinal, crea un ejemplo de plan de comidas para 1 día (desayuno, almuerzo, cena y un snack). El plan debe ser práctico, delicioso y específicamente diseñado para abordar los puntos mencionados en el análisis. Formatea la respuesta en español usando Markdown.

            **Análisis Previo:**
            ${lastAnalysis}
        `;
        
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
            return { statusCode: geminiResponse.status, body: `Gemini API Error: ${errorBody}` };
        }

        const result = await geminiResponse.json();

        // 5. Return the result to the frontend
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
