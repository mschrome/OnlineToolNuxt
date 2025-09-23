<script setup>
import { ref, computed, onMounted } from "vue";
import EmojiResult from "~/components/emojiMix/EmojiResult.vue";

useHead({
  title: 'EmojiMix合成器-在线工具箱',
  meta: [
    {
      name: 'description',
      content: '每次你发信息时都喜欢加上emoji？那有没有想过要有一些很特别的emoji呢？emojimix合成器将能够让你用两个不同的Emoji表情，合成出别具特色的新Emoji表情。',
    },
    {
      name: 'keywords',
      content: '在线工具箱,emoji厨房,emoji kitchen,emoji合成器网页版,emoji组合表情,emoji混搭Emoji表情包,emojimix合成器'
    },
  ],
});

const toast = useToast();

let leftEmoji = ref([]);
let currentEmojiComb = ref({
  leftItem: "",
  rightItem: ""
});
let leftEmojiMiddle = ref(false);
let rightEmoji = ref([]);
let resultEmoji = ref([]);
let loading = ref(false);
let showDownloadTabs = ref(false);
let downloadUrl = ref("");

// 使用选中的左右Emoji对Result结果进行过滤
const filterResultEmoji = computed(() => {
  const rightItem = currentEmojiComb.value.rightItem
  if (!rightItem) return resultEmoji.value
  const filtered = resultEmoji.value.filter(emoji =>
      emoji.leftEmoji === rightItem || emoji.rightEmoji === rightItem
  )
  if (currentEmojiComb.value.leftItem === rightItem) {
    return filtered.filter(emoji =>
        emoji.leftEmoji === rightItem &&
        emoji.rightEmoji === rightItem
    )
  }
  return filtered
})

onMounted(async () => {
  let {status, message} = await $fetch("/api/emojiRaw", {
    method: "GET",
    params: {
      emojiMode: 'emoji',
    }
  }).catch(() => {
    toast.add({
      id: "Module Error",
      title: "当前不可用",
      description: "操作过于频繁，请等会再试试",
      icon: "i-heroicons-face-frown-20-solid",
      timeout: 5000
    });
  }).finally(() => {
  })
  rightEmoji.value = JSON.parse(JSON.stringify(message))
  leftEmoji.value = JSON.parse(JSON.stringify(message))
})

/**
 * 点击左侧表情符号触发刷新。
 */
const clickLeftEmoji = async (unicodeStr) => {
  // 如果当前选定的左侧表情符号已经被选中，则重置数值并禁用右侧表情符号
  if (currentEmojiComb.value.leftItem === unicodeStr.item) {
    resultEmoji.value = []
    rightEmoji.value.forEach(obj => {
      obj.disabled = true;
    });
    currentEmojiComb.value.leftItem = ""
    return
  }

  // 创建右侧表情符号数组的副本
  let tempRightEmoji = [...rightEmoji.value]

  // 禁用所有右侧表情符号
  rightEmoji.value.forEach(obj => {
    obj.disabled = true;
  });

  // 设置当前选定的左侧表情符号并显示加载状态
  currentEmojiComb.value.leftItem = unicodeStr.item
  currentEmojiComb.value.rightItem = ""
  loading.value = true

  try {
    // 从API获取数据
    const response = await $fetch("/api/emojiRaw", {
      method: "GET",
      params: {
        emojiMode: 'emoji',
        leftEmoji: unicodeStr.item
      }
    })
    const { status, message } = response

    // 清空结果表情符号数组
    resultEmoji.value = []

    // 创建一个集合来存储右侧表情符号的值
    let hasEmojiSet = new Set()

    // 遍历message数组，填充结果表情符号数组和表情符号值的集合
    let hasSelf = false;
    message.forEach(obj => {
      resultEmoji.value.push(obj)
      if (obj.leftEmoji === obj.rightEmoji) {
        hasSelf = true;
      }
      hasEmojiSet.add(obj.leftEmoji)
      hasEmojiSet.add(obj.rightEmoji)
    })
    !hasSelf ? hasEmojiSet.delete(unicodeStr.item) : ""

    // 根据表情符号值的集合更新右侧表情符号的disabled属性
    tempRightEmoji.forEach(obj => {
      obj.disabled = !hasEmojiSet.has(obj.item)
    })

    // 更新右侧表情符号数组并重置leftEmojiMiddle的值
    rightEmoji.value = [...tempRightEmoji]
    leftEmojiMiddle.value = false
  } catch (error) {
    // 处理任何错误并显示提示消息
    toast.add({
      id: "Module Error",
      title: "当前不可用",
      description: "操作过于频繁，请等会再试试",
      icon: "i-heroicons-face-frown-20-solid",
      timeout: 5000
    })
  } finally {
    // 隐藏加载状态
    loading.value = false
  }
}

/**
 * 点击右侧的Emoji触发刷新
 * @param {object} clickItemWithUnicodeStr - 点击的表情对象
 */
const clickRightEmoji = (clickItemWithUnicodeStr) => {
  // 如果点击的表情对象和当前右侧选定的表情符号相同，则还原filterResultEmoji为result
  if (clickItemWithUnicodeStr.item === currentEmojiComb.value.rightItem) {
    leftEmojiMiddle.value = true
    currentEmojiComb.value.rightItem = ""
  }
  else if (!clickItemWithUnicodeStr.disabled) {
    // 设置左侧表情中间状态为true
    leftEmojiMiddle.value = true
    // 设置当前点击的currentEmojiComb中右侧Emoji为clickItemWithUnicodeStr
    currentEmojiComb.value.rightItem = clickItemWithUnicodeStr.item
  }
}

/** 下载图片 */
const downloadImage = (image) => {
  showDownloadTabs.value = true;
  downloadUrl.value = image
}

/** 清空选择 */
const clearSelection = () => {
  currentEmojiComb.value = {
    leftItem: "",
    rightItem: ""
  }
  resultEmoji.value = []
  rightEmoji.value.forEach(obj => {
    obj.disabled = false;
  });
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-7xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Emoji Mix 合成器
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          融合两个 Emoji，创造独特的表情符号
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="tool-card">
        <!-- 状态指示区域 -->
        <div class="status-section">
          <div class="status-indicators">
            <div class="status-item" :class="{ active: currentEmojiComb.leftItem }">
              <div class="status-icon left-icon">
                <UIcon name="i-heroicons-hand-thumb-up" />
              </div>
              <span class="status-text">选择左侧 Emoji</span>
            </div>
            
            <div class="status-arrow">
              <UIcon name="i-heroicons-plus" class="text-2xl" />
            </div>
            
            <div class="status-item" :class="{ active: currentEmojiComb.rightItem }">
              <div class="status-icon right-icon">
                <UIcon name="i-heroicons-hand-thumb-up" />
              </div>
              <span class="status-text">选择右侧 Emoji</span>
            </div>
            
            <div class="status-arrow">
              <UIcon name="i-heroicons-arrow-right" class="text-2xl" />
            </div>
            
            <div class="status-item" :class="{ active: filterResultEmoji.length > 0 }">
              <div class="status-icon result-icon">
                <UIcon name="i-heroicons-sparkles" />
              </div>
              <span class="status-text">生成结果</span>
            </div>
          </div>
        </div>

        <!-- Emoji 选择和结果区域 -->
        <div class="emoji-workspace">
          <!-- 左侧 Emoji 选择器 -->
          <div class="emoji-selector left-selector">
            <div class="selector-header">
              <h3 class="selector-title">
                <UIcon name="i-heroicons-face-smile" class="mr-2" />
                选择第一个 Emoji
              </h3>
              <div class="emoji-count">{{ leftEmoji.length }} 个表情</div>
            </div>
            <div class="emoji-container">
              <ClientOnly>
                <EmojiMixEmojiList 
                  :emojis="leftEmoji" 
                  @click.debounce="clickLeftEmoji" 
                  :ignore-disable="true"
                  :selected-emoji="currentEmojiComb.leftItem"
                />
                <template #fallback>
                  <div class="emoji-skeleton">
                    <figure v-for="i in 64" :key="i" class="skeleton-item">
                      <USkeleton class="w-10 h-10" :ui="{ rounded: 'rounded-lg' }"/>
                    </figure>
                  </div>
                </template>
              </ClientOnly>
            </div>
          </div>

          <!-- 中间结果区域 -->
          <div class="result-area" :class="{ 'has-results': currentEmojiComb.leftItem }">
            <EmojiResult 
              :resultEmoji="resultEmoji"
              :filterResultEmoji="filterResultEmoji"
              :loading="loading" 
              :current-selection="currentEmojiComb"
              @download="downloadImage" 
            />
          </div>

          <!-- 右侧 Emoji 选择器 -->
          <div class="emoji-selector right-selector">
            <div class="selector-header">
              <h3 class="selector-title">
                <UIcon name="i-heroicons-face-smile" class="mr-2" />
                选择第二个 Emoji
              </h3>
              <div class="emoji-count">{{ rightEmoji.filter(e => !e.disabled).length }} 个可用</div>
            </div>
            <div class="emoji-container">
              <ClientOnly>
                <EmojiMixEmojiList 
                  :emojis="rightEmoji" 
                  @click.debounce="clickRightEmoji" 
                  :ignore-disable="false"
                  :selected-emoji="currentEmojiComb.rightItem"
                />
                <template #fallback>
                  <div class="emoji-skeleton">
                    <figure v-for="i in 64" :key="i" class="skeleton-item">
                      <USkeleton class="w-10 h-10" :ui="{ rounded: 'rounded-lg' }"/>
                    </figure>
                  </div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>

        <!-- 操作按钮区域 -->
        <div class="action-section">
          <UButton
            @click="clearSelection"
            :disabled="!currentEmojiComb.leftItem && !currentEmojiComb.rightItem"
            variant="outline"
            size="lg"
            color="red"
            class="danger-button"
          >
            <UIcon name="i-heroicons-arrow-path" class="mr-2" />
            重新开始
          </UButton>
        </div>
      </div>

      <!-- 信息卡片 -->
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon about-icon">
            <UIcon name="i-heroicons-information-circle" />
          </div>
          <div class="info-content">
            <h3 class="info-title">什么是 Emoji Mix？</h3>
            <p class="info-description">
              Emoji Mix 是 Google 推出的表情符号混合功能，可以将两个不同的 Emoji 合成为一个全新的表情符号，创造出独特有趣的组合效果。
            </p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon usage-icon">
            <UIcon name="i-heroicons-light-bulb" />
          </div>
          <div class="info-content">
            <h3 class="info-title">使用方法</h3>
            <ul class="info-list">
              <li>先点击左侧选择第一个 Emoji</li>
              <li>再点击右侧选择第二个 Emoji</li>
              <li>查看中间生成的混合结果</li>
              <li>点击结果图片即可下载</li>
            </ul>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon creative-icon">
            <UIcon name="i-heroicons-sparkles" />
          </div>
          <div class="info-content">
            <h3 class="info-title">创意应用</h3>
            <p class="info-description">
              混合后的 Emoji 可以用于社交媒体、聊天应用、创意设计等场景，为你的表达增添独特的个性化元素。
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

    <!-- 下载模态框 -->
    <EmojiMixEmojiDownload 
      :show-modal="showDownloadTabs" 
      :image-url="downloadUrl"
      @close="showDownloadTabs = false"
    />
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

/* 状态指示区域 */
.status-section {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .status-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.status-indicators {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.status-item.active .status-icon {
  background: linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119));
  color: white;
  transform: scale(1.1);
}

.status-item.active .status-text {
  color: rgb(147, 51, 234);
  font-weight: 600;
}

.status-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(248, 250, 252);
  color: rgb(100, 116, 139);
  transition: all 0.3s ease;
}

@media (prefers-color-scheme: dark) {
  .status-icon {
    background: rgb(51, 65, 85);
    color: rgb(148, 163, 184);
  }
}

.status-text {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  transition: all 0.3s ease;
}

@media (prefers-color-scheme: dark) {
  .status-text {
    color: rgb(148, 163, 184);
  }
}

.status-arrow {
  color: rgb(100, 116, 139);
}

@media (prefers-color-scheme: dark) {
  .status-arrow {
    color: rgb(148, 163, 184);
  }
}

/* Emoji 工作区域 */
.emoji-workspace {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
  min-height: 500px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 1024px) {
  .emoji-workspace {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.emoji-selector {
  display: flex;
  flex-direction: column;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.selector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .selector-header {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.selector-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(30, 41, 59);
  font-size: 1.125rem;
}

@media (prefers-color-scheme: dark) {
  .selector-title {
    color: white;
  }
}

.emoji-count {
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
  background: rgb(248, 250, 252);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

@media (prefers-color-scheme: dark) {
  .emoji-count {
    color: rgb(148, 163, 184);
    background: rgb(51, 65, 85);
  }
}

.emoji-container {
  flex: 1;
  overflow-y: auto;
  max-height: 500px;
  padding: 0.5rem;
  border-radius: 0.75rem;
  background: rgb(248, 250, 252);
  transition: all 0.3s ease;
}

.emoji-container:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  .emoji-container {
    background: rgb(15, 23, 42);
  }
}

.emoji-skeleton {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.skeleton-item {
  margin: 0;
}

.result-area {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: scale(0.95);
}

.result-area.has-results {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 1024px) {
  .result-area {
    min-width: auto;
    order: -1;
  }
}

/* 操作按钮区域 */
.action-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
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

.usage-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
}

.creative-icon {
  background: linear-gradient(to right, rgb(249, 115, 22), rgb(239, 68, 68));
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
}

.info-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(34, 197, 94);
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

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.tool-card, .info-card {
  animation: fadeInUp 0.6s ease-out;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }

/* Emoji 选择器动画 */
.left-selector {
  animation: slideInFromLeft 0.5s ease-out;
}

.right-selector {
  animation: slideInFromRight 0.5s ease-out;
}

.result-area {
  animation: scaleIn 0.5s ease-out 0.2s both;
}

/* 平滑的布局过渡 */
.emoji-workspace > * {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 当选择了左侧 Emoji 时的特殊样式 */
.emoji-workspace:has(.has-results) .left-selector {
  transform: scale(0.98);
}

.emoji-workspace:has(.has-results) .right-selector {
  transform: scale(0.98);
}
</style>