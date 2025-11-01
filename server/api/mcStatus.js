import http from 'http'

export default defineEventHandler(async (event) => {
    const paramQuery = getQuery(event)
    const url = `http://localhost:8083/mcStatus?${new URLSearchParams(paramQuery)}`
    
    // 获取前端发送的所有 Header
    const incomingHeaders = getHeaders(event)
    
    // 构建要转发的 Header（过滤掉一些不需要的 Header）
    const forwardHeaders = {
        'Content-Type': 'application/json'
    }
    
    // 转发验证码相关的 Header
    const captchaHeaders = [
        'x-captcha-lot-number',
        'x-captcha-output', 
        'x-captcha-pass-token',
        'x-captcha-gen-time',
        'x-captcha-ticket',
        'x-captcha-randstr',
        'x-captcha-token',
        'x-captcha-action',
        'x-captcha-param',
        'x-captcha-scene',
        'x-captcha-app-id'
    ]
    
    captchaHeaders.forEach(headerName => {
        if (incomingHeaders[headerName]) {
            // 转换为首字母大写格式
            const capitalizedHeader = headerName.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('-')
            forwardHeaders[capitalizedHeader] = incomingHeaders[headerName]
        }
    })
    
    console.log('转发的 Header:', forwardHeaders)
    
    const response = await new Promise((resolve, reject) => {
        const request = http.get(url, {
            headers: forwardHeaders
        }, (res) => {
            let body = ''
            const statusCode = res.statusCode

            res.on('data', (chunk) => {
                body += chunk
            })

            res.on('end', () => {
                resolve({
                    statusCode: statusCode,
                    body: body
                })
            })
        })

        request.on('error', (err) => {
            reject(err)
        })
    })
    
    try {
        const result = JSON.parse(response.body.toString());
        
        // 处理后端返回的错误状态（如验证码验证失败）
        if (response.statusCode !== 200) {
            console.log(`后端返回错误状态码 ${response.statusCode}:`, result)
            throw createError({
                statusCode: response.statusCode,
                statusMessage: '请求失败'
            })
        }
        
        // 处理成功响应
        if (!result.flag) {
            throw createError({
                statusCode: 400,
                statusMessage: "数据解析失败"
            })
        }
        
        return {
            status: '1',
            message: result.data
        }
    }
    catch (error) {
        console.log("出现错误:", error)
        
        // 其他错误
        throw createError({
            statusCode: 500,
            statusMessage: '服务器内部错误'
        })
    }
})
