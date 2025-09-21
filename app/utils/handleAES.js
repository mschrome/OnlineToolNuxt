//引用AES源码js
import CryptoJS from 'crypto-js'

const IV = "1"
const KEY = "HelloWorld"

//加密方法
/**
 * 使用AES算法对密文进行加密
 * @param {string} ciphertextB64 - Base64编码的密文
 * @returns {string} - 加密后的密文
 */
export function Encrypt(ciphertextB64) {
    // 将密钥转换为字节数组
    let keyByteArray = CryptoJS.enc.Utf8.parse(KEY);

    // 如果密钥字节数小于32，则补齐到32字节
    if (keyByteArray.sigBytes < 32) {
        let paddingLength = 32 - keyByteArray.sigBytes;
        let paddingBytes = Array(paddingLength + 1).join('\x00');
        keyByteArray.concat(CryptoJS.enc.Utf8.parse(paddingBytes));
    } else {
        keyByteArray = keyByteArray.slice(0, 32);
    }

    // 将初始向量转换为字节数组
    let ivByteArray = CryptoJS.enc.Utf8.parse(IV);

    // 如果初始向量字节数小于16，则补齐到16字节
    if (ivByteArray.sigBytes < 16) {
        let paddingLength = 16 - ivByteArray.sigBytes;
        let paddingBytes = Array(paddingLength + 1).join('\x00');
        ivByteArray.concat(CryptoJS.enc.Utf8.parse(paddingBytes));
    } else {
        ivByteArray = ivByteArray.slice(0, 16);
    }

    // 进行AES加密
    const encrypted = CryptoJS.AES.encrypt(ciphertextB64, keyByteArray, {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString()
}

/**
 * 使用AES算法对密文进行解密
 * @param {string} encryptedText - 加密的密文
 * @returns {string} - 解密后的明文
 */
export function Decrypt(encryptedText) {
    // 将密钥转换为字节数组
    let keyByteArray = CryptoJS.enc.Utf8.parse(KEY);

    // 如果密钥字节数小于32，则补齐到32字节
    if (keyByteArray.sigBytes < 32) {
        let paddingLength = 32 - keyByteArray.sigBytes;
        let paddingBytes = Array(paddingLength + 1).join('\x00');
        keyByteArray.concat(CryptoJS.enc.Utf8.parse(paddingBytes));
    } else {
        keyByteArray = keyByteArray.slice(0, 32);
    }

    // 将初始向量转换为字节数组
    let ivByteArray = CryptoJS.enc.Utf8.parse(IV);

    // 如果初始向量字节数小于16，则补齐到16字节
    if (ivByteArray.sigBytes < 16) {
        let paddingLength = 16 - ivByteArray.sigBytes;
        let paddingBytes = Array(paddingLength + 1).join('\x00');
        ivByteArray.concat(CryptoJS.enc.Utf8.parse(paddingBytes));
    } else {
        ivByteArray = ivByteArray.slice(0, 16);
    }

    // 进行AES解密
    const decrypted = CryptoJS.AES.decrypt(encryptedText, keyByteArray, {
        iv: ivByteArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}