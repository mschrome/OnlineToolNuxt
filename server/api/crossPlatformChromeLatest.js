import fs from 'fs/promises'

export default defineEventHandler(async (event) => {
    // 当前文件目录
    const filesDir = process.cwd()

    // 读取文件
    const fileContent = await fs.readFile(`${filesDir}/ExternalData/latestChromeData.json`, 'utf-8')
    const fileJSON = JSON.parse(fileContent)
    return {
        status: 'success',
        message: fileJSON
    };

})