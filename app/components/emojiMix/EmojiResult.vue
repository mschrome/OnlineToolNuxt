<script setup>
import { vAutoAnimate } from '@formkit/auto-animate'

const props = defineProps({
  // Emoji的表情结果
  resultEmoji: {
    type: Array,
    default: []
  },
  // 过滤结果
  filterResultEmoji: {
    type: Array,
    default: []
  },
  loading: {
    type: Boolean,
    default: false
  },
  // 当前选择状态
  currentSelection: {
    type: Object,
    default: () => ({
      leftItem: "",
      rightItem: ""
    })
  }
});

const emit = defineEmits(['download']);

/**
 * 触发带有提供的下载URL的点击事件。
 *
 * @param {string} downloadUrl - 下载的URL
 * @return {void}
 */
const clickEmitDownload = (downloadUrl) => {
  emit('download', downloadUrl)
}
</script>

<template>
  <div class="result-container">
    <ClientOnly>
      <template #fallback>
        <div class="loading-placeholder">
          <div class="loading-icon">
            <UIcon name="i-heroicons-sparkles" class="text-4xl animate-spin" />
          </div>
          <p class="loading-text">正在加载 Emoji 数据...</p>
        </div>
      </template>

      <!-- 有结果时显示 -->
      <div v-if="resultEmoji.length > 0 && !loading" class="results-grid" v-auto-animate>
        <div class="result-header">
          <h3 class="result-title">
            <UIcon name="i-heroicons-sparkles" class="mr-2" />
            混合结果
          </h3>
          <div class="result-count">{{ filterResultEmoji.length }} 个结果</div>
        </div>
        
        <div class="emoji-results">
          <figure 
            v-for="item in filterResultEmoji"
            :key="item.image" 
            class="result-item"
            @click="clickEmitDownload(item.image)"
          >
            <NuxtImg 
              :src="item.image" 
              loading="lazy"
              :class="filterResultEmoji.length <= 2 ? 'result-large' : 'result-normal'"
              class="result-image"
              :alt="`混合结果: ${item.leftEmoji} + ${item.rightEmoji}`"
            />
            <div class="download-overlay">
              <UIcon name="i-heroicons-arrow-down-tray" class="text-white text-xl" />
            </div>
          </figure>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-else-if="loading" class="loading-state">
        <div class="loading-header">
          <h3 class="loading-title">
            <UIcon name="i-heroicons-cog-6-tooth" class="mr-2 animate-spin" />
            正在生成混合结果...
          </h3>
        </div>
        <div class="loading-grid">
          <figure v-for="item in 12" :key="item" class="loading-item">
            <USkeleton 
              class="w-20 h-20" 
              :ui="{ 
                rounded: 'rounded-xl',
                base: 'animate-pulse'
              }"
            />
          </figure>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <div class="empty-content">
          <div class="empty-icon">
            <UIcon name="i-heroicons-face-smile" class="text-6xl" />
          </div>
          <h3 class="empty-title">开始创造你的专属 Emoji</h3>
          <p class="empty-description">
            选择两个 Emoji 来创建独特的混合表情
          </p>
          
          <div class="selection-status">
            <div class="status-step" :class="{ completed: currentSelection.leftItem }">
              <div class="step-number">1</div>
              <span>选择第一个 Emoji</span>
              <UIcon v-if="currentSelection.leftItem" name="i-heroicons-check" class="text-green-500" />
            </div>
            <div class="status-step" :class="{ completed: currentSelection.rightItem }">
              <div class="step-number">2</div>
              <span>选择第二个 Emoji</span>
              <UIcon v-if="currentSelection.rightItem" name="i-heroicons-check" class="text-green-500" />
            </div>
          </div>

          <div class="credits">
            <p class="credits-title">特别感谢</p>
            <div class="credits-links">
              <a 
                href="https://github.com/xsalazar/emoji-kitchen" 
                target="_blank"
                class="credit-link"
              >
                xsalazar/emoji-kitchen
              </a>
              <a 
                href="https://blog.google/products/android/emoji-kitchen-new-mashups-mixing-experience/"
                target="_blank"
                class="credit-link"
              >
                Google EmojiMix
              </a>
            </div>
          </div>

          <div class="author-info">
            <div class="author-avatar">
              <img 
                src="https://www.mintimate.cn/custom/img/MintimateAvatar.png" 
                alt="Mintimate Avatar"
                class="avatar-image"
              />
            </div>
            <div class="author-details">
              <a href="https://www.mintimate.cn" target="_blank" class="author-name">
                Mintimate
              </a>
              <a 
                href="https://afdian.com/a/mintimate" 
                target="_blank"
                class="support-link"
              >
                喜欢这个项目？
              </a>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.result-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 500px;
  background: white;
  border-radius: 1rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  overflow: hidden;
}

.dark {
  .result-container {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

/* 加载占位符 */
.loading-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
}

.loading-icon {
  margin-bottom: 1rem;
  color: rgb(147, 51, 234);
}

.loading-text {
  color: rgb(100, 116, 139);
  font-size: 0.875rem;
}

.dark {
  .loading-text {
    color: rgb(148, 163, 184);
  }
}

/* 结果显示 */
.results-grid {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .result-header {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.result-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(30, 41, 59);
  font-size: 1.125rem;
}

.dark {
  .result-title {
    color: white;
  }
}

.result-count {
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
  background: rgb(248, 250, 252);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.dark {
  .result-count {
    color: rgb(148, 163, 184);
    background: rgb(51, 65, 85);
  }
}

.emoji-results {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.5rem;
  justify-content: center;
  flex: 1;
  overflow-y: auto;
}

.result-item {
  position: relative;
  margin: 0;
  cursor: pointer;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;
  background: rgb(248, 250, 252);
}

.result-item:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.dark {
  .result-item {
    background: rgb(15, 23, 42);
  }
}

.result-image {
  display: block;
  transition: all 0.3s ease;
}

.result-large {
  width: 8rem;
  height: 8rem;
}

.result-normal {
  width: 5rem;
  height: 5rem;
}

.download-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.result-item:hover .download-overlay {
  opacity: 1;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.loading-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .loading-header {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.loading-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(30, 41, 59);
  font-size: 1.125rem;
}

.dark {
  .loading-title {
    color: white;
  }
}

.loading-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.5rem;
  justify-content: center;
}

.loading-item {
  margin: 0;
}

/* 空状态 */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
}

.empty-content {
  text-align: center;
  max-width: 400px;
}

.empty-icon {
  color: rgb(100, 116, 139);
  margin-bottom: 1.5rem;
}

.dark {
  .empty-icon {
    color: rgb(148, 163, 184);
  }
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.75rem;
}

.dark {
  .empty-title {
    color: white;
  }
}

.empty-description {
  color: rgb(100, 116, 139);
  margin-bottom: 2rem;
}

.dark {
  .empty-description {
    color: rgb(148, 163, 184);
  }
}

.selection-status {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.status-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: rgb(248, 250, 252);
  transition: all 0.3s ease;
}

.status-step.completed {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.dark {
  .status-step {
    background: rgb(51, 65, 85);
  }
  
  .status-step.completed {
    background: rgba(34, 197, 94, 0.2);
  }
}

.step-number {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: rgb(100, 116, 139);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-step.completed .step-number {
  background: rgb(34, 197, 94);
}

.credits {
  margin-bottom: 1.5rem;
}

.credits-title {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  margin-bottom: 0.5rem;
}

.dark {
  .credits-title {
    color: rgb(148, 163, 184);
  }
}

.credits-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.credit-link {
  font-size: 0.75rem;
  color: rgb(59, 130, 246);
  text-decoration: underline;
  text-decoration-color: rgba(59, 130, 246, 0.5);
  text-underline-offset: 2px;
}

.credit-link:hover {
  text-decoration-color: rgb(59, 130, 246);
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
}

.author-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.author-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  text-decoration: none;
}

.author-name:hover {
  color: rgb(59, 130, 246);
}

.dark {
  .author-name {
    color: white;
  }
}

.support-link {
  font-size: 0.75rem;
  color: rgb(219, 39, 119);
  text-decoration: underline;
  text-decoration-style: wavy;
  text-underline-offset: 2px;
}
</style>