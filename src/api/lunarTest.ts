// api logic for getting data on the moon


// this bitch steal's other people's shit
export async function getMoonPhase() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    return res.json();
}
