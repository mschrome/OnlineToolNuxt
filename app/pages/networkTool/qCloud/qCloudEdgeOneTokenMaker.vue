<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          腾讯云 CDN / EO Token 鉴权生成
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          快速、安全的腾讯云 EdgeOne Token 鉴权 URL 生成工具
        </p>
        
        <!-- 帮助链接 -->
        <div class="flex flex-wrap justify-center items-center gap-4 mt-6 text-sm">
          <a href="https://cloud.tencent.com/document/product/1552/71007"
             class="help-link"
             target="_blank">
            <UIcon name="i-ic-baseline-help-center" class="mr-1" />
            腾讯云时间戳 Token 鉴权
          </a>
          <span class="text-slate-400">|</span>
          <a href="https://www.mintimate.cn/2025/01/11/edgeOneWithCosToken/"
             class="help-link help-link-pink"
             target="_blank">
            <UIcon name="i-ic-baseline-help-center" class="mr-1" />
            URL 鉴权详解(教程)
          </a>
        </div>
      </div>

      <!-- 主工具卡片 -->
      <div class="tool-card">
        <div class="form-container">
          <!-- 输入区域 -->
          <div class="input-section">
            <div class="input-header">
              <div class="input-title">
                <UIcon name="i-ic-outline-link" class="mr-2" />
                CDN / EdgeOne 原始链接
              </div>
              <div class="status-indicator" :class="{ active: fullUrlObject.sourceUrl && judgeUrl(fullUrlObject.sourceUrl) }">
                {{ fullUrlObject.sourceUrl && judgeUrl(fullUrlObject.sourceUrl) ? '链接有效' : '等待输入' }}
              </div>
            </div>
            <UFormGroup name="sourceUrl" help="CDN / EdgeOne 的原始链接，http/https 开头">
              <UInput
                v-model="fullUrlObject.sourceUrl"
                size="xl"
                placeholder="请输入 CDN / EdgeOne 源地址"
                :leading-icon="'i-ic-outline-link'"
                :color="fullUrlObject.sourceUrl && judgeUrl(fullUrlObject.sourceUrl) ? 'primary' : 'gray'"
                :variant="'outline'"
                block
                class="w-full"
              />
            </UFormGroup>
          </div>

          <!-- 鉴权配置区域 -->
          <div class="config-section">
            <div class="config-title">
              <UIcon name="i-ic-baseline-security" class="mr-2" />
              鉴权配置
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- 鉴权类型 -->
              <div class="col-span-full">
                <UFormGroup label="鉴权类型">
                    <URadioGroup 
                    orientation="horizontal" 
                    variant="card"
                    v-model="fullUrlObject.targetType"
                    :items="[
                      {label: '鉴权方式 A', value: 'A'},
                      {label: '鉴权方式 B', value: 'B'},
                      {label: '鉴权方式 C', value: 'C'},
                      {label: '鉴权方式 D', value: 'D'},
                    ]"/>
                </UFormGroup>
              </div>

              <!-- 鉴权密钥 -->
              <UFormGroup
                name="verficationCode"
                label="鉴权密钥"
                help="任意主密钥或备选密钥即可"
              >
                <UInput 
                  v-model="fullUrlObject.verficationCode" 
                  :leading-icon="'i-ic-outline-barcode'"
                  placeholder="请输入鉴权密钥"
                  block
                  class="w-full"
                />
              </UFormGroup>

              <!-- 鉴权追加参数名 (A/D 类型) -->
              <UFormGroup
                v-show="fullUrlObject.targetType === 'A' || fullUrlObject.targetType === 'D'"
                name="paramName"
                label="鉴权追加参数名"
                help="鉴权参数命名 [默认: sign]"
              >
                <UInput 
                  v-model="fullUrlObject.paramName" 
                  :leading-icon="'i-ic-round-text-snippet'"
                  placeholder="sign"
                  block
                  class="w-full"
                />
              </UFormGroup>

              <!-- 鉴权时间戳参数名称 (D 类型) -->
              <UFormGroup
                v-show="fullUrlObject.targetType === 'D'"
                name="tName"
                label="鉴权时间戳参数名称"
                help="鉴权时间戳参数命名 [默认: t]"
              >
                <UInput 
                  v-model="fullUrlObject.tName" 
                  :leading-icon="'i-ic-sharp-access-time'"
                  placeholder="t"
                  block
                  class="w-full"
                />
              </UFormGroup>

              <!-- 时间格式 (D 类型) -->
              <UFormGroup
                v-show="fullUrlObject.targetType === 'D'"
                label="时间格式"
                help="时间戳的格式 [默认: 十六进制]"
              >
                <USelect 
                  v-model="fullUrlObject.tType" 
                  :items="timeFormatOptions"
                  option-attribute="name"
                  block
                  class="w-full"
                />
              </UFormGroup>
            </div>
          </div>

          <!-- 生成按钮 -->
          <div class="submit-section">
            <UButton
              @click="generateUrl"
              :label="displayTextForButton"
              size="xl"
              block
              :loading="false"
              class="generate-button"
            />
          </div>
        </div>
      </div>

      <!-- 结果显示区域 -->
      <div class="result-card" v-if="targetUrl !== '等待用户操作，所有操作前端完成，不用担心泄露'">
        <div class="result-header">
          <div class="result-title">
            <UIcon name="i-ic-baseline-link" class="mr-2" />
            生成的鉴权 URL
          </div>
          <UButton
            @click="copyCommandTool"
            variant="ghost"
            size="sm"
            :leading-icon="'i-ic-baseline-file-copy'"
            label="复制"
            class="copy-button"
          />
        </div>
        <div class="result-content">
          {{ targetUrl }}
        </div>
      </div>

      <!-- 信息卡片 -->
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon principle-icon">
            <UIcon name="i-ic-baseline-security" />
          </div>
          <div class="info-content">
            <h3 class="info-title">鉴权原理</h3>
            <div class="info-description">
              <p class="mb-3">腾讯云 EdgeOne 提供四种鉴权方式：</p>
              <ul class="info-list">
                <li><strong>方式 A：</strong>URL 参数鉴权，适用于大部分场景</li>
                <li><strong>方式 B：</strong>路径鉴权，URL 更简洁</li>
                <li><strong>方式 C：</strong>扩展鉴权，支持更多参数</li>
                <li><strong>方式 D：</strong>时间戳鉴权，可自定义参数名</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon security-icon">
            <UIcon name="i-ic-baseline-verified-user" />
          </div>
          <div class="info-content">
            <h3 class="info-title">安全说明</h3>
            <div class="info-description">
              <p class="mb-3">本工具完全在前端运行，确保数据安全：</p>
              <ul class="info-list">
                <li>所有计算均在浏览器本地完成</li>
                <li>不会向服务器发送任何敏感信息</li>
                <li>鉴权密钥仅用于本地计算</li>
                <li>生成的 URL 可安全使用</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import {judgeUrl} from "~/utils/UrlUtil";
import {makeToken} from "~/utils/edgeOneTokenMake";

useHead({
  title: '腾讯云EO Token 鉴权生成-在线工具箱',
  meta: [
    {
      name: 'description',
      content:
          '对于腾讯云 EdgeOne 使用了规则引擎实现了 Token 鉴权情况，本网站提供了 Token 鉴权的生成工具，方便快速准确生成符合要求的鉴权 URL。',
    },
    {
      name: 'keywords',
      content: '腾讯云,EdgeOne,Token,鉴权,在线加密 EO 鉴权',
    },
  ],
});

// 显示提示信息
const toast = useToast();

// 手动验证函数
const validateForm = () => {
  const errors = []
  
  // 验证源地址
  if (!fullUrlObject.sourceUrl) {
    errors.push('请输入源地址')
  } else if (!judgeUrl(fullUrlObject.sourceUrl)) {
    errors.push('源地址格式不正确，请输入有效的 http/https 链接')
  }
  
  // 验证鉴权密钥
  if (!fullUrlObject.verficationCode) {
    errors.push('请输入鉴权密钥')
  } else if (fullUrlObject.verficationCode.length < 6) {
    errors.push('鉴权密钥长度至少需要6位')
  }
  
  // 验证参数名（当需要时）
  if ((fullUrlObject.targetType === 'A' || fullUrlObject.targetType === 'D') && !fullUrlObject.paramName) {
    errors.push('请输入鉴权参数名')
  }
  
  // 验证时间戳参数名（当需要时）
  if (fullUrlObject.targetType === 'D' && !fullUrlObject.tName) {
    errors.push('请输入时间戳参数名')
  }
  
  return errors
}

// 时间格式选项
const timeFormatOptions = [
  {label: '十六进制(时间戳)', value: 'Hex'},
  {label: '十进制(时间戳)', value: 'Dec'}
]

let targetUrl = ref('等待用户操作，所有操作前端完成，不用担心泄露');
let fullUrlObject = reactive({
  sourceUrl: '',
  targetType: 'A',
  verficationCode: '',
  paramName: 'sign',
  tName: 't',
  tType: 'Hex',
})
let displayTextForButton = ref('生成鉴权 URL');

const generateUrl = () => {
  // 手动执行表单验证
  const validationErrors = validateForm()
  
  if (validationErrors.length > 0) {
    // 显示验证错误
    toast.add({
      id: 'validation-error',
      title: '参数验证失败',
      description: validationErrors[0], // 显示第一个错误
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 5000,
    });
    return
  }
  
  try {
    targetUrl.value = makeToken(
        fullUrlObject.sourceUrl, 
        fullUrlObject.verficationCode,
        fullUrlObject.targetType, 
        fullUrlObject.paramName,
        fullUrlObject.tType, 
        fullUrlObject.tName
    )
    
    toast.add({
      id: 'generate-success',
      title: '生成成功',
      description: '鉴权 URL 已生成完成',
      icon: 'i-heroicons-check-circle-20-solid',
      timeout: 3000,
    });
  } catch (error) {
    toast.add({
      id: 'generate-error',
      title: '生成失败',
      description: '请检查输入参数是否正确',
      icon: 'i-heroicons-face-frown-20-solid',
      timeout: 5000,
    });
  }
};

/** 复制鉴权 URL */
const copyCommandTool = () => {
  const text = targetUrl.value;
  navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.add({
          id: 'copy-success',
          title: '复制成功',
          description: '鉴权 URL 已复制到剪贴板',
          icon: 'i-heroicons-face-smile-20-solid',
          timeout: 3000,
        });
      })
      .catch(() => {
        toast.add({
          id: 'copy-error',
          title: '复制失败',
          description: '请手动选择复制',
          icon: 'i-heroicons-face-frown-20-solid',
          timeout: 5000,
        });
      });
};
</script>

<style scoped>
/* 帮助链接样式 */
.help-link {
  display: flex;
  align-items: center;
  color: rgb(59 130 246);
  text-decoration: underline;
  text-decoration-color: rgba(59, 130, 246, 0.3);
  text-underline-offset: 2px;
  transition: color 0.2s ease;
}

.help-link:hover {
  color: rgb(37 99 235);
}

.help-link-pink {
  color: rgb(236 72 153);
  text-decoration-color: rgba(236, 72, 153, 0.3);
}

.help-link-pink:hover {
  color: rgb(219 39 119);
}

.dark {
  .help-link {
    color: rgb(147 197 253);
  }
  
  .help-link:hover {
    color: rgb(191 219 254);
  }
  
  .help-link-pink {
    color: rgb(244 114 182);
  }
  
  .help-link-pink:hover {
    color: rgb(249 168 212);
  }
}

/* 主工具卡片 */
.tool-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgb(226 232 240);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.tool-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  transform: translateY(-2px);
}

.dark {
  .tool-card {
    background: rgb(30 41 59);
    border-color: rgb(71 85 105);
  }
}

/* 输入区域 */
.input-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgb(226 232 240);
}

.dark {
  .input-section {
    border-bottom-color: rgb(71 85 105);
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
  color: rgb(30 41 59);
}

.dark {
  .input-title {
    color: white;
  }
}

.status-indicator {
  font-size: 0.75rem;
  color: rgb(100 116 139);
  background: rgb(241 245 249);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.status-indicator.active {
  color: rgb(22 163 74);
  background: rgb(220 252 231);
}

.dark {
  .status-indicator {
    color: rgb(148 163 184);
    background: rgb(71 85 105);
  }
  
  .status-indicator.active {
    color: rgb(74 222 128);
    background: rgba(34, 197, 94, 0.2);
  }
}

/* 配置区域 */
.config-section {
  margin-bottom: 2rem;
}

.config-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.125rem;
  color: rgb(30 41 59);
  margin-bottom: 1.5rem;
}

.dark {
  .config-title {
    color: white;
  }
}

.auth-type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .auth-type-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.auth-radio {
  padding: 0.75rem;
  border: 1px solid rgb(226 232 240);
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.auth-radio:hover {
  background: rgb(248 250 252);
}

.dark {
  .auth-radio {
    border-color: rgb(75 85 99);
  }
  
  .auth-radio:hover {
    background: rgb(55 65 81);
  }
}

/* 提交区域 */
.submit-section {
  text-align: center;
}

.generate-button {
  background: linear-gradient(to right, rgb(37 99 235), rgb(147 51 234));
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.generate-button:hover {
  background: linear-gradient(to right, rgb(29 78 216), rgb(126 34 206));
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* 结果卡片 */
.result-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgb(226 232 240);
}

.dark {
  .result-card {
    background: rgb(30 41 59);
    border-color: rgb(71 85 105);
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
  font-size: 1.125rem;
  color: rgb(30 41 59);
}

.dark {
  .result-title {
    color: white;
  }
}

.copy-button {
  color: rgb(37 99 235);
}

.copy-button:hover {
  color: rgb(29 78 216);
}

.dark {
  .copy-button {
    color: rgb(147 197 253);
  }
  
  .copy-button:hover {
    color: rgb(191 219 254);
  }
}

.result-content {
  background: rgb(248 250 252);
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.875rem;
  color: rgb(55 65 81);
  word-break: break-all;
  border: 1px solid rgb(226 232 240);
}

.dark {
  .result-content {
    background: rgb(15 23 42);
    color: rgb(203 213 225);
    border-color: rgb(71 85 105);
  }
}

/* 信息卡片网格 */
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid rgb(226 232 240);
  transition: all 0.3s ease;
}

.info-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.dark {
  .info-card {
    background: rgb(30 41 59);
    border-color: rgb(71 85 105);
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

.principle-icon {
  background: linear-gradient(to right, rgb(59 130 246), rgb(147 51 234));
}

.security-icon {
  background: linear-gradient(to right, rgb(34 197 94), rgb(16 185 129));
}

.info-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(30 41 59);
  margin-bottom: 0.75rem;
}

.dark {
  .info-title {
    color: white;
  }
}

.info-description {
  font-size: 0.875rem;
  color: rgb(100 116 139);
  line-height: 1.625;
}

.dark {
  .info-description {
    color: rgb(148 163 184);
  }
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
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
  color: rgb(59 130 246);
  font-weight: bold;
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

.tool-card, .result-card, .info-card {
  animation: fadeInUp 0.6s ease-out;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }

/* 响应式设计 */
@media (max-width: 768px) {
  .input-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .auth-type-grid {
    grid-template-columns: 1fr;
  }
  
  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>
