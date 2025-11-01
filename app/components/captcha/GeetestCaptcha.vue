<template>
  <ClientOnly>
    <Transition name="captcha-slide" appear>
      <div v-if="isVisible" class="captcha-wrapper" :class="{ 'in-modal': inModal, 'bind-mode': product === 'bind', 'float-mode': product === 'float' }">
        <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-lg border-0" :class="product === 'float' ? 'overflow-visible' : 'overflow-hidden'">
          <!-- 头部：图标和文字 -->
          <div class="flex items-center gap-3 px-5 py-3.5 pb-1.5">
            <div class="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex-shrink-0">
              <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-white captcha-icon" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 m-0 mb-0.5 leading-tight">安全验证</h3>
              <p class="text-xs text-gray-600 dark:text-gray-400 m-0 leading-snug">{{ statusText }}</p>
            </div>
          </div>
          
          <!-- 验证码区域 -->
          <div v-if="product !== 'bind'" class="px-5 py-3" :class="product === 'float' ? 'captcha-float-container' : ''">
            <div :id="containerId" :data-product="product" :data-in-modal="inModal" class="captcha-container"></div>
          </div>
          <div v-else :id="containerId" style="display: none;"></div>
          
          <!-- 底部标识 -->
          <div class="flex items-center justify-center gap-1 px-5 py-1.5 border-t border-gray-200 dark:border-gray-700 text-[10px] text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-shield-check-solid" class="w-2.5 h-2.5 text-purple-500" />
            <span class="font-medium">极验验证</span>
          </div>
        </div>
      </div>
    </Transition>
    
    <template #fallback>
      <div v-if="props.show" class="captcha-loading">
        <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-lg border-0 overflow-hidden">
          <div class="flex items-center justify-center gap-2 p-4 text-gray-600 dark:text-gray-400">
            <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 text-purple-500 animate-spin" />
            <span class="text-xs font-medium">正在加载验证码...</span>
          </div>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { ref, nextTick, onUnmounted, watch } from 'vue'

/**
 * 极验验证码组件 (Geetest 4.0)
 * 作者: Mintimate
 * 创建时间: 2025-11-01
 * 描述: 可复用的极验验证码组件，支持 bind/popup/float 模式
 */

// Props
const props = defineProps({
  appId: {
    type: String,
    required: true,
    default: 'your_captcha_id'
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
    default: 'gt-captcha-embed'
  },
  language: {
    type: String,
    default: 'zh-cn'
  },
  timeout: {
    type: Number,
    default: 10000
  },
  product: {
    type: String,
    default: 'bind'  // bind, popup, float
  },
  maskBgColor: {
    type: String,
    default: '#0000004d'  // 弹出背景颜色，用于popup和bind类型
  },
  inModal: {
    type: Boolean,
    default: false  // 是否在模态框中使用
  }
})

// Emits
const emit = defineEmits(['success', 'cancel', 'error', 'show', 'hide'])

// 响应式状态
const isVisible = ref(false)
const captchaInstance = ref(null)
const captchaResult = ref(null)

// 验证码成功回调函数
const captchaSuccessCallback = (result) => {
  console.log('极验验证成功:', result)
  captchaResult.value = result
  
  // 检查 result 是否存在以及是否有必要的属性
  if (result && typeof result === 'object') {
    // 后端期望的字段名（使用下划线命名）：
    // lotNumber, captchaOutput, passToken, genTime
    emit('success', {
      lotNumber: result.lot_number || '',
      captchaOutput: result.captcha_output || '',
      passToken: result.pass_token || '',
      genTime: result.gen_time || Math.floor(Date.now() / 1000).toString()
    })
  } else {
    // 如果 result 为空或无效，使用容灾票据
    console.warn('验证结果无效，生成容灾票据:', result)
    emit('success', {
      lotNumber: 'terror_lot_' + Math.random().toString(36).substr(2),
      captchaOutput: 'terror_output_' + Math.random().toString(36).substr(2),
      passToken: 'terror_token_' + Math.random().toString(36).substr(2),
      genTime: Math.floor(Date.now() / 1000).toString()
    })
  }
  hideCaptcha()
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

// 验证码错误回调函数
const captchaErrorCallback = (error) => {
  console.error('极验验证失败:', error)
  emit('error', error)
  
  hideCaptcha()
}

// 验证码关闭回调函数
const captchaCloseCallback = () => {
  console.log('用户关闭了验证码')
  emit('cancel')
  hideCaptcha()
}

// 验证码准备就绪回调函数
const captchaReadyCallback = () => {
  console.log('极验验证码准备就绪')
}

// 验证码加载错误处理函数
const captchaLoadErrorCallback = () => {
  console.warn('极验验证码JS加载失败，生成容灾票据')
  
  // 生成容灾票据（使用 lot_number 格式，因为 captchaSuccessCallback 会转换）
  const result = {
    lot_number: 'terror_lot_' + Math.random().toString(36).substr(2),
    captcha_output: 'terror_output_' + Math.random().toString(36).substr(2),
    pass_token: 'terror_token_' + Math.random().toString(36).substr(2),
    gen_time: Math.floor(Date.now() / 1000).toString()
  }
  
  captchaSuccessCallback(result)
}

// 加载极验验证码脚本
const loadGeetestScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.initGeetest4 !== 'undefined') {
      resolve(window.initGeetest4)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://static.geetest.com/v4/gt4.js'
    
    script.onload = () => {
      if (typeof window.initGeetest4 !== 'undefined') {
        resolve(window.initGeetest4)
      } else {
        reject(new Error('initGeetest4 not loaded'))
      }
    }
    
    script.onerror = () => {
      reject(new Error('Failed to load Geetest script'))
    }
    
    document.head.appendChild(script)
  })
}

// 显示验证码
const showCaptcha = async () => {
  if (!props.enabled) {
    // 如果未启用验证码，直接触发成功回调（后端格式）
    emit('success', {
      lotNumber: 'disabled_' + Date.now(),
      captchaOutput: 'disabled',
      passToken: 'disabled',
      genTime: Math.floor(Date.now() / 1000).toString()
    })
    return
  }
  
  // 检查是否在客户端环境
  if (typeof window === 'undefined') {
    console.warn('服务端环境，跳过验证码验证')
    emit('success', {
      lotNumber: 'ssr_' + Date.now(),
      captchaOutput: 'ssr',
      passToken: 'ssr',
      genTime: Math.floor(Date.now() / 1000).toString()
    })
    return
  }
  
  try {
    isVisible.value = true
    emit('show')
    
    // 等待DOM更新完成
    await nextTick()
    
    // 检查验证码容器是否存在
    const captchaContainer = document.getElementById(props.containerId)
    if (!captchaContainer) {
      console.error('验证码容器不存在')
      captchaLoadErrorCallback()
      return
    }
    
    // 清理容器内容
    if (captchaContainer) {
      captchaContainer.innerHTML = ''
    }
    
    // 动态加载极验验证码脚本
    try {
      await loadGeetestScript()
    } catch (importError) {
      console.error('极验验证码脚本加载失败:', importError)
      captchaLoadErrorCallback()
      return
    }
    
    // 检查 initGeetest4 是否可用
    if (typeof window.initGeetest4 === 'undefined') {
      console.error('initGeetest4 未加载')
      captchaLoadErrorCallback()
      return
    }
    
    // 等待DOM完全稳定并确保容器可用
    await waitForDOMReady(captchaContainer)
    
    // 准备初始化配置
    const initConfig = {
      captchaId: props.appId,
      product: props.product,
      language: props.language,
      timeout: props.timeout,
      riskType: 'slide'
    }
    
    // 为 popup 和 bind 类型添加 mask 配置
    if (props.product === 'popup' || props.product === 'bind') {
      initConfig.mask = {
        bgColor: props.maskBgColor
      }
    }
    
    // 初始化极验验证码
    window.initGeetest4(initConfig, (captcha) => {
      captchaInstance.value = captcha
      
      // 绑定事件监听器
      captcha.onReady(() => {
        captchaReadyCallback()
      })
      
      captcha.onSuccess(() => {
        // 极验4.0需要通过 getValidate() 方法获取验证结果
        try {
          const result = captcha.getValidate()
          captchaSuccessCallback(result)
        } catch (error) {
          console.error('获取验证结果失败:', error)
          captchaSuccessCallback(null)
        }
      })
      
      captcha.onError((error) => {
        captchaErrorCallback(error)
      })
      
      captcha.onClose(() => {
        captchaCloseCallback()
      })
      
      if (props.product === 'bind') {
        // bind 模式：直接将验证码嵌入到状态容器中，不使用 captcha-container
        const statusContainer = captchaContainer.parentElement
        captcha.appendTo(statusContainer)
        // bind 模式可能需要手动触发显示
        setTimeout(() => {
          if (captcha.showBox) {
            captcha.showBox()
          }
        }, 100)
      } else {
        // popup 和 float 模式：将按钮插入到容器中
        captcha.appendTo(captchaContainer)
      }
    })
    
  } catch (error) {
    console.error('极验验证码初始化失败:', error)
    captchaLoadErrorCallback()
  }
}

// 隐藏验证码
const hideCaptcha = () => {
  isVisible.value = false
  emit('hide')
  
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
      console.warn('极验验证码实例销毁失败:', error)
    }
    captchaInstance.value = null
  }
}

// 监听 show prop 变化
watch(() => props.show, (newValue) => {
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
  getCaptchaResult: () => captchaResult.value
})
</script>

<style scoped>
.captcha-wrapper {
  margin: 4px 0;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  animation: slideInUp 0.3s ease-out;
}

.captcha-wrapper.in-modal {
  z-index: 10000;
}

.captcha-wrapper.bind-mode {
  padding-bottom: 0;
}

/* float 模式特殊处理：确保弹出层不被遮挡 */
.captcha-wrapper.float-mode {
  overflow: visible;
  position: relative;
  z-index: 1000;
}

.captcha-loading {
  margin: 4px 0;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
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
  position: relative;
}

.captcha-container[data-product="bind"] {
  display: none;
}

/* float 模式的容器需要允许内容溢出 */
.captcha-float-container {
  overflow: visible !important;
  position: relative;
  z-index: 1001;
}

.captcha-icon {
  animation: pulse 2s infinite;
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

@media (max-width: 640px) {
  .captcha-wrapper {
    margin: 6px 0;
    max-width: 100%;
  }
}

/* 极验验证码 float 模式弹出层样式修复 */
/* 确保极验 float 模式的弹出层不被遮挡 */
:global(.geetest_panel) {
  z-index: 10001 !important;
}

:global(.geetest_holder) {
  z-index: 10001 !important;
}

/* 极验4.0的弹出层类名 */
:global(.geetest_float) {
  z-index: 10001 !important;
}

:global(.geetest_popup) {
  z-index: 10001 !important;
}
</style>
