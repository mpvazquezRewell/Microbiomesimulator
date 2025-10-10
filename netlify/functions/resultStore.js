const store = new Map();
const MAX_AGE_MS = 5 * 60 * 1000; // 5 minutes

function cleanup() {
    const expirationTime = Date.now() - MAX_AGE_MS;
    for (const [id, entry] of store.entries()) {
        if (entry.createdAt < expirationTime) {
            store.delete(id);
        }
    }
}

export function setProcessing(requestId) {
    cleanup();
    store.set(requestId, { status: 'processing', createdAt: Date.now() });
}

export function setResult(requestId, result) {
    cleanup();
    store.set(requestId, { status: 'complete', result, createdAt: Date.now() });
}

export function setError(requestId, message) {
    cleanup();
    store.set(requestId, { status: 'error', message, createdAt: Date.now() });
}

export function getEntry(requestId) {
    cleanup();
    return store.get(requestId);
}
