const BASE_URL = typeof window !== 'undefined' ? '/api' : (process.env.NEXT_PUBLIC_API_URL || 'https://api.dreamazebook.com/api');

async function request(method, url, body, config = {}) {
    const fullUrl = `${BASE_URL}${url}`;
    const headers = { 'Content-Type': 'application/json', ...config.headers };

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(fullUrl, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        ...config,
    });

    const text = await res.text();
    let data = null;
    if (text) {
        try { data = JSON.parse(text); } catch { data = text; }
    }

    if (!res.ok) {
        if (res.status === 401 && typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
        const err = new Error(data?.message || `Request failed with status ${res.status}`);
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data;
}

const api = {
    get: (url, config) => request('GET', url, undefined, config),
    post: (url, data, config) => request('POST', url, data, config),
    put: (url, data, config) => request('PUT', url, data, config),
    delete: (url, config) => request('DELETE', url, undefined, config),
};

export default api;
