<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Base64 编解码
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          快速、安全的 Base64 编码解码工具
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="tool-card">
        <!-- 模式切换区域 -->
        <div class="mode-switch-section">
          <div class="mode-switch-container">
            <div class="mode-label" :class="{ active: !WorkMode }">
              <UIcon name="i-heroicons-arrow-down-circle" class="mr-2" />
              解码模式
            </div>
            <USwitch
              v-model="WorkMode"
              class="mode-switch"
              size="lg"
            />
            <div class="mode-label" :class="{ active: WorkMode }">
              <UIcon name="i-heroicons-arrow-up-circle" class="mr-2" />
              编码模式
            </div>
          </div>
          <p class="mode-description">
            {{ WorkMode ? '将普通文本转换为 Base64 编码' : '将 Base64 编码转换为普通文本' }}
          </p>
        </div>

        <!-- 输入输出区域 -->
        <div class="io-section">
          <div class="input-container">
            <div class="input-header">
              <div class="input-title">
                <UIcon :name="WorkMode ? 'i-heroicons-document-text' : 'i-heroicons-code-bracket'" class="mr-2" />
                {{ WorkMode ? '原始文本' : 'Base64 文本' }}
              </div>
              <div class="char-count">{{ inputContent.length }} 字符</div>
            </div>
            <UTextarea
              v-model="inputContent"
              :placeholder="WorkMode ? '请输入要编码的文本内容...' : '请输入要解码的 Base64 文本...'"
              :rows="10"
              class="input-textarea"
              resize
            />
          </div>

          <!-- 转换箭头 -->
          <div class="arrow-container">
            <div class="arrow-icon">
              <UIcon name="i-heroicons-arrow-right" class="text-2xl" />
            </div>
          </div>

          <div class="output-container">
            <div class="output-header">
              <div class="output-title">
                <UIcon :name="WorkMode ? 'i-heroicons-code-bracket' : 'i-heroicons-document-text'" class="mr-2" />
                {{ WorkMode ? 'Base64 结果' : '解码结果' }}
              </div>
              <div class="char-count">{{ outputText.length }} 字符</div>
            </div>
            <UTextarea
              v-model="outputText"
              :placeholder="WorkMode ? 'Base64 编码结果将显示在这里...' : '解码后的文本将显示在这里...'"
              :rows="10"
              readonly
              class="output-textarea"
              resize
            />
          </div>
        </div>

        <!-- 操作按钮区域 -->
        <div class="action-section">
          <UButton
            @click="copyTheOutPutText"
            :disabled="!outputText || outputText.includes('被玩怀了')"
            class="primary-button"
            size="lg"
          >
            <UIcon name="i-heroicons-clipboard-document" class="mr-2" />
            复制结果
          </UButton>

          <UButton
            @click="swapTexts"
            :disabled="!outputText || outputText.includes('被玩怀了')"
            variant="outline"
            size="lg"
            class="secondary-button"
          >
            <UIcon name="i-heroicons-arrow-path-rounded-square" class="mr-2" />
            交换内容
          </UButton>

          <UButton
            @click="inputContent = ''"
            :disabled="!inputContent"
            variant="outline"
            size="lg"
            color="red"
            class="danger-button"
          >
            <UIcon name="i-heroicons-trash" class="mr-2" />
            清空输入
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
            <h3 class="info-title">什么是 Base64？</h3>
            <p class="info-description">
              Base64 是一种基于 64 个可打印字符来表示二进制数据的编码方法。它将 3 个字节的二进制数据编码为 4 个字符，常用于在文本协议中传输二进制数据。
            </p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon usage-icon">
            <UIcon name="i-heroicons-light-bulb" />
          </div>
          <div class="info-content">
            <h3 class="info-title">常见用途</h3>
            <ul class="info-list">
              <li>电子邮件附件编码</li>
              <li>网页中嵌入图片数据</li>
              <li>API 数据传输</li>
              <li>配置文件存储</li>
            </ul>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon security-icon">
            <UIcon name="i-heroicons-shield-check" />
          </div>
          <div class="info-content">
            <h3 class="info-title">安全提示</h3>
            <p class="info-description">
              Base64 是编码方式，不是加密方式。编码后的数据可以轻易解码，请勿用于敏感信息的安全保护。
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

<script setup>
import { Base64 } from 'js-base64';
import { ref, computed } from 'vue';

const toast = useToast();

useHead({
    title: 'Base64文字互转-在线工具箱',
    meta: [
        {
            name: 'description',
            content:
                '在线对文字的内容进行Base64转码，或者把Base64内容转回文字内容。',
        },
        {
            name: 'keywords',
            content: '在线工具箱,Base64转码,Base64',
        },
    ],
});

let WorkMode = ref(true);
let inputContent = ref('HelloWorld');

// 计算结果
let outputText = computed(() => {
    if (!inputContent.value.trim()) return '';
    
    try {
        if (WorkMode.value) {
            // 编码模式
            return Base64.encode(inputContent.value);
        } else {
            // 解码模式
            const decoded = Base64.decode(inputContent.value);
            return decoded;
        }
    } catch (error) {
        return '解码失败，请检查输入的 Base64 格式是否正确';
    }
});

/** 复制生成的转码后 */
const copyTheOutPutText = () => {
    const text = outputText.value;
    navigator.clipboard
        .writeText(text)
        .then(() => {
            toast.add({
                id: 'copy-success',
                title: '复制成功',
                description: '结果已复制到剪贴板',
                icon: 'i-heroicons-face-smile-20-solid',
                timeout: 3000,
            });
        })
        .catch(() => {
            toast.add({
                id: 'copy-error',
                title: '复制失败',
                description: '请手动复制内容',
                icon: 'i-heroicons-face-frown-20-solid',
                timeout: 3000,
            });
        });
};

/** 交换输入输出内容 */
const swapTexts = () => {
    if (outputText.value && !outputText.value.includes('解码失败')) {
        const temp = inputContent.value;
        inputContent.value = outputText.value;
        WorkMode.value = !WorkMode.value;
    }
};
</script>

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

/* 模式切换区域 */
.mode-switch-section {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .mode-switch-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.mode-switch-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.mode-label {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: rgb(100, 116, 139);
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
}

.mode-label.active {
  color: rgb(59, 130, 246);
  background: rgba(59, 130, 246, 0.1);
}

@media (prefers-color-scheme: dark) {
  .mode-label {
    color: rgb(148, 163, 184);
  }
  
  .mode-label.active {
    color: rgb(147, 197, 253);
    background: rgba(59, 130, 246, 0.2);
  }
}

.mode-description {
  color: rgb(100, 116, 139);
  font-size: 0.875rem;
}

@media (prefers-color-scheme: dark) {
  .mode-description {
    color: rgb(148, 163, 184);
  }
}

/* 输入输出区域 */
.io-section {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .io-section {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.input-container, .output-container {
  display: flex;
  flex-direction: column;
}

.input-header, .output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.input-title, .output-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(30, 41, 59);
}

@media (prefers-color-scheme: dark) {
  .input-title, .output-title {
    color: white;
  }
}

.char-count {
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
  background: rgb(248, 250, 252);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

@media (prefers-color-scheme: dark) {
  .char-count {
    color: rgb(148, 163, 184);
    background: rgb(51, 65, 85);
  }
}

/* 转换箭头 */
.arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
}

@media (max-width: 1024px) {
  .arrow-container {
    padding-top: 0;
  }
  
  .arrow-icon {
    transform: rotate(90deg);
  }
}

.arrow-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
}

.arrow-icon:hover {
  transform: scale(1.1);
}

/* 操作按钮区域 */
.action-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

@media (max-width: 640px) {
  .action-section {
    flex-direction: column;
  }
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
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.usage-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
}

.security-icon {
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

.tool-card, .info-card {
  animation: fadeInUp 0.6s ease-out;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }
</style>