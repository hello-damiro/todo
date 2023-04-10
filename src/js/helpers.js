export function delay(ms) {
    // asynchronous function to delay
    return new Promise((res) => setTimeout(res, ms));
}
