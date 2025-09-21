// 导出一个用于统计中英字数的函数
export function CountChineseCharacters(Words) {
  let sTotal = 0; // 初始化总字数
  let iTotal = 0; // 初始化汉字字数
  let eTotal = 0; // 初始化英文字数
  let inum = 0; // 初始化数字字数
  let iEmoji = 0; // 初始化Emoji元素

  let temWords = [];

  for (let c of Words) {
    if (c.match(/\p{Emoji_Presentation}/u)) {
      iEmoji++;
    }
    else {
      temWords.push(c);
    }
  }

  Words = temWords.join('');

  // 遍历输入的字符串
  for (let i = 0; i < Words.length; i++) {
    let c = Words.charAt(i);
    // 判断是否为基本汉字
    if (c.match(/[\u4e00-\u9fa5]/)) {
      iTotal++;
    }
    // 判断是否为基本汉字补充
    else if (c.match(/[\u9FA6-\u9fcb]/)) {
      iTotal++;
    }
  }

  // 再次遍历输入的字符串
  for (let i = 0; i < Words.length; i++) {
    let c = Words.charAt(i);
    // 判断是否为非ASCII字符（中文字符）
    if (c.match(/[^\x00-\xff]/)) {
      sTotal++;
    } else {
      eTotal++;
    }
    // 判断是否为数字
    if (c.match(/[0-9]/)) {
      inum++;
    }
  }

  // 计算各类字符数量
  let hanzi, zishu, biaodian, zimu, shuzi, zifu;
  hanzi = iTotal; // 汉字数量
  zishu = (inum + iTotal +iEmoji + eTotal ); // 总字数
  biaodian = sTotal - iTotal; // 标点符号数量
  zimu = (eTotal - inum); // 英文字母数量
  shuzi = inum; // 数字字符数量
  zifu = (iTotal * 2 + (sTotal - iTotal) * 2 + eTotal + iEmoji * 4); // 字符总数

  // 返回统计结果
  return {
    hanzi,
    zishu,
    biaodian,
    zimu,
    shuzi,
    zifu,
    iEmoji
  }
}