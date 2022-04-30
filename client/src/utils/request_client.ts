import axios from "axios"

const fetchData = async (method: any, body: any, url: string) => {
    const options = {
        url,
        method,
        data: body
    }
    const res = await axios(options)
    return res.data
}

export {fetchData}