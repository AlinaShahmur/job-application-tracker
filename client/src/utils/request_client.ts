

const fetchData = async (method: any, body: any, url: string, token?: any, process_id?: string) => {
    try {
        let options : any = {
            method,
            headers: {
                "Content-type":"application/json"
            }
        }
        if (token) {
            options.headers['Authorization'] = token;
        }
        if (process_id) {
            options.headers['process_id'] = process_id; 
        }

        if (method !== 'get') {
            options['body'] = body;
        } 

        const res = await fetch(url,options);

        if (!res.ok) throw new Error(res.statusText);

        const response: any = await res.json();

        const responseStatus: number = response.hasOwnProperty("status") 
                                        ? response.status
                                        : res.status;

        const isResponseOk = response.hasOwnProperty("success") 
                            ? response.success
                            : true
        
        if (!isResponseOk || responseStatus >= 300) throw new Error("Error when fetching");
        if (response.data) return response.data;
        
        return response
    } catch(e) {
        console.log("Error in fetch", e);
        throw e
    }

}

export {fetchData}