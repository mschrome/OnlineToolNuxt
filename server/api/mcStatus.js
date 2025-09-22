import http from 'http'

export default defineEventHandler(async (event) => {
    const paramQuery = getQuery(event)
    const url = `http://localhost:8083/mcStatus?${new URLSearchParams(paramQuery)}`
    const response = await new Promise((resolve, reject) => {
        const request = http.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        }, (res) => {
            let body = ''

            res.on('data', (chunk) => {
                body += chunk
            })

            res.on('end', () => {
                resolve(body)
            })
        })

        request.on('error', (err) => {
            reject(err)
        })
    })
    try {
        const result = JSON.parse(response.toString());
        if (!result.flag){
            throw new Error("Parsing failed");
        }
        return {
            status: '1',
            message: result.data
        }
    }
    catch (error){
        console.log("出现错误"+error)
        return {
            status: '0',
            message: error
        }
    }
})
