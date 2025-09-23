<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          字符统计工具
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          快速统计文本的字符数、词数、行数等信息
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/30 mb-8 hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
        <!-- 输入区域 -->
        <div class="mb-8">
          <div class="flex items-center text-xl font-semibold text-slate-800 dark:text-white mb-6">
            <UIcon name="i-heroicons-document-text" class="mr-2 text-blue-500" />
            <span>文本输入</span>
          </div>

          <div>
            <UTextarea
              v-model="inputContent"
              placeholder="请输入或粘贴需要统计的文本内容..."
              class="w-full min-h-[300px] text-base leading-relaxed resize-none border-0 rounded-2xl p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-inner focus:bg-white/80 dark:focus:bg-slate-800/80 focus:shadow-lg transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              :rows="12"
            />
            <div class="flex justify-end gap-2 mt-4">
              <UButton
                @click="clearInput"
                :disabled="!inputContent"
                size="sm"
                color="red"
                variant="soft"
              >
                <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
                清空
              </UButton>
              <UButton
                @click="pasteFromClipboard"
                size="sm"
                color="blue"
                variant="soft"
              >
                <UIcon name="i-heroicons-clipboard" class="w-4 h-4 mr-1" />
                粘贴
              </UButton>
            </div>
          </div>
        </div>

        <!-- 分隔线 -->
        <div class="flex justify-center items-center my-8 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-300 dark:border-slate-600"></div>
          </div>
          <div class="relative bg-slate-50 dark:bg-slate-700 p-2 rounded-full border-2 border-slate-200 dark:border-slate-600">
            <UIcon name="i-heroicons-chart-bar" class="text-slate-500 dark:text-slate-400" />
          </div>
        </div>

        <!-- 统计结果区域 -->
        <div class="mt-8">
          <div class="flex items-center text-xl font-semibold text-slate-800 dark:text-white mb-6">
            <UIcon name="i-heroicons-calculator" class="mr-2 text-green-500" />
            <span>统计结果</span>
          </div>

          <!-- 统计卡片网格 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <!-- 字符数 -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-700/50">
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {{ statistics.characters }}
              </div>
              <div class="text-sm font-medium text-blue-700 dark:text-blue-300">
                字符数
              </div>
              <div class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                包含空格
              </div>
            </div>

            <!-- 字符数（不含空格） -->
            <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-6 text-center border border-green-200 dark:border-green-700/50">
              <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {{ statistics.charactersNoSpaces }}
              </div>
              <div class="text-sm font-medium text-green-700 dark:text-green-300">
                字符数
              </div>
              <div class="text-xs text-green-600 dark:text-green-400 mt-1">
                不含空格
              </div>
            </div>

            <!-- 词数 -->
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-700/50">
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {{ statistics.words }}
              </div>
              <div class="text-sm font-medium text-purple-700 dark:text-purple-300">
                词数
              </div>
              <div class="text-xs text-purple-600 dark:text-purple-400 mt-1">
                按空格分割
              </div>
            </div>

            <!-- 行数 -->
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl p-6 text-center border border-orange-200 dark:border-orange-700/50">
              <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {{ statistics.lines }}
              </div>
              <div class="text-sm font-medium text-orange-700 dark:text-orange-300">
                行数
              </div>
              <div class="text-xs text-orange-600 dark:text-orange-400 mt-1">
                按换行分割
              </div>
            </div>

            <!-- 段落数 -->
            <div class="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 rounded-2xl p-6 text-center border border-pink-200 dark:border-pink-700/50">
              <div class="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                {{ statistics.paragraphs }}
              </div>
              <div class="text-sm font-medium text-pink-700 dark:text-pink-300">
                段落数
              </div>
              <div class="text-xs text-pink-600 dark:text-pink-400 mt-1">
                按空行分割
              </div>
            </div>

            <!-- 句子数 -->
            <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-2xl p-6 text-center border border-indigo-200 dark:border-indigo-700/50">
              <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {{ statistics.sentences }}
              </div>
              <div class="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                句子数
              </div>
              <div class="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                按标点分割
              </div>
            </div>

            <!-- 平均词长 -->
            <div class="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 rounded-2xl p-6 text-center border border-teal-200 dark:border-teal-700/50">
              <div class="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                {{ statistics.averageWordLength }}
              </div>
              <div class="text-sm font-medium text-teal-700 dark:text-teal-300">
                平均词长
              </div>
              <div class="text-xs text-teal-600 dark:text-teal-400 mt-1">
                字符/词
              </div>
            </div>

            <!-- 阅读时间 -->
            <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 rounded-2xl p-6 text-center border border-cyan-200 dark:border-cyan-700/50">
              <div class="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                {{ statistics.readingTime }}
              </div>
              <div class="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                阅读时间
              </div>
              <div class="text-xs text-cyan-600 dark:text-cyan-400 mt-1">
                分钟（估算）
              </div>
            </div>
          </div>

          <!-- 详细分析 -->
          <div v-if="inputContent" class="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 border border-slate-200 dark:border-slate-600">
            <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
              <UIcon name="i-heroicons-chart-pie" class="mr-2 text-blue-500" />
              详细分析
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- 字符类型分布 -->
              <div>
                <h4 class="font-medium text-slate-700 dark:text-slate-300 mb-3">字符类型分布</h4>
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600 dark:text-slate-400">中文字符</span>
                    <span class="font-mono font-semibold text-slate-800 dark:text-white">{{ statistics.chineseChars }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600 dark:text-slate-400">英文字符</span>
                    <span class="font-mono font-semibold text-slate-800 dark:text-white">{{ statistics.englishChars }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600 dark:text-slate-400">数字字符</span>
                    <span class="font-mono font-semibold text-slate-800 dark:text-white">{{ statistics.numberChars }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600 dark:text-slate-400">标点符号</span>
                    <span class="font-mono font-semibold text-slate-800 dark:text-white">{{ statistics.punctuationChars }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600 dark:text-slate-400">空白字符</span>
                    <span class="font-mono font-semibold text-slate-800 dark:text-white">{{ statistics.whitespaceChars }}</span>
                  </div>
                </div>
              </div>

              <!-- 文本特征 -->
              <div>
                <h4 class="font-medium text-slate-700 dark:text-slate-300 mb-3">文本特征</h4>
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600 dark:text-slate-400">最长行字符数</span>
                    <span class="font-mono font-semibold text-slate-800 dark:text-white">{{ statistics.longestLine }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600 dark:text-slate-400">最短行字符数</span>
                    <span class="font-mono font-semibold text-slate-800 dark:text-white">{{ statistics.shortestLine }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600 dark:text-slate-400">平均行长度</span>
                    <span class="font-mono font-semibold text-slate-800 dark:text-white">{{ statistics.averageLineLength }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600 dark:text-slate-400">空行数</span>
                    <span class="font-mono font-semibold text-slate-800 dark:text-white">{{ statistics.emptyLines }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600 dark:text-slate-400">文本密度</span>
                    <span class="font-mono font-semibold text-slate-800 dark:text-white">{{ statistics.textDensity }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 信息卡片区域 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-slate-700/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-bolt-16-solid" class="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
          <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">实时统计</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            输入文本时自动更新统计结果，无需手动刷新，提供即时反馈。
          </p>
        </div>

        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-slate-700/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-chart-bar-square" class="text-2xl text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">多维度分析</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            提供字符、词汇、行数、段落等多个维度的详细统计分析。
          </p>
        </div>

        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-slate-700/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-language" class="text-2xl text-purple-600 dark:text-purple-400" />
          </div>
          <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">多语言支持</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            支持中文、英文等多种语言的字符统计，智能识别字符类型。
          </p>
        </div>
      </div>

      <!-- 广告位 -->
      <div class="text-center">
        <div class="inline-block bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 dark:border-slate-700/30">
          <div class="wwads-cn wwads-horizontal" data-id="264"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const toast = useToast();

useHead({
  title: '字符统计工具-在线工具箱',
  meta: [
    {
      name: 'description',
      content: '在线字符统计工具，快速统计文本的字符数、词数、行数、段落数等信息，支持中英文混合文本。',
    },
    {
      name: 'keywords',
      content: '在线工具箱,字符统计,字数统计,文本分析,词数统计,行数统计',
    },
  ],
});

// 响应式数据
const inputContent = ref('');

// 计算统计信息
const statistics = computed(() => {
  const text = inputContent.value;
  
  if (!text) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      lines: 0,
      paragraphs: 0,
      sentences: 0,
      averageWordLength: 0,
      readingTime: 0,
      chineseChars: 0,
      englishChars: 0,
      numberChars: 0,
      punctuationChars: 0,
      whitespaceChars: 0,
      longestLine: 0,
      shortestLine: 0,
      averageLineLength: 0,
      emptyLines: 0,
      textDensity: 0,
    };
  }

  // 基础统计
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split('\n').length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
  const sentences = text.split(/[.!?。！？]+/).filter(s => s.trim()).length;
  
  // 平均词长
  const averageWordLength = words > 0 ? Math.round((charactersNoSpaces / words) * 10) / 10 : 0;
  
  // 阅读时间（按每分钟200词计算）
  const readingTime = Math.ceil(words / 200);

  // 字符类型统计
  const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const englishChars = (text.match(/[a-zA-Z]/g) || []).length;
  const numberChars = (text.match(/[0-9]/g) || []).length;
  const punctuationChars = (text.match(/[.,;:!?。，；：！？]/g) || []).length;
  const whitespaceChars = (text.match(/\s/g) || []).length;

  // 行统计
  const textLines = text.split('\n');
  const nonEmptyLines = textLines.filter(line => line.trim());
  const lineLengths = nonEmptyLines.map(line => line.length);
  const longestLine = lineLengths.length > 0 ? Math.max(...lineLengths) : 0;
  const shortestLine = lineLengths.length > 0 ? Math.min(...lineLengths) : 0;
  const averageLineLength = lineLengths.length > 0 ? Math.round((lineLengths.reduce((a, b) => a + b, 0) / lineLengths.length) * 10) / 10 : 0;
  const emptyLines = textLines.length - nonEmptyLines.length;
  
  // 文本密度（非空白字符占比）
  const textDensity = characters > 0 ? Math.round((charactersNoSpaces / characters) * 100) : 0;

  return {
    characters,
    charactersNoSpaces,
    words,
    lines,
    paragraphs,
    sentences,
    averageWordLength,
    readingTime,
    chineseChars,
    englishChars,
    numberChars,
    punctuationChars,
    whitespaceChars,
    longestLine,
    shortestLine,
    averageLineLength,
    emptyLines,
    textDensity,
  };
});

// 方法
const clearInput = () => {
  inputContent.value = '';
  toast.add({
    title: '已清空',
    description: '文本内容已清空',
    icon: 'i-heroicons-trash',
    color: 'green',
    timeout: 2000,
  });
};

const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    inputContent.value = text;
    toast.add({
      title: '粘贴成功',
      description: '已从剪贴板粘贴内容',
      icon: 'i-heroicons-clipboard-document-check',
      color: 'green',
      timeout: 3000,
    });
  } catch (error) {
    toast.add({
      title: '粘贴失败',
      description: '无法访问剪贴板，请手动粘贴',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'red',
      timeout: 5000,
    });
  }
};

// 初始化示例文本
onMounted(() => {
  inputContent.value = `欢迎使用字符统计工具！

这是一个功能强大的文本分析工具，可以帮助您快速统计文本的各种信息。

主要功能包括：
1. 字符数统计（包含和不包含空格）
2. 词数统计
3. 行数和段落数统计
4. 句子数统计
5. 字符类型分析
6. 阅读时间估算

支持中英文混合文本，实时更新统计结果。请在上方输入框中输入或粘贴您需要分析的文本内容。`;
});
</script>

<style scoped>
/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
</style>