<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          短链接生成
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          快速生成简洁的短链接，便于分享和管理
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="tool-card">
        <UForm :validate="validate" :state="fullUrlObject" @submit="generateUrl">
          <!-- 输入区域 -->
          <div class="input-section">
            <div class="input-header">
              <div class="input-title">
                <UIcon name="i-heroicons-link" class="mr-2" />
                原始链接
              </div>
              <div class="char-count">{{ fullUrlObject.fullUrl.length }} 字符</div>
            </div>
            <UFormGroup name="fullUrl" class="mb-6">
              <UInput
                v-model="fullUrlObject.fullUrl"
                size="xl"
                placeholder="请输入需要缩短的长链接，如：https://example.com/very/long/url"
                icon="i-heroicons-link"
                class="input-field w-full"
                :ui="{ 
                  base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
                  rounded: 'rounded-xl',
                  size: { xl: 'text-base px-4 py-4' },
                  color: { white: { outline: 'shadow-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400' } }
                }"
              />
              <template #help>
                <div class="help-text">
                  <UIcon name="i-heroicons-information-circle" class="mr-1" />
                  由后台生成的短链接，将重定向到该源地址
                </div>
              </template>
            </UFormGroup>
          </div>

          <!-- 配置区域 -->
          <div class="config-section">
            <div class="config-grid">
              <div class="config-item">
                <UFormGroup name="verficationCode" label="内测码" class="mb-4">
                  <UInput 
                    v-model="fullUrlObject.verficationCode" 
                    icon="i-heroicons-key"
                    placeholder="请输入内测码"
                    class="config-input w-full"
                    :ui="{ 
                      base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
                      rounded: 'rounded-lg',
                      color: { white: { outline: 'shadow-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400' } }
                    }"
                  />
                  <template #help>
                    <div class="help-text">
                      <UIcon name="i-heroicons-shield-check" class="mr-1" />
                      系统暂时只给受邀用户权限
                    </div>
                  </template>
                </UFormGroup>
              </div>

              <div class="config-item">
                <UFormGroup label="备注信息" class="mb-4">
                  <UInput 
                    v-model="fullUrlObject.messgae" 
                    icon="i-heroicons-chat-bubble-left-ellipsis"
                    placeholder="添加备注（可选）"
                    class="config-input w-full"
                    :ui="{ 
                      base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
                      rounded: 'rounded-lg',
                      color: { white: { outline: 'shadow-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400' } }
                    }"
                  />
                  <template #help>
                    <div class="help-text">
                      <UIcon name="i-heroicons-document-text" class="mr-1" />
                      仅用于开发者维护使用
                    </div>
                  </template>
                </UFormGroup>
              </div>
            </div>

            <!-- 域名选择 -->
            <div class="domain-section">
              <UFormGroup label="选择短链域名">
                <div class="domain-options">
                  <div class="domain-option" :class="{ active: fullUrlObject.targetUrl === 'curl.mintimate.cn' }">
                    <URadio 
                      v-model="fullUrlObject.targetUrl" 
                      value="curl.mintimate.cn"
                      class="domain-radio"
                    />
                    <div class="domain-info">
                      <div class="domain-name">curl.mintimate.cn</div>
                      <div class="domain-status available">可用</div>
                    </div>
                  </div>
                  
                  <div class="domain-option disabled">
                    <URadio 
                      v-model="fullUrlObject.targetUrl" 
                      value="curl.mintimate.ml"
                      disabled
                      class="domain-radio"
                    />
                    <div class="domain-info">
                      <div class="domain-name">curl.mintimate.ml</div>
                      <div class="domain-status unavailable">暂不可用</div>
                    </div>
                  </div>
                </div>
              </UFormGroup>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="action-section">
            <UButton
              type="submit"
              :label="displayTextForButton"
              :disabled="disabledButton"
              size="xl"
              class="generate-button"
              :ui="{
                base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0',
                font: 'font-semibold',
                rounded: 'rounded-xl',
                size: { xl: 'text-base px-8 py-4' },
                color: { primary: { solid: 'shadow-sm text-white dark:text-gray-900 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:focus-visible:outline-blue-400' } }
              }"
            >
              <UIcon name="i-heroicons-scissors" class="mr-2" />
              {{ displayTextForButton }}
            </UButton>
          </div>
        </UForm>
      </div>

      <!-- 结果显示区域 -->
      <div class="result-section" v-if="shortUrl !== '等待用户操作'">
        <div class="result-card">
          <div class="result-header">
            <div class="result-title">
              <UIcon name="i-heroicons-check-circle" class="mr-2 text-green-500" />
              生成成功
            </div>
            <UButton
              @click="copyShortUrl"
              variant="outline"
              size="sm"
              class="copy-button"
            >
              <UIcon name="i-heroicons-clipboard-document" class="mr-1" />
              复制
            </UButton>
          </div>
          <div class="result-content">
            <div class="short-url">{{ shortUrl }}</div>
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
            <h3 class="info-title">什么是短链接？</h3>
            <p class="info-description">
              短链接是将长网址转换为更短、更易分享的链接。点击短链接时会自动重定向到原始网址，常用于社交媒体分享和营销活动。
            </p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon usage-icon">
            <UIcon name="i-heroicons-light-bulb" />
          </div>
          <div class="info-content">
            <h3 class="info-title">使用场景</h3>
            <ul class="info-list">
              <li>社交媒体分享</li>
              <li>邮件营销活动</li>
              <li>二维码生成</li>
              <li>数据统计分析</li>
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
              请确保原始链接的安全性和合法性。短链接服务仅提供网址缩短功能，不对目标网站内容负责。
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
import { computed, ref, watch, reactive } from 'vue';
import { judgeUrl } from '~/utils/UrlUtil.js';
import { post } from "~/utils/request";

const toast = useToast();

useHead({
  title: '短链接生成器-在线工具箱',
  meta: [
    {
      name: 'description',
      content: '免费在线短链接生成工具，快速将长网址转换为简洁的短链接，便于分享和管理。支持自定义域名，提供访问统计功能。',
    },
    {
      name: 'keywords',
      content: '在线工具箱,短链接,网址缩短,URL缩短,链接生成器,短网址',
    },
  ],
});

// 表单验证
const validate = (state) => {
  const errors = []
  if (!state.fullUrl) {
    errors.push({ path: 'fullUrl', message: '请输入有效的网址' })
  } else if (!judgeUrl(state.fullUrl)) {
    errors.push({ path: 'fullUrl', message: '网址格式不正确，请输入完整的URL（包含http://或https://）' })
  }
  if (!state.verficationCode) {
    errors.push({ path: 'verficationCode', message: '请输入内测码' })
  }
  return errors
}

let shortUrl = ref('等待用户操作');
let fullUrlObject = reactive({
  targetUrl: 'curl.mintimate.cn',
  fullUrl: '',
  verficationCode: '',
  messgae: ''
})
let displayTextForButton = ref('生成短链接');
let disabledTimer = ref(0);
const disabledButton = computed(() => disabledTimer.value > 0);

watch(disabledTimer, (value) => {
  if (value <= 0) {
    displayTextForButton.value = '生成短链接';
  }
});

const generateUrl = () => {
  disabledTimer.value = 5;
  displayTextForButton.value = '生成中...';
  const intervalId = setInterval(() => {
    displayTextForButton.value = `生成中... ${disabledTimer.value}s`;
    disabledTimer.value--;
    if (disabledTimer.value < 0) {
      clearInterval(intervalId);
    }
  }, 1000);

  if (!judgeUrl(fullUrlObject.fullUrl)) {
    toast.add({
      id: 'url-validation-error',
      title: '网址格式错误',
      description: '请输入有效的网址，确保包含 http:// 或 https://',
      icon: 'i-heroicons-exclamation-triangle',
      timeout: 5000,
    });
    return;
  }

  post("/curl/genShortUrl", fullUrlObject)
    .then(res => {
      shortUrl.value = 'https://' + fullUrlObject.targetUrl + '/' + res.data;
      toast.add({
        id: 'generate-success',
        title: '生成成功',
        description: '短链接已生成，可以复制使用了',
        icon: 'i-heroicons-check-circle',
        timeout: 3000,
      });
    })
    .catch(error => {
      console.error('生成短链接失败:', error);
      toast.add({
        id: 'generate-error',
        title: '生成失败',
        description: error.response?.data?.message || '服务器错误，请稍后重试',
        icon: 'i-heroicons-x-circle',
        timeout: 5000,
      });
    });
};

/** 复制短链接 */
const copyShortUrl = () => {
  const text = shortUrl.value;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.add({
        id: 'copy-success',
        title: '复制成功',
        description: '短链接已复制到剪贴板',
        icon: 'i-heroicons-clipboard-document-check',
        timeout: 3000,
      });
    })
    .catch(() => {
      toast.add({
        id: 'copy-error',
        title: '复制失败',
        description: '请手动复制链接',
        icon: 'i-heroicons-exclamation-triangle',
        timeout: 3000,
      });
    });
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

.dark {
  .tool-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}

/* 输入区域 */
.input-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .input-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.input-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.125rem;
  color: rgb(30, 41, 59);
}

.dark {
  .input-title {
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

.dark {
  .char-count {
    color: rgb(148, 163, 184);
    background: rgb(51, 65, 85);
  }
}

.help-text {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  margin-top: 0.5rem;
}

.dark {
  .help-text {
    color: rgb(148, 163, 184);
  }
}

/* 配置区域 */
.config-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .config-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.config-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .config-grid {
    grid-template-columns: 1fr;
  }
}

/* 域名选择区域 */
.domain-section {
  margin-top: 1.5rem;
}

.domain-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.75rem;
}

@media (max-width: 640px) {
  .domain-options {
    grid-template-columns: 1fr;
  }
}

.domain-option {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid rgba(226, 232, 240, 0.5);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.domain-option:hover:not(.disabled) {
  border-color: rgb(59, 130, 246);
  background: rgba(59, 130, 246, 0.05);
}

.domain-option.active {
  border-color: rgb(59, 130, 246);
  background: rgba(59, 130, 246, 0.1);
}

.domain-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dark {
  .domain-option {
    border-color: rgba(71, 85, 105, 0.5);
  }
  
  .domain-option:hover:not(.disabled) {
    border-color: rgb(147, 197, 253);
    background: rgba(59, 130, 246, 0.1);
  }
  
  .domain-option.active {
    border-color: rgb(147, 197, 253);
    background: rgba(59, 130, 246, 0.2);
  }
}

.domain-radio {
  margin-right: 0.75rem;
}

.domain-info {
  flex: 1;
}

.domain-name {
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.25rem;
}

.dark {
  .domain-name {
    color: white;
  }
}

.domain-status {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  display: inline-block;
}

.domain-status.available {
  color: rgb(34, 197, 94);
  background: rgba(34, 197, 94, 0.1);
}

.domain-status.unavailable {
  color: rgb(239, 68, 68);
  background: rgba(239, 68, 68, 0.1);
}

/* 操作按钮区域 */
.action-section {
  text-align: center;
}

.generate-button {
  transition: all 0.3s ease;
}

.generate-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* 结果显示区域 */
.result-section {
  margin-bottom: 2rem;
}

.result-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  border-left: 4px solid rgb(34, 197, 94);
}

.dark {
  .result-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    border-left-color: rgb(34, 197, 94);
  }
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
}

.dark {
  .result-title {
    color: white;
  }
}

.result-content {
  background: rgb(248, 250, 252);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .result-content {
    background: rgb(51, 65, 85);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.short-url {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(59, 130, 246);
  word-break: break-all;
  letter-spacing: 0.025em;
}

.dark {
  .short-url {
    color: rgb(147, 197, 253);
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

.dark {
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

.dark {
  .info-title {
    color: white;
  }
}

.info-description {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  line-height: 1.625;
}

.dark {
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

.dark {
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

.dark {
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

.tool-card, .info-card, .result-card {
  animation: fadeInUp 0.6s ease-out;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }

/* 响应式设计 */
@media (max-width: 640px) {
  .tool-card {
    padding: 1.5rem;
  }
  
  .config-grid {
    gap: 1rem;
  }
  
  .domain-options {
    gap: 0.75rem;
  }
  
  .domain-option {
    padding: 0.75rem;
  }
}
</style>
