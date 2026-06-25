const apiRequest = async (url, options = {}) => {
    const response = await fetch(`http://localhost:3001${url}`, {
        headers: {
            'content-type' : 'application/json',
            ...options.headers,
        },
        ...options,
    })

    if (!response.ok) {
        throw new Error (`HTTP error! status: ${request.status}`)
    }
    return await response.json()
}

export default apiRequest