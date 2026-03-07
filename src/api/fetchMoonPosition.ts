// fetch the moon's current 
export async function fetchMoonPosition() {
    const API_KEY = import.meta.env.VITE_APIVERSE_KEY

    const lat = import.meta.env.VITE_MELBOURNE_LAT
    const lon = import.meta.env.VITE_MELBOURNE_LON

    const url = `https://api.apiverve.com/v1/moonposition?lat=${lat}&lon=${lon}`

    const res = await fetch(url, {
        headers: {
            "X-API-Key": API_KEY
        }
    })

    const data = await res.json()

    console.log("Moon API:", data)

    return data
}

// temp for testing cause i only get 100 calls per month
export const tempMoonData = {
    status: "ok",
    error: null,
    data: {
        date: "03-20-2025",
        time: "14:30",
        coordinates: {
            latitude: -37.8136,
            longitude: 144.9631
        },
        moon: {
            altitude: -0.407908976399288,
            azimuth: 1.4720499058762104,
            distance: 404332.6834067969
        }
    }
}