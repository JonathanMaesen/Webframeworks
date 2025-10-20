export async function loadJson<T = unknown>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to load JSON: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (data === null || typeof data !== "object" || Array.isArray(data)) {
        throw new Error("Expected a single JSON object.");
    }
    return data as T;
}
