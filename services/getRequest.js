export default async function getRequest(url) {

    try {

        const token = localStorage.getItem('stationary')

        const response = await fetch(url, {

            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const json = await response.json();
        
        return {status: response.status, data: json}
    } catch (error) {
        console.log(error);
    }

}