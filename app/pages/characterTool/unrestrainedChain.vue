<script setup>
import cnchar from "cnchar";
import 'cnchar-idiom'

useHead({
  title: '为所欲为生成器-在线工具箱',
  meta: [
    {
      name: 'description',
      content:
          '给定特定的成语/词语，自动成语接龙至“为所欲为”为止~当然，一些词/成语，注定无法成语接龙到，等着你去发现',
    },
    {
      name: 'keywords',
      content: '在线工具箱,为所欲为生成器,成语接龙,为所欲为成语,为所欲为接龙'
    },
  ],
});
const toast = useToast();
const MAX_DEPTH = 100;           // 递归最大次数
let loading = ref(false)
let generatorRecursiveSpellOpen = ref(false)
let generatorTurboMode = ref(false)
let inputWord = ref();
let generatorChainsWords = ref('等待操作进行『为所欲为』')

/** 使用图的路径规划生成“为所欲为”接龙 */
const getIdiomChainTurbo = async () => {
  let {status, message} = await $fetch("/api/chainUnrestrained", {
    method: "GET",
    params: {
      keyWord: inputWord.value
    }
  }).catch(() => {
    toast.add({
      id: "Module Error",
      title: "\u5F53\u524D\u4E0D\u53EF\u7528",
      description: "\u64CD\u4F5C\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7B49\u4F1A\u518D\u8BD5\u8BD5",
      icon: "i-heroicons-face-frown-20-solid",
      timeout: 5e3
    });
  }).finally(()=>{
    loading.value = false
  })
  generatorChainsWords.value = message
}

/** 获取最后一个汉字的拼音或拼音 */
const getLastWordOrSpell = (s, spellYes) => {
  s = s || ''
  if (spellYes) {
    return cnchar.spell(s.replace(/^(.*[n])*.*(.|n)$/g, '$2')).toLowerCase()
  } else {
    return s.slice(-1);
  }
}

/** 洗牌算法 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** 主要函数: 获取 成语接龙链条 （递归） */
const getIdiomChainByRecursive = (lastWord, deep, find, outputResult, selected) => {
  let result = -3;

  if (selected.has(lastWord)) {
    // 当前词已经存在
    return -2;
  }

  // 获取所有以该拼音开头的成语数组
  const tempResArrSource = shuffleArray(cnchar.idiom(lastWord, generatorRecursiveSpellOpen.value ? 'spell' : 'char'))
  console.log(lastWord)
  const tempResArr = tempResArrSource.filter(item => {
    const lastCharacter = item.slice(-1); // 获取最后一个字符
    return !selected.has(lastCharacter); // 检查最后一个字符是否存在于 Set 内
  });
  if (!tempResArr.length) {
    return -1;
  }

  // 判断最后一个字的拼音是否是“为”
  const isFirstIdiomWei = ['wei', '为'].includes(getLastWordOrSpell(tempResArr[0], generatorRecursiveSpellOpen.value));

  if (isFirstIdiomWei) {
    // 如果是，直接将结果设置为"为所欲为"
    outputResult.push(tempResArr[0]);
    result = outputResult.join(' -> ');
  } else {
    for (let i = 0; i < tempResArr.length; i++) {
      // 本次遍历的成语
      const currentIdiom = tempResArr[i];
      // 本次遍历成语的最后一个字
      const currentLastWordSpell = getLastWordOrSpell(currentIdiom,generatorRecursiveSpellOpen.value);
      selected.add(lastWord)
      outputResult.push(currentIdiom);

      if (result === 0) {
        break;
      }

      if (currentLastWordSpell === '为') {
        // 如果最后一个字是"为"，找到了目标成语，结束循环
        result = outputResult.join(' -> ');
        break;
      } else {
        if (deep > MAX_DEPTH) {
          result = 0;
          break
        }
        // 否则，继续递归调用
        result = getIdiomChainByRecursive(currentLastWordSpell, deep++, false, outputResult, new Set(selected));

        if (result === -2) {
          // 没找到，或者深度达到最大
          outputResult.pop()
          continue
        }


        if (result && result !== -1) {
          break
        } else {
          // 如果没有找到结果，回溯，尝试其他成语
          outputResult.pop();
        }
      }
    }
  }
  return result;
};


const handleIdiomChain = () => {
  loading.value = true
  if (generatorTurboMode.value) {
    getIdiomChainTurbo();
    return;
  }
  const selected = new Set();
  const keyWord = inputWord.value
  const lastWord = getLastWordOrSpell(keyWord, generatorRecursiveSpellOpen.value)
  if (lastWord === '为') {
    generatorChainsWords.value = "『" + inputWord.value + "』不用『为所欲为』，也能『为所欲为』";
    loading.value = false;
    return
  }
  const chainWords = getIdiomChainByRecursive(lastWord, 0, false, [keyWord], selected)
  if (chainWords === -1) {
    generatorChainsWords.value = "『" + inputWord.value + "』不能『为所欲为』"
  } else if (chainWords === 0) {
    generatorChainsWords.value = "『" + inputWord.value + "』迷路了，请重试『为所欲为』"
  } else {
    generatorChainsWords.value = chainWords + "->为所欲为"
  }
  loading.value = false
}

const copyTheOutPutText = () => {
  const text = generatorChainsWords.value;
  navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.add({
          id: 'Module Success',
          title: '复制成功',
          description: '快去粘贴吧',
          icon: 'i-heroicons-face-smile-20-solid',
          timeout: 5000,
        });
      })
      .catch(() => {
        toast.add({
          id: 'Module Error',
          title: '复制失败',
          description: '请手动复制',
          icon: 'i-heroicons-face-frown-20-solid',
          timeout: 5000,
        });
      });
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          "为所欲为"生成器
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          递归⚡加长⚡静态版 - 智能成语接龙工具
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="tool-card">
        <!-- 输入区域 -->
        <div class="input-section">
          <div class="input-header">
            <div class="input-title">
              <UIcon name="i-heroicons-pencil-square" class="mr-2" />
              输入开头成语/词语
            </div>
          </div>
          <div class="input-container">
            <UInput 
              v-model="inputWord"
              size="xl"
              placeholder="请输入成语或词语，如：心想事成"
              icon="i-heroicons-sparkles"
              class="input-field"
            />
            <UButton
              :disabled="loading || !inputWord"
              :loading="loading"
              size="lg"
              class="generate-button"
              @click="handleIdiomChain()"
            >
              <UIcon name="i-heroicons-play" class="mr-2" />
              {{ loading ? '生成中...' : '开始接龙' }}
            </UButton>
          </div>
        </div>

        <!-- 设置区域 -->
        <div class="settings-section">
          <div class="setting-item">
            <div class="setting-label">
              <UIcon name="i-heroicons-cpu-chip" class="mr-2" />
              算法模式
            </div>
            <div class="setting-control">
              <span class="setting-text">
                {{ generatorTurboMode ? '路径规划算法' : '深度递归算法' }}
              </span>
              <USwitch
                v-model="generatorTurboMode"
                size="lg"
                on-icon="i-heroicons-rocket-launch"
                off-icon="i-heroicons-arrow-path"
              />
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-label">
              <UIcon name="i-heroicons-language" class="mr-2" />
              匹配模式
            </div>
            <div class="setting-control">
              <span class="setting-text">
                {{ generatorTurboMode || !generatorRecursiveSpellOpen ? '精确字匹配' : '多音字匹配' }}
              </span>
              <USwitch
                :disabled="generatorTurboMode"
                v-model="generatorRecursiveSpellOpen"
                size="lg"
                on-icon="i-heroicons-musical-note"
                off-icon="i-heroicons-hashtag"
              />
            </div>
          </div>
        </div>

        <!-- 结果区域 -->
        <div class="result-section">
          <div class="result-header">
            <div class="result-title">
              <UIcon name="i-heroicons-link" class="mr-2" />
              成语接龙结果
            </div>
            <UButton
              v-if="generatorChainsWords !== '等待操作进行『为所欲为』'"
              @click="copyTheOutPutText"
              variant="outline"
              size="sm"
            >
              <UIcon name="i-heroicons-clipboard-document" class="mr-1" />
              复制
            </UButton>
          </div>
          <div class="result-content">
            <p class="result-text" :class="{ 'loading': loading }">
              {{ generatorChainsWords }}
            </p>
          </div>
        </div>
      </div>

      <!-- 信息卡片 -->
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon about-icon">
            <UIcon name="i-heroicons-information-circle" />
          </div>
          <div class="info-content">
            <h3 class="info-title">什么是成语接龙？</h3>
            <p class="info-description">
              成语接龙是一种文字游戏，规则是用前一个成语的最后一个字作为后一个成语的第一个字，不断延续下去。本工具可以自动生成到"为所欲为"的接龙路径。
            </p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon algorithm-icon">
            <UIcon name="i-heroicons-cpu-chip" />
          </div>
          <div class="info-content">
            <h3 class="info-title">算法说明</h3>
            <ul class="info-list">
              <li><strong>深度递归算法：</strong>逐步搜索，支持多音字匹配</li>
              <li><strong>路径规划算法：</strong>快速计算最优路径</li>
              <li><strong>精确匹配：</strong>严格按字符匹配</li>
              <li><strong>多音字匹配：</strong>支持拼音相同的字</li>
            </ul>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon tips-icon">
            <UIcon name="i-heroicons-light-bulb" />
          </div>
          <div class="info-content">
            <h3 class="info-title">使用技巧</h3>
            <p class="info-description">
              • 输入常见成语成功率更高<br>
              • 尝试不同算法模式获得不同结果<br>
              • 某些词语可能无法接龙到"为所欲为"<br>
              • 多音字模式可以发现更多可能性
            </p>
          </div>
        </div>
      </div>

      <!-- 广告区域 -->
      <div class="ad-section">
        <div class="ad-container">
          <div class="wwads-cn wwads-horizontal" data-id="264"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 主工具卡片 */
.tool-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.tool-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

@media (prefers-color-scheme: dark) {
  .tool-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}

/* 输入区域 */
.input-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .input-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.input-header {
  margin-bottom: 1rem;
}

.input-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(30, 41, 59);
  font-size: 1.125rem;
}

@media (prefers-color-scheme: dark) {
  .input-title {
    color: white;
  }
}

.input-container {
  display: flex;
  gap: 1rem;
  align-items: end;
}

@media (max-width: 640px) {
  .input-container {
    flex-direction: column;
    align-items: stretch;
  }
}

.input-field {
  flex: 1;
}

.generate-button {
  background: linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119));
  border: none;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 120px;
}

.generate-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(147, 51, 234, 0.3);
}

.generate-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 设置区域 */
.settings-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .settings-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgb(248, 250, 252);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.setting-item:hover {
  background: rgb(241, 245, 249);
}

@media (prefers-color-scheme: dark) {
  .setting-item {
    background: rgb(51, 65, 85);
  }
  
  .setting-item:hover {
    background: rgb(71, 85, 105);
  }
}

.setting-label {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: rgb(30, 41, 59);
}

@media (prefers-color-scheme: dark) {
  .setting-label {
    color: white;
  }
}

.setting-control {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.setting-text {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .setting-text {
    color: rgb(148, 163, 184);
  }
}

/* 结果区域 */
.result-section {
  margin-bottom: 1rem;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.result-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(30, 41, 59);
  font-size: 1.125rem;
}

@media (prefers-color-scheme: dark) {
  .result-title {
    color: white;
  }
}

.result-content {
  background: rgb(248, 250, 252);
  border-radius: 0.75rem;
  padding: 1.5rem;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (prefers-color-scheme: dark) {
  .result-content {
    background: rgb(51, 65, 85);
  }
}

.result-text {
  text-align: center;
  word-break: break-all;
  line-height: 1.6;
  color: rgb(30, 41, 59);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.result-text.loading {
  color: rgb(147, 51, 234);
  animation: pulse 2s infinite;
}

@media (prefers-color-scheme: dark) {
  .result-text {
    color: white;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* 信息卡片网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  transition: all 0.3s ease;
}

.info-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

@media (prefers-color-scheme: dark) {
  .info-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.info-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.about-icon {
  background: linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119));
}

.algorithm-icon {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.tips-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
}

.info-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.75rem;
}

@media (prefers-color-scheme: dark) {
  .info-title {
    color: white;
  }
}

.info-description {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  line-height: 1.625;
}

@media (prefers-color-scheme: dark) {
  .info-description {
    color: rgb(148, 163, 184);
  }
}

.info-list {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  list-style: none;
  padding: 0;
}

.info-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.info-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(147, 51, 234);
  font-weight: bold;
}

@media (prefers-color-scheme: dark) {
  .info-list {
    color: rgb(148, 163, 184);
  }
}

/* 广告区域 */
.ad-section {
  text-align: center;
}

.ad-container {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .ad-container {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tool-card, .info-card {
  animation: fadeInUp 0.6s ease-out;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }

/* 响应式设计 */
@media (max-width: 768px) {
  .tool-card {
    padding: 1.5rem;
  }
  
  .input-container {
    gap: 0.75rem;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .setting-control {
    align-self: flex-end;
  }
  
  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>