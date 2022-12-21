export const fetchSearchData = async (url, data) => {
    const response = await fetch(url)

    if (!response.ok) {
        console.log(`Failed to fetch ${data}`);
    }

    return await response.json()
}