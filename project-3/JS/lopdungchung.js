export const fetchAPI = async (api) => {
    const res = await fetch(api);
    const result = await res.json();
    return result;
}