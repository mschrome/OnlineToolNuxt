<script setup>
import FileSaver from 'file-saver'

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
    required: false
  },
  imageUrl: {
    type: String,
    required: true
  }
})

// 定义事件
const emit = defineEmits(['close'])


/** 下载图片 */
const downloadImage = (imageUrl) => {
  // 直接下载
  FileSaver.saveAs(imageUrl, 'emojiMix')
  emit('close')
}

</script>

<template>
  <!-- 下载确认模态框 -->
  <div
    v-if="showModal"
    class="modal-overlay"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="modal-container">
      <!-- 背景遮罩 -->
      <div 
        class="modal-backdrop" 
        @click="emit('close')"
        aria-hidden="true"
      ></div>
      
      <!-- 模态框内容 -->
      <div class="modal-content">
        <div class="modal-body">
          <!-- 图片预览区域 -->
          <div class="image-preview">
            <div class="preview-container">
              <NuxtImg 
                :src="imageUrl" 
                class="preview-image"
                :alt="'Emoji Mix 结果预览'"
              />
            </div>
          </div>
          
          <!-- 文本内容区域 -->
          <div class="content-area">
            <div class="content-text">
              <h3 class="modal-title">
                <UIcon name="i-heroicons-arrow-down-tray" class="mr-2" />
                下载 Emoji Mix 结果
              </h3>
              <p class="modal-description">
                确认要下载这个混合表情吗？
              </p>
              <p class="modal-hint">
                <UIcon name="i-heroicons-information-circle" class="mr-1" />
                移动端用户可以长按图片保存
              </p>
              
              <!-- 支持链接 -->
              <div class="support-section">
                <UIcon name="i-heroicons-heart" class="mr-1 text-pink-500" />
                <span class="support-text">喜欢这个项目？</span>
                <a 
                  href="https://afdian.com/a/mintimate" 
                  target="_blank"
                  class="support-link"
                >
                  支持作者
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 操作按钮区域 -->
        <div class="modal-actions">
          <UButton
            @click="downloadImage(imageUrl)"
            size="lg"
            class="primary-button"
          >
            <UIcon name="i-heroicons-arrow-down-tray" class="mr-2" />
            确认下载
          </UButton>
          
          <UButton
            @click="emit('close')"
            variant="outline"
            size="lg"
            class="secondary-button"
          >
            <UIcon name="i-heroicons-x-mark" class="mr-2" />
            取消
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 28rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.modal-content {
  position: relative;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(226, 232, 240, 0.5);
  overflow: hidden;
  transform: scale(0.95);
  animation: modalEnter 0.3s ease-out forwards;
}

@keyframes modalEnter {
  to {
    transform: scale(1);
  }
}

@media (prefers-color-scheme: dark) {
  .modal-content {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.modal-body {
  display: flex;
  padding: 2rem;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .modal-body {
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
  }
}

.image-preview {
  flex-shrink: 0;
}

.preview-container {
  width: 6rem;
  height: 6rem;
  border-radius: 1rem;
  overflow: hidden;
  background: rgb(248, 250, 252);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.preview-container:hover {
  transform: scale(1.05);
}

@media (prefers-color-scheme: dark) {
  .preview-container {
    background: rgb(15, 23, 42);
  }
}

@media (max-width: 640px) {
  .preview-container {
    width: 4rem;
    height: 4rem;
    margin: 0 auto;
  }
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 640px) {
  .content-area {
    text-align: center;
  }
}

.modal-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.75rem;
}

@media (prefers-color-scheme: dark) {
  .modal-title {
    color: white;
  }
}

@media (max-width: 640px) {
  .modal-title {
    justify-content: center;
    font-size: 1.125rem;
  }
}

.modal-description {
  color: rgb(100, 116, 139);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

@media (prefers-color-scheme: dark) {
  .modal-description {
    color: rgb(148, 163, 184);
  }
}

.modal-hint {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  margin-bottom: 1rem;
}

@media (prefers-color-scheme: dark) {
  .modal-hint {
    color: rgb(148, 163, 184);
  }
}

@media (max-width: 640px) {
  .modal-hint {
    justify-content: center;
  }
}

.support-section {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  gap: 0.25rem;
}

@media (max-width: 640px) {
  .support-section {
    justify-content: center;
  }
}

.support-text {
  color: rgb(100, 116, 139);
}

@media (prefers-color-scheme: dark) {
  .support-text {
    color: rgb(148, 163, 184);
  }
}

.support-link {
  color: rgb(219, 39, 119);
  text-decoration: underline;
  text-decoration-style: wavy;
  text-underline-offset: 2px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.support-link:hover {
  color: rgb(190, 24, 93);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem 2rem 2rem;
  justify-content: flex-end;
}

@media (max-width: 640px) {
  .modal-actions {
    flex-direction: column-reverse;
    padding: 1rem 1.5rem 1.5rem;
  }
}

.primary-button {
  background: linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119));
  border: none;
}

.primary-button:hover {
  background: linear-gradient(to right, rgb(126, 34, 206), rgb(190, 24, 93));
}

.secondary-button {
  color: rgb(100, 116, 139);
  border-color: rgba(226, 232, 240, 0.8);
}

.secondary-button:hover {
  background: rgb(248, 250, 252);
  color: rgb(71, 85, 105);
}

@media (prefers-color-scheme: dark) {
  .secondary-button {
    color: rgb(148, 163, 184);
    border-color: rgba(71, 85, 105, 0.8);
  }
  
  .secondary-button:hover {
    background: rgb(51, 65, 85);
    color: rgb(203, 213, 225);
  }
}
</style>