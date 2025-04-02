export default async function postRequest(url, data) {

    const token = localStorage.getItem('stationary')
    // console.log(token)
    
    const res = await fetch(url, {
        method: 'POST',
        headers: {

            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const response = await res.json()

    return {status: res.status, data: response}
}