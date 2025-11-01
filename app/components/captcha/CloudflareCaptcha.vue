<template>
  <div v-if="isVisible" class="captcha-status">
    <div class="captcha-indicator">
      <svg class="captcha-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
      </svg>
      <span>{{ statusText }}</span>
    </div>
    <div :id="containerId" class="captcha-container"></div>
  </div>
</template>

<script setup>
import { ref, nextTick, onUnmounted, watch } from 'vue'

/**
 * Cloudflare Turnstile 验证码组件
 * 作者: Mintimate
 * 创建时间: 2025-11-01
 * 描述: 可复用的 Cloudflare Turnstile 验证码组件
 * 参考文档: https://developers.cloudflare.com/turnstile/
 */

// Props
const props = defineProps({
  appId: {
    type: String,
    required: true,
    default: 'your_turnstile_site_key'
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
    default: '请完成安全验证...'
  },
  containerId: {
    type: String,
    default: 'cf-turnstile-container'
  },
  theme: {
    type: String,
    default: 'auto',  // 'light', 'dark', 'auto'
    validator: (value) => ['light', 'dark', 'auto'].includes(value)
  },
  size: {
    type: String,
    default: 'normal',  // 'normal', 'compact'
    validator: (value) => ['normal', 'compact'].includes(value)
  },
  language: {
    type: String,
    default: 'auto'  // 语言代码或 'auto'
  },
  action: {
    type: String,
    default: 'submit'
  },
  cData: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['success', 'cancel', 'error', 'show', 'hide'])

// 响应式状态
const isVisible = ref(false)
const widgetId = ref(null)
const captchaToken = ref('')

// DOM就绪检查函数
const waitForDOMReady = async (element, maxAttempts = 10) => {
  for (let i = 0; i < maxAttempts; i++) {
    if (element && element.offsetParent !== null && element.getBoundingClientRect().width > 0) {
      return true
    }
    await new Promise(resolve => requestAnimationFrame(resolve))
  }
  console.warn('DOM元素未能在预期时间内就绪')
  return false
}

// 验证码加载错误处理函数
const captchaLoadErrorCallback = () => {
  console.warn('Cloudflare Turnstile 加载失败，生成容灾票据')

  const token = 'cf_fallback_' + Math.random().toString(36).substr(2) + '_' + Date.now()

  emit('success', {
    token: token,
    errorCode: 1001,
    errorMessage: 'jsload_error'
  })
  
  hideCaptcha()
}

// 验证码成功回调
const onSuccess = (token) => {
  console.log('Cloudflare Turnstile 验证成功')
  captchaToken.value = token
  
  emit('success', {
    token: token
  })
  
  // 验证成功后自动隐藏
  setTimeout(() => {
    hideCaptcha()
  }, 500)
}

// 验证码过期回调
const onExpired = () => {
  console.warn('Cloudflare Turnstile 验证过期')
  
  emit('error', {
    errorCode: 'expired',
    errorMessage: 'Token expired'
  })
}

// 验证码错误回调
const onError = (error) => {
  console.error('Cloudflare Turnstile 验证失败:', error)
  
  emit('error', {
    errorCode: 'verification_failed',
    errorMessage: error
  })
}

// 加载 Cloudflare Turnstile 脚本
const loadTurnstileScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.turnstile !== 'undefined') {
      resolve(window.turnstile)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    
    script.onload = () => {
      // 等待 turnstile 对象可用
      const waitForTurnstile = () => {
        if (window.turnstile) {
          resolve(window.turnstile)
        } else {
          setTimeout(waitForTurnstile, 100)
        }
      }
      waitForTurnstile()
    }
    
    script.onerror = () => {
      reject(new Error('Failed to load Turnstile script'))
    }
    
    document.head.appendChild(script)
  })
}

// 显示验证码
const showCaptcha = async () => {
  if (!props.enabled) {
    // 如果未启用验证码，直接触发成功回调
    emit('success', {
      token: 'disabled_' + Date.now()
    })
    return
  }
  
  // 检查是否在客户端环境
  if (typeof window === 'undefined') {
    console.warn('服务端环境，跳过验证码验证')
    emit('success', {
      token: 'ssr_' + Date.now()
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
    captchaContainer.innerHTML = ''
    
    // 动态加载验证码脚本
    let turnstile
    try {
      turnstile = await loadTurnstileScript()
    } catch (importError) {
      console.error('Cloudflare Turnstile 脚本加载失败:', importError)
      captchaLoadErrorCallback()
      return
    }
    
    // 检查 turnstile 是否可用
    if (!turnstile) {
      console.error('turnstile 未加载')
      captchaLoadErrorCallback()
      return
    }
    
    // 等待DOM完全稳定并确保容器可用
    await waitForDOMReady(captchaContainer)
    
    // 渲染 Turnstile 组件
    widgetId.value = turnstile.render(`#${props.containerId}`, {
      sitekey: props.appId,
      theme: props.theme,
      size: props.size,
      language: props.language,
      action: props.action,
      cData: props.cData,
      callback: onSuccess,
      'expired-callback': onExpired,
      'error-callback': onError
    })
    
  } catch (error) {
    console.error('Cloudflare Turnstile 初始化失败:', error)
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
  
  // 重置 widget
  if (widgetId.value !== null && window.turnstile) {
    try {
      window.turnstile.reset(widgetId.value)
    } catch (error) {
      console.warn('重置 Turnstile 失败:', error)
    }
  }
  
  widgetId.value = null
  captchaToken.value = ''
}

// 监听 show prop 变化
watch(() => props.show, (newValue) => {
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
  getCaptchaToken: () => captchaToken.value
})
</script>

<style scoped>
/* ===== 验证码状态 ===== */
.captcha-status {
  margin-bottom: 8px;
  padding: 12px 16px;
  background: rgba(24, 144, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(24, 144, 255, 0.2);
  border-radius: 8px;
  font-size: 13px;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);
  animation: slideInUp 0.3s ease-out;
}

.captcha-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1890ff;
  font-weight: 500;
  margin-bottom: 12px;
}

.captcha-icon {
  flex-shrink: 0;
  animation: pulse 2s infinite;
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
    opacity: 0.5;
  }
}
</style>
