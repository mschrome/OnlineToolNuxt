<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Minecraft 服务器状态检测
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          快速检测 Minecraft 服务器在线状态和详细信息
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="tool-card">
        <!-- 输入区域 -->
        <div class="input-section">
          <div class="input-header">
            <div class="input-title">
              <UIcon name="i-simple-icons-minecraft" class="mr-2" />
              服务器地址
            </div>
            <div class="mode-controls">
              <UBadge size="sm" label="检测模式" class="mr-2"/>
              <USelect
                size="sm"
                color="primary"
                v-model="workMode"
                :items="[
                  { label: 'Java服务器', value: 'Java' },
                  { label: 'BE服务器', value: 'BE' },
                ]"
                option-attribute="name"
                class="mr-2"
              />
              <UButton @click="handleReset" size="sm" variant="outline" label="重置"/>
            </div>
          </div>
          <div class="input-container">
            <UInput
              v-model="checkFull"
              size="xl"
              placeholder="请输入服务器地址，如：mc.hypixel.net 或 192.168.1.100:25565"
              icon="i-simple-icons-minecraft"
              class="server-input"
            />
            <UButton
              @click="handleCheckServer()"
              :disabled="!checkFull.trim()"
              class="check-button"
              size="xl"
            >
              <UIcon name="i-heroicons-magnifying-glass" class="mr-2" />
              检测服务器
            </UButton>
          </div>
        </div>

        <!-- 验证码组件 -->
        <qCloudCaptcha 
          app-id="189907674"
          :show="captchaState.isVerifying"
          container-id="mc-captcha-container"
          button-id="mc-captcha-button"
          status-text="为防止恶意请求，请完成安全验证"
          button-text="开始验证"
          globalMode
          @success="onCaptchaSuccess"
          @cancel="onCaptchaCancel"
          @error="onCaptchaError"
          @hide="onCaptchaHide"
        />

        <!-- 服务器信息展示区域 -->
        <div class="server-info-section">
          <div class="server-info-header">
            <UIcon name="i-heroicons-server" class="mr-2" />
            服务器信息
          </div>
          
          <div class="server-info-card">
            <div class="server-icon-container">
              <img
                class="server-icon"
                :src="!!serverInfo.favicon ? serverInfo.favicon : '/defaultMinecraft.png'"
                alt="服务器图标"
              />
            </div>
            
            <ClientOnly>
              <div v-if="isLoading" class="server-details loading">
                <div class="server-title">
                  <USkeleton class="h-8 w-[200px]" :ui="{ background: 'bg-gray-300 dark:bg-amber-100/25' }"/>
                </div>
                <div class="server-info-grid">
                  <div v-for="i in 5" :key="i" class="info-row">
                    <USkeleton class="h-5 w-[120px]" :ui="{ background: 'bg-gray-300 dark:bg-amber-100/25' }" />
                    <USkeleton class="h-5 w-[200px]" :ui="{ background: 'bg-gray-300 dark:bg-amber-100/25' }" />
                  </div>
                </div>
              </div>
              
              <div v-else class="server-details">
                <div class="server-title">
                  {{ serverInfo.status !== -1 ? '服务器在线信息' : '等待检测' }}
                </div>
                
                <div v-if="serverInfo.status !== -1" class="server-info-grid">
                  <div class="info-row">
                    <div class="info-label">服务器描述</div>
                    <div class="info-value" v-html="serverInfo.description"/>
                  </div>
                  <div class="info-row">
                    <div class="info-label">游戏版本</div>
                    <div class="info-value" v-html="serverInfo.version.name"/>
                  </div>
                  <div class="info-row">
                    <div class="info-label">服务器状态</div>
                    <div class="info-value">
                      <UBadge 
                        :color="serverInfo.status === '1' ? 'primary' : 'warning'"
                        :label="serverInfo.status === '1' ? 'Online' : 'Offline'"
                      />
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">在线人数</div>
                    <div class="info-value">
                      {{ serverInfo.players.online }}/{{ serverInfo.players.max }}
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">检测时间</div>
                    <div class="info-value">
                      {{ new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }) }}
                    </div>
                  </div>
                </div>
                
                <div v-else class="usage-tips">
                  <div class="tips-title">使用说明</div>
                  <ul class="tips-list">
                    <li>免费资源，请合理使用；请勿使用本工具攻击他人服务器</li>
                    <li>支持 Java、Bedrock 版本 Minecraft，不支持局域网内游戏检测</li>
                    <li>为防止资源滥用和恶意使用本工具，<span class="highlight">一小时内，最多请求本工具5次</span></li>
                    <li>如果觉得此工具有用，可以加入我们
                      <a class="sponsor-link" href="https://afdian.com/a/mintimate" target="_blank">爱发电</a>，
                      赞助服务器维护费用ヾ(≧≦)〃
                    </li>
                  </ul>
                </div>
              </div>
              
              <template v-slot:fallback>
                <div class="server-details">
                  <div class="server-title">等待检测</div>
                  <div class="usage-tips">
                    <div class="tips-title">使用说明</div>
                    <ul class="tips-list">
                      <li>免费资源，请合理使用；请勿使用本工具攻击他人服务器</li>
                      <li>支持 Java、Bedrock 版本 Minecraft，不支持局域网内游戏检测</li>
                      <li>为防止资源滥用和恶意使用本工具，<span class="highlight">一小时内，最多请求本工具5次</span></li>
                      <li>如果觉得此工具有用，可以加入我们
                        <a class="sponsor-link" href="https://afdian.com/a/mintimate" target="_blank">爱发电</a>，
                        赞助服务器维护费用ヾ(≧≦)〃
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>

      <!-- 信息卡片 -->
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon about-icon">
            <UIcon name="i-simple-icons-minecraft" />
          </div>
          <div class="info-content">
            <h3 class="info-title">支持版本</h3>
            <p class="info-description">
              支持 Minecraft Java 版和 Bedrock 版服务器状态检测，获取详细的服务器信息包括在线人数、版本信息等。
            </p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon usage-icon">
            <UIcon name="i-heroicons-server" />
          </div>
          <div class="info-content">
            <h3 class="info-title">检测信息</h3>
            <ul class="info-list">
              <li>服务器在线状态</li>
              <li>当前在线人数</li>
              <li>服务器版本信息</li>
              <li>服务器描述信息</li>
            </ul>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon security-icon">
            <UIcon name="i-heroicons-shield-check" />
          </div>
          <div class="info-content">
            <h3 class="info-title">使用限制</h3>
            <p class="info-description">
              为防止滥用，每小时限制检测5次。请合理使用本工具，不要用于攻击他人服务器。
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
import {reactive, ref} from 'vue';
import qCloudCaptcha from '~/components/qCloudCaptcha.vue';

const toast = useToast();

useHead({
  title: 'Minecraft服务器在线状态检测-在线工具箱',
  meta: [
    {
      name: 'description',
      content:
          '在线检测Minecraft服务器的状态，支持Java和Bedrock版本服务器；检测成功后，返回当前的在线人数、服务器的标识信息和服务器的版本。',
    },
    {
      name: 'keywords',
      content: '在线工具箱,Minecraft服务器状态检测,Minecraft Java版本,Minecraft Bedrock版本服务器',
    },
  ],
});

// 验证码状态
const captchaState = reactive({
  isVerifying: false,
  ticket: '',
  randstr: '',
});


// Minecraft颜色对应16进
const colorMap = {
  '§0': '#000000', // Black
  '§1': '#0000AA', // Dark Blue
  '§2': '#00AA00', // Dark Green
  '§3': '#00AAAA', // Dark Aqua
  '§4': '#AA0000', // Dark Red
  '§5': '#AA00AA', // Dark Purple
  '§6': '#FFAA00', // Gold
  '§7': '#AAAAAA', // Gray
  '§8': '#555555', // Dark Gray
  '§9': '#5555FF', // Blue
  '§a': '#55FF55', // Green
  '§b': '#55FFFF', // Aqua
  '§c': '#FF5555', // Red
  '§d': '#FF55FF', // Light Purple
  '§e': '#FFFF55', // Yellow
  '§f': '#FFFFFF', // White
};

// 被检测的服务器IP
let checkFull = ref('');

// 切换模式
let workMode = ref('Java');

// 加载模式
let isLoading = ref(false)

// 服务器响应的信息
let serverInfo = reactive({
  status: -1,
  players: {
    max: 0,
    online: 0,
    sample: [],
  },
  version: {
    name: '',
    protocol: 0,
  },
  favicon: '',
  description: '',
});


// 处理服务器检测请求
const handleCheckServer = () => {
  console.log('点击检测服务器按钮');
  
  // 检查URL是否为空
  if (!checkFull.value || checkFull.value.trim() === '') {
    toast.add({
      id: 'Input Error',
      title: '输入错误',
      description: '请输入服务器地址后再进行检测',
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 3000,
    });
    return;
  }
  
  // 验证地址格式
  const fullAddress = checkFull.value;
  // 匹配IP地址
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  // 匹配IP地址和端口号
  const ipPortRegex = /^(\d{1,3}\.){3}\d{1,3}:\d+$/;
  // 匹配IP和端口
  const domainRegex = /^(([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.)+[a-zA-Z0-9]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d+)?$/;
  if(!(ipRegex.test(fullAddress) || domainRegex.test(fullAddress) || ipPortRegex.test(fullAddress))){
    toast.add({
      id: 'Module Error',
      title: '参数错误',
      description: '所填写的域名或IP地址非法，请检查',
      icon: 'i-heroicons-face-frown-20-solid',
      timeout: 5000,
    });
    return;
  }
  
  // 每次都需要验证码
  captchaState.isVerifying = true;
};

const getMcStatus = async () => {
  isLoading.value = true
  
  serverInfo.favicon = '';
  
  // 构建请求参数
  const requestParams = {
    serverIp: checkFull.value,
    serverType: workMode.value,
  };
  
  // 如果有验证码票据，添加到请求参数中
  if (captchaState.ticket && captchaState.randstr) {
    requestParams.captchaTicket = captchaState.ticket;
    requestParams.captchaRandstr = captchaState.randstr;
  }
  
  let {status, message} = await $fetch('/api/mcStatus', {
    method: 'GET',
    params: requestParams,
  }).catch((error)=>{
    console.error('MC状态检测失败:', error);
    toast.add({
      id: 'Module Error',
      title: '当前不可用',
      description:
          '操作过于频繁，请等会再试试',
      icon: 'i-heroicons-face-frown-20-solid',
      timeout: 5000,
    });
  }).finally(()=>{
    isLoading.value = false;
    // 清空验证码票据
    captchaState.ticket = '';
    captchaState.randstr = '';
  });
  
  if (status !== undefined && message !== undefined) {
    Object.assign(serverInfo, message);
    serverInfo.status = status;
    if (serverInfo.description) {
      const output =
          (serverInfo.description.text && serverInfo.description.text) ||
          serverInfo.description;
      serverInfo.description = output
          .replace(/§[0-9a-fk-or]/gi, (match) => {
            const color = colorMap[match];
            return `<span style="color: ${color}">`;
          })
          .replace(/\n/g, '<br>');
    } else {
      serverInfo.description = "<span>服务器信息抓取失败，请检查服务器是否在线</span>"
    }
  }
};

const handleClickInfo = () => {
  toast.add({
    id: 'Module Error',
    title: '当前不可用',
    description:
        '因为本系统被攻击者用于恶意攻击他人MC服务器，并且造成本系统服务器大量欠费；服务器还在优化，敬请期待',
    icon: 'i-heroicons-face-frown-20-solid',
    timeout: 5000,
  });
};

// 验证码组件事件处理
const onCaptchaSuccess = (data) => {
  captchaState.ticket = data.ticket;
  captchaState.randstr = data.randstr;
  captchaState.isVerifying = false;
  
  toast.add({
    id: 'Captcha Success',
    title: '验证成功',
    description: '安全验证通过，正在检测服务器状态...',
    icon: 'i-heroicons-check-circle-20-solid',
    timeout: 3000,
  });
  
  // 验证成功后继续检测服务器状态
  getMcStatus();
};

const onCaptchaCancel = () => {
  captchaState.isVerifying = false;
  toast.add({
    id: 'Captcha Cancel',
    title: '验证取消',
    description: '用户取消了安全验证',
    icon: 'i-heroicons-x-circle-20-solid',
    timeout: 3000,
  });
};

const onCaptchaError = (error) => {
  captchaState.isVerifying = false;
  console.error('验证码错误:', error);
  toast.add({
    id: 'Captcha Error',
    title: '验证失败',
    description: '安全验证失败，请重试',
    icon: 'i-heroicons-exclamation-triangle-20-solid',
    timeout: 5000,
  });
};

const onCaptchaHide = () => {
  captchaState.isVerifying = false;
};

/** 重置 */
const handleReset = () => {
  Object.assign(serverInfo, {
    status: -1,
    players: {
      max: 0,
      online: 0,
      sample: [],
    },
    version: {
      name: '',
      protocol: 0,
    },
    favicon: '',
    description: '',
  });
  workMode.value = 'Java';
  checkFull.value = '';
  
  // 重置验证码状态
  captchaState.ticket = '';
  captchaState.randstr = '';
  captchaState.isVerifying = false;
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

/* 输入区域 */
.input-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .input-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .input-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}

.input-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.125rem;
  color: rgb(30, 41, 59);
}

@media (prefers-color-scheme: dark) {
  .input-title {
    color: white;
  }
}

.mode-controls {
  display: flex;
  align-items: center;
}

.input-container {
  display: flex;
  gap: 1rem;
  align-items: stretch;
}

@media (max-width: 768px) {
  .input-container {
    flex-direction: column;
  }
}

.server-input {
  flex: 1;
}

.check-button {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
  color: white;
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 140px;
}

.check-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.3);
}

.check-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 服务器信息区域 */
.server-info-section {
  margin-bottom: 2rem;
}

.server-info-header {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.25rem;
  color: rgb(30, 41, 59);
  margin-bottom: 1.5rem;
}

@media (prefers-color-scheme: dark) {
  .server-info-header {
    color: white;
  }
}

.server-info-card {
  background: rgb(248, 250, 252);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

@media (prefers-color-scheme: dark) {
  .server-info-card {
    background: rgb(51, 65, 85);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

@media (max-width: 768px) {
  .server-info-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.server-icon-container {
  flex-shrink: 0;
}

.server-icon {
  width: 128px;
  height: 128px;
  border-radius: 0.75rem;
  object-fit: cover;
  border: 2px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .server-icon {
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.server-details {
  flex: 1;
  min-width: 0;
}

.server-details.loading {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.server-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(59, 130, 246);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (prefers-color-scheme: dark) {
  .server-title {
    color: rgb(147, 197, 253);
  }
}

.server-info-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(226, 232, 240, 0.3);
}

.info-row:last-child {
  border-bottom: none;
}

@media (prefers-color-scheme: dark) {
  .info-row {
    border-bottom-color: rgba(71, 85, 105, 0.3);
  }
}

@media (max-width: 640px) {
  .info-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    text-align: left;
  }
}

.info-label {
  font-weight: 600;
  color: rgb(71, 85, 105);
  font-size: 0.875rem;
}

@media (prefers-color-scheme: dark) {
  .info-label {
    color: rgb(148, 163, 184);
  }
}

.info-value {
  color: rgb(30, 41, 59);
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .info-value {
    color: white;
  }
}

/* 使用说明 */
.usage-tips {
  margin-top: 1rem;
}

.tips-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 1rem;
}

@media (prefers-color-scheme: dark) {
  .tips-title {
    color: white;
  }
}

.tips-list {
  list-style: none;
  padding: 0;
  color: rgb(100, 116, 139);
  font-size: 0.875rem;
  line-height: 1.625;
}

.tips-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.tips-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(34, 197, 94);
  font-weight: bold;
}

@media (prefers-color-scheme: dark) {
  .tips-list {
    color: rgb(148, 163, 184);
  }
}

.highlight {
  color: rgb(236, 72, 153);
  text-decoration: underline;
  text-decoration-color: rgb(56, 189, 248);
  text-underline-offset: 4px;
}

@media (prefers-color-scheme: dark) {
  .highlight {
    color: rgb(244, 114, 182);
  }
}

.sponsor-link {
  color: rgb(14, 165, 233);
  text-decoration: underline;
  text-decoration-color: rgb(99, 102, 241);
  text-underline-offset: 4px;
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .sponsor-link {
    color: rgb(56, 189, 248);
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
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
}

.usage-icon {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
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

/* 响应式优化 */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .tool-card {
    padding: 1.5rem;
  }
  
  .server-info-card {
    padding: 1.5rem;
  }
}
</style>
