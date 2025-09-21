/**
 * 腾讯云的 EdgeOne token 生成
 */

import md5 from 'js-md5';

function getPathFromUrl(fullUrl) {
    // 创建一个 URL 对象
    const urlObj = new URL(fullUrl);
    // 移除查询字符串
    urlObj.search = ''; // 或者使用 delete url.search;
    // 如果你还需要移除hash部分
    urlObj.hash = '';
    return {
        pureHost: `${urlObj.protocol}//${urlObj.hostname}`,
        purePath: urlObj.pathname,
        pureUrl: urlObj.toString()
    }
}

function getCurrentDateTime() {
    const now = new Date();
    return [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0'),
        String(now.getHours()).padStart(2, '0'),
        String(now.getMinutes()).padStart(2, '0')
    ].join('');
}

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * 101); // 生成 0 到 100 的随机长度
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}

function makeTokenA(fullUrl, secretKey, sign = "sign") {
    let host = getPathFromUrl(fullUrl);
    const signStr = sign || "sign";
    const timestampMilliseconds = Math.floor(Date.now() / 1000);
    const randomString = generateRandomString();
    console.log(`${host.purePath}-${timestampMilliseconds}-${randomString}-0-${secretKey}`)
    const token = md5(`${host.purePath}-${timestampMilliseconds}-${randomString}-0-${secretKey}`);
    return `${host.pureUrl}?${signStr}=${timestampMilliseconds}-${randomString}-0-${token}`;
}

function makeTokenB(fullUrl, secretKey) {
    let host = getPathFromUrl(fullUrl);
    const timestampMilliseconds = getCurrentDateTime();
    const token = md5(`${secretKey}${timestampMilliseconds}${host.purePath}`);
    return `${host.pureHost}/${timestampMilliseconds}/${token}${host.purePath}`;
}

function makeTokenC(fullUrl, secretKey) {
    let host = getPathFromUrl(fullUrl);
    const timestampMillisecondsHex = Math.floor(Date.now() / 1000).toString(16);
    const token = md5(`${secretKey}/${host.purePath}${timestampMillisecondsHex}`);
    return `${host.pureHost}/${token}/${timestampMillisecondsHex}${host.purePath}`;
}

function makeTokenD(fullUrl, secretKey,  sign = "sign",
                    tType="Dec",tKey = "t") {
    let host = getPathFromUrl(fullUrl);
    const signStr = sign || "sign";
    const tStr = tKey || "t";
    let timestampMilliseconds = Math.floor(Date.now() / 1000);
    console.log(timestampMilliseconds)
    if (tType === "Hex") {
        timestampMilliseconds = parseInt(timestampMilliseconds).toString(16);
    }
    console.log(timestampMilliseconds)
    const token = md5(`${secretKey}${host.purePath}${timestampMilliseconds}`);
    return `${host.pureUrl}?${signStr}=${token}&${tStr}=${timestampMilliseconds}`;
}

export function makeToken(fullUrl, secretKey, secretType, sign = "sign",
                          tType="Dec",tKey = "t") {
    switch (secretType) {
        case "A":
            return makeTokenA(fullUrl, secretKey, sign);
        case "B":
            return makeTokenB(fullUrl, secretKey);
        case "C":
            return makeTokenC(fullUrl, secretKey);
        case "D":
            return makeTokenD(fullUrl, secretKey, sign, tType, tKey);
        default:
            return makeTokenA(fullUrl, secretKey, sign);
    }
}
