import fs from 'fs/promises'

export default defineEventHandler(async (event) => {
    // 获取Get参数
    const params = getQuery(event);
    const mode = params.emojiMode;
    const leftEmoji = params.leftEmoji;

    if (mode !== 'emoji') {
        return {
            status: 'bad params',
            message: 'Not Any More'
        }
    }

    // 当前文件目录
    const filesDir = process.cwd()

    // 读取文件
    const fileContent = await fs.readFile(`${filesDir}/ExternalData/emojiOutput.json`, 'utf-8')
    const fileJSON = JSON.parse(fileContent)

    if (leftEmoji) {
        const emojiJSON = fileJSON[leftEmoji].map(item => {
            const leftEmoji = emojiStrMake(item.leftEmoji)
            const rightEmoji = emojiStrMake(item.rightEmoji)
            return {
                leftEmoji: item.leftEmoji,
                rightEmoji: item.rightEmoji,
                image: `https://www.gstatic.com/android/keyboard/emojikitchen/${item.date}/${leftEmoji}/${leftEmoji}_${rightEmoji}.png`
            }
        })
        return {
            status: 'success',
            message: emojiJSON
        }
    }


    return {
        status: 'success',
        message: Object.keys(fileJSON).map(key => {
            return {
                item: key,
                disabled: true
            }
        })
    };

})

const emojiStrMake = (unicodeStr) => {
    return unicodeStr.split("-")
        .map(part => `u${part.toLowerCase()}`)
        .join("-")
}