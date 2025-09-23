<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          OneIndex 桥接
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          OneDrive 应用授权验证桥接服务
        </p>
      </div>

      <!-- 状态卡片 -->
      <div class="status-card">
        <div class="status-header">
          <div class="status-icon" :class="newLinkDisabled ? 'processing' : 'success'">
            <UIcon :name="newLinkDisabled ? 'i-heroicons-clock' : 'i-heroicons-check-circle'" />
          </div>
          <div class="status-content">
            <h3 class="status-title">
              {{ newLinkDisabled ? '正在处理授权请求' : '授权验证成功' }}
            </h3>
            <p class="status-description">
              {{ newLinkDisabled ? '请稍候，系统正在验证您的授权信息...' : '已成功获取授权码，可以继续安装流程' }}
            </p>
          </div>
        </div>

        <div class="status-body">
          <div v-if="newLinkDisabled" class="processing-container">
            <div class="processing-code">{{ info }}</div>
            <div class="processing-spinner">
              <div class="spinner"></div>
            </div>
          </div>
          <div v-else class="success-container">
            <UButton
              :to="newLink"
              external
              target="_self"
              size="lg"
              class="continue-button"
            >
              <UIcon name="i-heroicons-arrow-right" class="mr-2" />
              继续安装流程
            </UButton>
          </div>
        </div>
      </div>

      <!-- 信息卡片网格 -->
      <div class="info-grid">
        <!-- 警告信息 -->
        <div class="info-card warning-card">
          <div class="info-icon warning-icon">
            <UIcon name="i-heroicons-exclamation-triangle" />
          </div>
          <div class="info-content">
            <h3 class="info-title">重要提醒</h3>
            <div class="warning-text">
              <p class="warning-main">请勿直接访问此页面</p>
              <p class="warning-sub">
                此页面仅用于 OneDrive 应用授权验证，直接访问将显示"构建失败"提示。
                请通过正确的授权流程访问此页面。
              </p>
            </div>
          </div>
        </div>

        <!-- 工作原理 -->
        <div class="info-card">
          <div class="info-icon mechanism-icon">
            <UIcon name="i-heroicons-cog-6-tooth" />
          </div>
          <div class="info-content">
            <h3 class="info-title">桥接原理</h3>
            <p class="info-description">
              通过伪静态规则，让 OneDrive 服务器识别为合法的应用重定向验证任务，
              实现授权码的安全传递和验证。
            </p>
          </div>
        </div>

        <!-- 资源链接 -->
        <div class="info-card">
          <div class="info-icon resources-icon">
            <UIcon name="i-heroicons-book-open" />
          </div>
          <div class="info-content">
            <h3 class="info-title">相关资源</h3>
            <div class="resources-list">
              <a 
                href="https://github.com/Mintimate/OneindexM" 
                target="_blank" 
                class="resource-link"
              >
                <UIcon name="i-heroicons-code-bracket" class="mr-2" />
                OneIndexM 仓库
              </a>
              <a 
                href="https://www.mintimate.cn/2020/09/22/oneindex/" 
                target="_blank" 
                class="resource-link"
              >
                <UIcon name="i-heroicons-document-text" class="mr-2" />
                搭建教程
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用提示 -->
      <div class="usage-notice">
        <div class="notice-content">
          <UIcon name="i-heroicons-heart" class="notice-icon" />
          <p class="notice-text">
            这是公共免费资源，请合理、适度使用 (*≧ω≦)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// SEO 设置
useHead({
  title: 'OneIndex桥接服务-在线工具箱',
  meta: [
    {
      name: 'description',
      content: 'OneDrive应用授权验证桥接服务，用于OneIndex安装过程中的授权验证。',
    },
    {
      name: 'keywords',
      content: '在线工具箱,OneIndex,OneDrive,授权验证,桥接服务',
    },
  ],
});

// 响应式数据
const info = ref("正在验证授权信息...");
const newLink = ref('');
const newLinkDisabled = ref(true);

// 获取路由参数
const route = useRoute();
const query = route.query;
const url = query.state;
const code = query.code;

/** 生成链接 */
const makeLink = () => {
  if (url == undefined || code == undefined) {
    info.value = "构建失败，请重新调试";
  } else {
    newLinkDisabled.value = false;
    newLink.value = decodeURIComponent(url) + "?code=" + code;
  }
};

// 组件挂载时执行
onMounted(() => {
  // 添加一个小延迟来模拟处理过程
  setTimeout(() => {
    makeLink();
  }, 1000);
});
</script>

<style scoped>
/* 状态卡片 */
.status-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.status-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.dark {
  .status-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}

/* 状态头部 */
.status-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .status-header {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.status-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.status-icon.processing {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.status-icon.success {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
}

.status-content {
  flex: 1;
}

.status-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(30, 41, 59);
  margin-bottom: 0.5rem;
}

.dark {
  .status-title {
    color: white;
  }
}

.status-description {
  color: rgb(100, 116, 139);
  font-size: 1rem;
}

.dark {
  .status-description {
    color: rgb(148, 163, 184);
  }
}

/* 状态主体 */
.status-body {
  text-align: center;
}

.processing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.processing-code {
  background: rgb(248, 250, 252);
  border: 2px solid rgb(226, 232, 240);
  border-radius: 0.75rem;
  padding: 1.5rem 2rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(59, 130, 246);
  letter-spacing: 0.05em;
}

.dark {
  .processing-code {
    background: rgb(51, 65, 85);
    border-color: rgba(71, 85, 105, 0.5);
    color: rgb(147, 197, 253);
  }
}

.processing-spinner {
  display: flex;
  justify-content: center;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-top: 3px solid rgb(59, 130, 246);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success-container {
  padding: 1rem 0;
}

.continue-button {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129)) !important;
  border: none !important;
  font-weight: 600;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  transition: all 0.3s ease;
}

.continue-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
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

.warning-card {
  border-color: rgba(249, 115, 22, 0.3);
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.05), rgba(239, 68, 68, 0.05));
}

.dark {
  .warning-card {
    border-color: rgba(249, 115, 22, 0.4);
    background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(239, 68, 68, 0.1));
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

.warning-icon {
  background: linear-gradient(to right, rgb(249, 115, 22), rgb(239, 68, 68));
}

.mechanism-icon {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.resources-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
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

/* 警告文本 */
.warning-text {
  font-size: 0.875rem;
}

.warning-main {
  font-weight: 600;
  color: rgb(249, 115, 22);
  margin-bottom: 0.5rem;
}

.warning-sub {
  color: rgb(100, 116, 139);
  line-height: 1.5;
}

.dark {
  .warning-main {
    color: rgb(251, 146, 60);
  }
  
  .warning-sub {
    color: rgb(148, 163, 184);
  }
}

/* 资源链接 */
.resources-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.resource-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgb(248, 250, 252);
  border-radius: 0.5rem;
  color: rgb(59, 130, 246);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.resource-link:hover {
  background: rgb(59, 130, 246);
  color: white;
  transform: translateX(4px);
}

.dark {
  .resource-link {
    background: rgb(51, 65, 85);
    color: rgb(147, 197, 253);
    border-color: rgba(147, 197, 253, 0.2);
  }
  
  .resource-link:hover {
    background: rgb(59, 130, 246);
    color: white;
  }
}

/* 使用提示 */
.usage-notice {
  text-align: center;
}

.notice-content {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  border-radius: 2rem;
  padding: 1rem 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dark {
  .notice-content {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.notice-icon {
  color: rgb(239, 68, 68);
  font-size: 1.25rem;
}

.notice-text {
  color: rgb(100, 116, 139);
  font-weight: 500;
  margin: 0;
}

.dark {
  .notice-text {
    color: rgb(148, 163, 184);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .status-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .resources-list {
    gap: 0.5rem;
  }
  
  .notice-content {
    flex-direction: column;
    gap: 0.5rem;
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

.status-card, .info-card {
  animation: fadeInUp 0.6s ease-out;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }

.usage-notice {
  animation: fadeInUp 0.6s ease-out 0.4s both;
}
</style>
