export default async function postRequest(url, data) {

    // console.log(data, token)

    const res = await fetch(url, {
        method: 'POST',
        headers: {

            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const response = await res.json()

    return response
}