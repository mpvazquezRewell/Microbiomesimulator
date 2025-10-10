import { getEntry } from './resultStore.js';

// This standard Netlify Function returns the latest status of a Gemini analysis
// request previously triggered via the background function.
export const handler = async (event) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const requestId = event.queryStringParameters?.requestId;
    if (!requestId) {
        return { statusCode: 400, body: 'requestId query parameter is required.' };
    }

    const entry = getEntry(requestId);

    if (!entry) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'pending' })
        };
    }

    if (entry.status === 'complete') {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'complete', result: entry.result })
        };
    }

    if (entry.status === 'error') {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'error', message: entry.message })
        };
    }

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: entry.status })
    };
};
