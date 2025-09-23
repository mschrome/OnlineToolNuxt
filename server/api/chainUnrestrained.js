import fs from 'fs/promises'

export default defineEventHandler(async (event) => {
    // 获取Get参数
    const params = getQuery(event);
    const startKey = params.keyWord
    if (!startKey) {
        return {
            status: "502",
            message: "Param Error."
        }
    }
    const endKey = "为所欲为";
    // 当前文件目录
    const filesDir = process.cwd()

    // 读取文件
    const fileContent = await fs.readFile(`${filesDir}/ExternalData/wsyw.txt`, 'utf-8')

    // 解析文件内容为list
    const graph = buildGraph(fileContent);
    const path = findPath(graph, startKey, endKey);

    if (!path) {
        return {
            status: 'success',
            message: `${startKey} 不能 ${endKey}`
        };
    }

    return {
        status: 'success',
        message: path.join(' -> ')
    };
})


// 将文本内容转化为图
const buildGraph = (text) => {
    const words = text.split('\n');
    const graph = {};

    words.forEach(word => {
        const firstChar = word[0];
        const lastChar = word[word.length - 1];

        if (!graph[firstChar]) {
            graph[firstChar] = [];
        }

        graph[firstChar].push({
            word,
            lastChar
        });
    });
    return graph;
}


// 在图中找到一条从startWord到endWord的路径
const findPath = (graph, startWord, endWord) => {
    const queue = [{word: startWord, path: []}];
    const used = new Set();

    while (queue.length) {
        const {word, path} = queue.shift();

        if (used.has(word)) {
            continue;
        }

        used.add(word);
        path.push(word);

        if (word.endsWith(endWord)) {
            return path;
        }

        const lastChar = word[word.length - 1];
        if (graph[lastChar]) {
            for (const next of graph[lastChar]) {
                queue.push({word: next.word, path: [...path]});
            }
        }
    }

    return null;
}
