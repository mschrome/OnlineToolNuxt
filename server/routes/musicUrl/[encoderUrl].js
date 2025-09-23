import { Utf8ArrayToStr } from '~/utils/longUrlMake';

export default defineEventHandler((event) => {
    const ooo = decodeURIComponent(event.context.params.encoderUrl);
    console.log(ooo)
    const dec = {
        '♫': '0',
        '♪': '1',
        '♬': '2',
        '¶': '3',
    };
    // 获取url的base 4字符串表示
    let b4str = ooo
        .split('')
        .map((x) => dec[x])
        .join('');

    if (b4str === undefined || b4str.length ===0){
        return sendRedirect(event, "/404", 302);
    }

    let utf8arr = [];
    // 每次解析4个字符
    // 记住添加前导0的填充
    for (let i = 0; i < b4str.length; i += 4)
        utf8arr.push(parseInt(b4str.substring(i, i + 4), 4));
    // 返回解码后的字符串
    let originUrl = Utf8ArrayToStr(utf8arr);
    return sendRedirect(event, originUrl, 302);
});
