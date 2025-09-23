<template>
  <ClientOnly>
    <Transition name="captcha-slide" appear>
      <div v-if="isVisible" class="captcha-wrapper" :class="{ 'no-animation': !animation }">
        <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-lg border-0 overflow-hidden">
          <!-- 头部：图标和文字 -->
          <div class="flex items-center gap-3 px-5 py-3.5 pb-1.5">
            <div class="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex-shrink-0">
              <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-white captcha-icon" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 m-0 mb-0.5 leading-tight">安全验证</h3>
              <p class="text-xs text-gray-600 dark:text-gray-400 m-0 leading-snug">{{ currentStatusText }}</p>
            </div>
          </div>
          
          <!-- 天御验证码无感模式进度显示 -->
          <div v-if="showProgress && animation" class="captcha-progress px-5 pb-2">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
            <div class="progress-text">{{ progressText }}</div>
          </div>
          
          <!-- 验证码区域 -->
          <div class="px-5" :class="{ 'py-3': !showProgress }">
            <div :id="containerId" class="bg-transparent border-0 flex items-center justify-center w-full captcha-container">
            </div>
          </div>
          
          <!-- 底部标识 -->
          <div class="flex items-center justify-center gap-1 px-5 py-1.5 border-t border-gray-200 dark:border-gray-700 text-[10px] text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-shield-check-solid" class="w-2.5 h-2.5 text-blue-500" />
            <span class="font-medium">腾讯云天御</span>
          </div>
        </div>
      </div>
    </Transition>
    
    <template #fallback>
      <div v-if="props.show" class="captcha-loading">
        <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-lg border-0 overflow-hidden">
          <div class="flex items-center justify-center gap-2 p-4 text-gray-600 dark:text-gray-400">
            <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 text-blue-500 animate-spin" />
            <span class="text-xs font-medium">正在加载验证码...</span>
          </div>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted, watch, computed } from 'vue'

/**
 * 腾讯云天御验证码组件 (全局版本)
 * 作者: Mintimate
 * 创建时间: 2025-09-14
 * 描述: 基于官方示例的腾讯云验证码组件
 */

// Props
const props = defineProps({
  appId: {
    type: String,
    required: true,
    default: '1234567890'
  },
  enabled: {
    type: Boolean,
    default: true
  },
  show: {
    type: Boolean,
    default: false
  },
  statusText: {
    type: String,
    default: '请完成安全验证'
  },
  containerId: {
    type: String,
    default: 'captcha-container'
  },
  embedMode: {
    type: Boolean,
    default: false
  },
  globalMode: {
    type: Boolean,
    default: false
  },
  animation: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['success', 'cancel', 'error', 'show', 'hide'])

// 响应式状态
const isVisible = ref(false)
const captchaInstance = ref(null)
const captchaTicket = ref('')
const captchaRandstr = ref('')
const isExecuting = ref(false)
const progress = ref(0)
const showProgress = ref(false)
const progressText = ref('')
const verificationSteps = ref([
  '连接腾讯云天御服务',
  '分析用户行为',
  '生成天御验证码令牌',
  '判断是否需要二次验证'
])
const currentStepIndex = ref(0)

// 计算属性
const currentStatusText = computed(() => {
  if (isExecuting.value) {
    return '正在验证中...'
  }
  return props.statusText
})

// 验证码回调函数
const captchaCallback = (res) => {
  // 清理进度动画
  if (showProgress.value) {
    showProgress.value = false
    isExecuting.value = false
  }
  
  if (res.ret === 0) {
    // 验证成功，存储票据信息
    captchaTicket.value = res.ticket
    captchaRandstr.value = res.randstr
    
    emit('success', {
      ticket: res.ticket,
      randstr: res.randstr,
      errorCode: res.errorCode,
      errorMessage: res.errorMessage
    })
    
    // 如果有错误码，说明是容灾票据
    if (res.errorCode) {
      console.warn('验证码容灾票据:', res.ticket)
    }
    
    hideCaptcha()
  } else if (res.ret === 2) {
    // 用户主动关闭验证码
    console.log('用户关闭验证码')
    emit('cancel')
    hideCaptcha()
  } else {
    // 其他错误
    console.error('验证码验证失败:', res)
    emit('error', res)
    hideCaptcha()
  }
}

// DOM就绪检查函数
const waitForDOMReady = async (element, maxAttempts = 10) => {
  for (let i = 0; i < maxAttempts; i++) {
    // 检查元素是否已渲染且可见
    if (element && element.offsetParent !== null && element.getBoundingClientRect().width > 0) {
      return true
    }
    // 使用requestAnimationFrame等待下一帧
    await new Promise(resolve => requestAnimationFrame(resolve))
  }
  console.warn('DOM元素未能在预期时间内就绪')
  return false
}

// 验证码加载错误处理函数
const loadErrorCallback = () => {
  console.warn('验证码JS加载失败，生成容灾票据')
  
  // 生成容灾票据
  const ticket = 'trerror_1001_' + props.appId + '_' + Math.floor(new Date().getTime() / 1000)
  const randstr = '@' + Math.random().toString(36).substr(2)
  
  captchaCallback({
    ret: 0,
    randstr: randstr,
    ticket: ticket,
    errorCode: 1001,
    errorMessage: 'jsload_error'
  })
}



// 初始化验证码实例
const initializeCaptcha = async () => {
  try {
    // 等待DOM更新完成
    await nextTick()
    
    // 检查验证码容器是否存在
    const captchaContainer = document.getElementById(props.containerId)
    if (!captchaContainer) {
      console.error('验证码容器不存在')
      loadErrorCallback()
      return
    }
    
    // 清理容器内容
    captchaContainer.innerHTML = ''
    
    // 动态加载验证码脚本
    if (typeof window.TencentCaptcha === 'undefined') {
      try {
        const scriptSrc = props.globalMode ? '/captcha/TCaptchaGlobal.js' : '/captcha/TCaptcha.js'
        
        // 创建 script 标签动态加载
        const script = document.createElement('script')
        script.src = scriptSrc
        script.async = true
        
        // 等待脚本加载完成
        await new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      } catch (importError) {
        console.error('验证码脚本加载失败:', importError)
        loadErrorCallback()
        return
      }
    }
    
    // 检查 TencentCaptcha 是否可用
    if (typeof window.TencentCaptcha === 'undefined') {
      console.error('TencentCaptcha 未加载')
      loadErrorCallback()
      return
    }
    
    // 等待DOM完全稳定并确保容器可用
    await waitForDOMReady(captchaContainer)
    
    // 隐藏进度条，准备显示验证码
    if (props.animation) {
      showProgress.value = false
    }
    
    // 创建验证码实例
    captchaInstance.value = new window.TencentCaptcha(captchaContainer, props.appId, captchaCallback, {
        type: props.embedMode ? 'embed' : 'popup',
        userLanguage: "zh-cn",
        loading: props.embedMode
    })
    
    // 显示验证码
    captchaInstance.value.show()
    
  } catch (error) {
    console.error('验证码实例创建失败:', error)
    loadErrorCallback()
  }
}

// 触发验证码（保持向后兼容）
const triggerCaptcha = async () => {
  await initializeCaptcha()
}

// 显示验证码组件并自动触发验证码
const showCaptcha = async () => {
  if (!props.enabled) {
    // 如果未启用验证码，直接触发成功回调
    emit('success', {
      ticket: 'disabled_' + Date.now(),
      randstr: 'disabled'
    })
    return
  }
  
  // 检查是否在客户端环境
  if (typeof window === 'undefined') {
    console.warn('服务端环境，跳过验证码验证')
    emit('success', {
      ticket: 'ssr_' + Date.now(),
      randstr: 'ssr'
    })
    return
  }
  
  try {
    console.log('显示验证码组件并自动触发验证码')
    isVisible.value = true
    isExecuting.value = true
    emit('show')
    
    if (props.animation) {
      // 显示加载动画
      showProgress.value = true
      progress.value = 0
      currentStepIndex.value = 0
      progressText.value = verificationSteps.value[0]
      
      // 每250ms切换到下一个步骤，总共1秒完成所有步骤
      const stepInterval = setInterval(() => {
        currentStepIndex.value++
        if (currentStepIndex.value < verificationSteps.value.length) {
          progressText.value = verificationSteps.value[currentStepIndex.value]
          progress.value = (currentStepIndex.value / verificationSteps.value.length) * 100
        } else {
          clearInterval(stepInterval)
          progress.value = 100
          // 动画完成后，开始初始化验证码
          setTimeout(() => {
            initializeCaptcha()
          }, 200)
        }
      }, 250)
      
      // 存储定时器引用以便清理
      window._qcloudProgressInterval = stepInterval
    } else {
      // 不显示动画，直接初始化验证码
      await nextTick()
      await initializeCaptcha()
    }
    
  } catch (error) {
    console.error('验证码初始化失败:', error)
    loadErrorCallback()
  }
}

// 隐藏验证码组件
const hideCaptcha = () => {
  isVisible.value = false
  isExecuting.value = false
  showProgress.value = false
  progress.value = 0
  emit('hide')
  
  // 清理进度定时器
  if (window._qcloudProgressInterval) {
    clearInterval(window._qcloudProgressInterval)
    window._qcloudProgressInterval = null
  }
  
  // 清理验证码容器
  const captchaContainer = document.getElementById(props.containerId)
  if (captchaContainer) {
    captchaContainer.innerHTML = ''
  }
  
  // 清理验证码实例
  if (captchaInstance.value) {
    try {
      captchaInstance.value.destroy && captchaInstance.value.destroy()
    } catch (error) {
      console.warn('验证码实例销毁失败:', error)
    }
    captchaInstance.value = null
  }
}

// 监听 show prop 变化
watch(() => props.show, (newValue) => {
  // 确保在客户端环境中执行
  if (typeof window === 'undefined') return
  
  if (newValue) {
    showCaptcha()
  } else {
    hideCaptcha()
  }
}, { immediate: true })

// 组件卸载时清理
onUnmounted(() => {
  hideCaptcha()
})

// 暴露方法给父组件
defineExpose({
  showCaptcha,
  hideCaptcha,
  triggerCaptcha
})
</script>

<style scoped>
/* ===== 验证码包装器 ===== */
.captcha-wrapper {
  margin: 4px 0;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  animation: slideInUp 0.3s ease-out;
}

/* ===== 加载状态样式 ===== */
.captcha-loading {
  margin: 4px 0;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}

/* ===== 进度条 ===== */
.captcha-progress {
  margin-top: 8px;
  margin-bottom: 4px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(24, 144, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    #1890ff 0%,
    #40a9ff 25%,
    #69c0ff 50%,
    #91d5ff 75%,
    #1890ff 100%
  );
  background-size: 200px 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
  animation: shimmer 2s infinite linear;
}

.progress-text {
  font-size: 12px;
  color: #1890ff;
  text-align: center;
  opacity: 0.8;
}

.captcha-container {
  border-radius: 6px;
  overflow: visible;
  animation: fadeInScale 0.4s ease-out 0.1s both;
  max-width: 100%;
  width: fit-content;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== 动画效果 ===== */
.no-animation,
.no-animation *,
.no-animation .captcha-icon,
.no-animation .captcha-container {
  animation: none !important;
  transition: none !important;
}

.captcha-slide-enter-active,
.captcha-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.captcha-slide-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.captcha-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.captcha-icon {
  animation: pulse 2s infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ===== 响应式设计 ===== */
@media (max-width: 640px) {
  .captcha-wrapper {
    margin: 6px 0;
    max-width: 100%;
  }
  
  .captcha-header {
    padding: 10px 12px 3px 12px;
    gap: 8px;
  }
  
  .captcha-body {
    padding: 0 12px 4px 12px;
  }
  
  .captcha-icon-wrapper {
    width: 24px;
    height: 24px;
  }
  
  .captcha-icon {
    width: 12px;
    height: 12px;
  }
  
  .captcha-title {
    font-size: 12px;
  }
  
  .captcha-subtitle {
    font-size: 10px;
  }
  
  .progress-text {
    font-size: 11px;
  }
}

/* ===== 深色模式适配 ===== */
.dark {
  .progress-text {
    color: #69c0ff;
  }
  
  .progress-bar {
    background: rgba(24, 144, 255, 0.2);
  }
}

/* ===== Nuxt UI 深色模式适配 ===== */
.dark .progress-text {
  color: #69c0ff;
}

.dark .progress-bar {
  background: rgba(24, 144, 255, 0.2);
}
</style>