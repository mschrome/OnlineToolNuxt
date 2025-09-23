import fs from 'fs/promises'

export default defineEventHandler(async (event) => {
    // 获取Get参数
    const params = getQuery(event);
    const keyword = params.keyword;

    if (!keyword || keyword.length < 3) {
        return {
            status: 'bad params',
            message: 'Key Word At Least 3'
        }
    }

    // 当前文件目录
    const filesDir = process.cwd()

    // 读取文件
    const fileContent = await fs.readFile(`${filesDir}/ExternalData/emojiKeywords.json`, 'utf-8')
    const fileJSON = JSON.parse(fileContent)

    const emojiList = [];

    for (const key in fileJSON) {
        if (key.includes(keyword)) {
            emojiList.push(...fileJSON[key]);
        }
    }

    return {
        status: 'success',
        message: emojiList
    }

})