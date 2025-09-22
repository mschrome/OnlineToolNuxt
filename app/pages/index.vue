<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          在线工具箱
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          简单、快速、实用的在线工具集合
        </p>
      </div>

      <!-- IP 检测卡片 -->
      <div class="main-card">
        <div class="card-header">
          <div class="flex items-center justify-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
              <UIcon name="i-heroicons-globe-alt" class="text-white text-xl" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-white">
              IP 地址检测
            </h2>
          </div>
        </div>

        <!-- IP 显示区域 -->
        <div class="ip-display-section">
          <div class="ip-container">
            <span class="ip-label">您的 IP 地址</span>
            <div class="ip-value">{{ userIP }}</div>
          </div>
          
          <!-- IP 信息标签 -->
          <div v-if="userIP_Info.display" class="ip-info-tags">
            <span class="info-tag location-tag">
              <UIcon name="i-heroicons-map-pin" class="mr-1" />
              {{ userIP_Info.area }}
            </span>
            <span class="info-tag isp-tag">
              <UIcon name="i-heroicons-building-office" class="mr-1" />
              {{ userIP_Info.remark }}
            </span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-section">
          <UButton
            @click="getIP_Info(userIP)"
            :disabled="userIP_Info.display"
            class="action-button"
            size="lg"
            :loading="false"
          >
            <UIcon name="i-heroicons-magnifying-glass" class="mr-2" />
            {{ userIP_Info.display ? '已获取详细信息' : '查看详细信息' }}
          </UButton>
        </div>
      </div>

      <!-- 使用指南卡片 -->
      <div class="guide-card">
        <h3 class="guide-title">
          <UIcon name="i-heroicons-book-open" class="mr-2" />
          使用指南
        </h3>
        
        <div class="guide-grid">
          <div class="guide-item">
            <div class="guide-icon terminal-icon">
              <UIcon name="i-heroicons-terminal" />
            </div>
            <div class="guide-content">
              <h4 class="guide-item-title">终端查询</h4>
              <p class="guide-description">
                macOS/Linux 用户可在终端使用：
              </p>
              <div class="command-container">
                <code class="command-text">curl https://tool.mintimate.cn/getIP</code>
                <button @click="copyCommandTool" class="copy-button">
                  <UIcon name="i-heroicons-clipboard-document" />
                </button>
              </div>
            </div>
          </div>

          <div class="guide-item">
            <div class="guide-icon windows-icon">
              <UIcon name="i-heroicons-computer-desktop" />
            </div>
            <div class="guide-content">
              <h4 class="guide-item-title">Windows PowerShell</h4>
              <p class="guide-description">
                Windows 原生 PowerShell 无法直接使用此接口，建议使用网页版本。
              </p>
            </div>
          </div>

          <div class="guide-item">
            <div class="guide-icon limit-icon">
              <UIcon name="i-heroicons-shield-check" />
            </div>
            <div class="guide-content">
              <h4 class="guide-item-title">使用限制</h4>
              <p class="guide-description">
                为防止滥用，单个 IP 每日调用次数有限制，请合理使用。
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 广告区域 -->
      <div class="ad-section">
        <div class="ad-container">
          <div class="wwads-cn wwads-horizontal" data-id="264"></div>
        </div>
        <div class="demo-image">
          <img :src="NotFoundIMG" alt="演示图片" class="demo-img" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from 'vue';
import {get} from '~/utils/request.js';

const toast = useToast();

useHead({
  title: '在线工具箱-By Mintimate',
  meta: [
    {
      name: 'description',
      content:
          'Mintimate的在线工具箱，致力于打造便民服务。为开发者、Minecraft游戏爱好者，创建方便的在线工具',
    },
    {
      name: 'keywords',
      content:
          '在线工具箱,便民工具,站点工具,开发者,开发者实用工具,IP查询,图片处理,Base64转码,字数统计,字符统计,MC服务器检测,Minecraft服务器检测',
    },
  ],
});
let userIP = ref('...加载中...');
let userIP_Info = reactive({
  display: false,
  area: '',
  remark: '',
});
onMounted(() => {
  handleImgSrc();
  get('/IP/getBase').then((resp) => {
    userIP.value = resp.data;
  });
});
let NotFoundIMG = ref('');
let curlGetIPDemo = ref('');
const handleImgSrc = async () => {
  let m = await import('~/assets/IP_Utils/index.png');
  let c = await import('~/assets/IP_Utils/curlGetIPDemo.png');
  NotFoundIMG.value = m.default;
  curlGetIPDemo.value = c.default;
};

/**
 * 获取IP信息
 * @param {string} ip IP地址
 */
const getIP_Info = (ip) => {
  get('/IP/getInfo/' + ip.toString())
      .then((resp) => {
        if (resp.flag) {
          userIP_Info.display = true;
          userIP_Info.area = resp.data.city;
          userIP_Info.remark = resp.data.isp;
        }
      })
      .catch(() => {
        toast.add({
          id: 'Module Error',
          title: '获取IP详细信息失败',
          description: '无IP数据',
        });
      });
};

/** 点击复制IP检测命令 */
const copyCommandTool = () => {
  const text = 'curl https://tool.mintimate.cn/getIP';
  navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.add({
          id: 'Module Error',
          title: '复制成功',
          description: '快去粘贴吧',
          icon: 'i-heroicons-face-smile-20-solid',
          timeout: 5000,
        });
      })
      .catch(() => {
        toast.add({
          id: 'Module Error',
          title: '复制失败',
          description: '请手动复制',
          icon: 'i-heroicons-face-frown-20-solid',
          timeout: 5000,
        });
      });
};
</script>

<style scoped>
/* 主卡片样式 */
.main-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.main-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .main-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}

/* 卡片头部 */
.card-header {
  text-align: center;
}

/* IP 显示区域 */
.ip-display-section {
  text-align: center;
  margin-bottom: 2rem;
}

.ip-container {
  margin-bottom: 1.5rem;
}

.ip-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(100, 116, 139);
  margin-bottom: 0.75rem;
}

.ip-value {
  display: inline-block;
  background: linear-gradient(to right, rgb(241, 245, 249), rgb(248, 250, 252));
  color: rgb(30, 41, 59);
  font-size: 2.25rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-weight: 700;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  border: 2px solid rgb(226, 232, 240);
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
}

.ip-value:hover {
  background: linear-gradient(to right, rgb(239, 246, 255), rgb(250, 245, 255));
  border-color: rgb(147, 197, 253);
}

@media (prefers-color-scheme: dark) {
  .ip-label {
    color: rgb(148, 163, 184);
  }
  
  .ip-value {
    background: linear-gradient(to right, rgb(51, 65, 85), rgb(71, 85, 105));
    color: white;
    border-color: rgb(71, 85, 105);
  }
  
  .ip-value:hover {
    background: linear-gradient(to right, rgb(71, 85, 105), rgb(100, 116, 139));
    border-color: rgb(100, 116, 139);
  }
}

@media (max-width: 768px) {
  .ip-value {
    font-size: 1.5rem;
    padding: 0.75rem 1rem;
  }
}

/* IP 信息标签 */
.ip-info-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
}

.info-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.location-tag {
  background: rgb(209, 250, 229);
  color: rgb(4, 120, 87);
  border: 1px solid rgb(167, 243, 208);
}

.isp-tag {
  background: rgb(219, 234, 254);
  color: rgb(29, 78, 216);
  border: 1px solid rgb(191, 219, 254);
}

.info-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  .location-tag {
    background: rgba(6, 78, 59, 0.3);
    color: rgb(110, 231, 183);
    border-color: rgb(6, 78, 59);
  }
  
  .isp-tag {
    background: rgba(30, 58, 138, 0.3);
    color: rgb(147, 197, 253);
    border-color: rgb(30, 58, 138);
  }
}

/* 操作按钮区域 */
.action-section {
  text-align: center;
}

/* 指南卡片 */
.guide-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  backdrop-filter: blur(10px);
}

@media (prefers-color-scheme: dark) {
  .guide-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  }
}

.guide-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 2rem;
}

@media (prefers-color-scheme: dark) {
  .guide-title {
    color: white;
  }
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .guide-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.guide-item {
  background: rgb(248, 250, 252);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.guide-item:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  background: rgb(241, 245, 249);
}

@media (prefers-color-scheme: dark) {
  .guide-item {
    background: rgba(51, 65, 85, 0.5);
  }
  
  .guide-item:hover {
    background: rgb(51, 65, 85);
  }
}

.guide-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.terminal-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
}

.windows-icon {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(6, 182, 212));
}

.limit-icon {
  background: linear-gradient(to right, rgb(249, 115, 22), rgb(239, 68, 68));
}

.guide-content {
  text-align: center;
}

.guide-item-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.75rem;
}

@media (prefers-color-scheme: dark) {
  .guide-item-title {
    color: white;
  }
}

.guide-description {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  margin-bottom: 1rem;
  line-height: 1.625;
}

@media (prefers-color-scheme: dark) {
  .guide-description {
    color: rgb(148, 163, 184);
  }
}

/* 命令容器 */
.command-container {
  position: relative;
  background: rgb(15, 23, 42);
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.command-text {
  color: rgb(74, 222, 128);
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.875rem;
  flex: 1;
  margin-right: 0.5rem;
  word-break: break-all;
}

.copy-button {
  background: rgb(51, 65, 85);
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
}

.copy-button:hover {
  background: rgb(71, 85, 105);
}

@media (prefers-color-scheme: dark) {
  .command-container {
    background: rgb(30, 41, 59);
    border: 1px solid rgb(71, 85, 105);
  }
}

/* 广告区域 */
.ad-section {
  text-align: center;
}

.ad-section > * + * {
  margin-top: 2rem;
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

.demo-image {
  display: flex;
  justify-content: center;
}

.demo-img {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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

.main-card, .guide-card {
  animation: fadeInUp 0.6s ease-out;
}

.guide-item:nth-child(1) { animation-delay: 0.1s; }
.guide-item:nth-child(2) { animation-delay: 0.2s; }
.guide-item:nth-child(3) { animation-delay: 0.3s; }
</style>
