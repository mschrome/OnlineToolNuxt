<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Github 文件加速
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          快速、稳定的 Github 文件下载加速服务
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="tool-card">
        <!-- 输入区域 -->
        <div class="input-section">
          <div class="input-header">
            <div class="input-title">
              <UIcon name="i-simple-icons-github" class="mr-2" />
              Github 链接输入
            </div>
            <div class="status-indicator" :class="{ active: !submitDisabled }">
              {{ submitDisabled ? '等待输入' : workMode + ' 模式' }}
            </div>
          </div>
          <UInput 
            v-model="inputText"
            @input="inputUrl(inputText)"
            size="xl"
            placeholder="请输入 Github 上文件/仓库地址" 
            :leading-icon="'i-simple-icons-github'"
            :trailing="true"
            :color="submitDisabled ? 'gray' : 'primary'"
            :variant="submitDisabled ? 'outline' : 'outline'"
            class="w-full github-input"
            :ui="{
              base: 'w-full',
              wrapper: 'w-full'
            }"
          >
            <template #trailing>
              <UButton
                :color="submitDisabled ? 'gray' : 'primary'"
                :label="workMode === 'Git' ? '复制克隆命令' : '开始下载'"
                :variant="submitDisabled ? 'ghost' : 'solid'"
                :disabled="submitDisabled"
                @click="handleSubmit()"
                size="xs"
                class="action-button"
              />
            </template>
          </UInput>
        </div>

        <!-- 加速模式选择 -->
        <div class="mode-section">
          <div class="mode-title">
            <UIcon name="i-heroicons-rocket-launch" class="mr-2" />
            加速模式
          </div>
          <div class="mode-options">
            <URadioGroup 
              :items="targetUrlMethods"
              v-model="targetUrl" 
              v-bind="method"
              class="mode-radio"
            />
          </div>
        </div>
      </div>

      <!-- 广告区域 -->
      <div class="ad-section">
        <div class="ad-container">
          <div class="wwads-cn wwads-horizontal" data-id="264"></div>
        </div>
      </div>
      <!-- 信息卡片 -->
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon principle-icon">
            <UIcon name="i-heroicons-cog-6-tooth" />
          </div>
          <div class="info-content">
            <h3 class="info-title">原理解析</h3>
            <div class="info-description">
              <p class="mb-3">所有文件会使用 
                <a class="info-link" href="https://workers.cloudflare.com/" target="_blank">
                  Cloudflare 加速
                </a>
                跳转。文件会跳转至 
                <a class="info-link" href="https://www.jsdelivr.com/" target="_blank">
                  JSDelivr
                </a>
                ，Git 会进行重定向到 
                <a class="info-link" href="https://doc.fastgit.org/zh-cn/" target="_blank">
                  Fastgit.org
                </a>
              </p>
              <p class="text-sm text-amber-600 dark:text-amber-400">
                注意：公共免费资源，请合理、适度使用 (*≧ω≦)
              </p>
            </div>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon mode-icon">
            <UIcon name="i-heroicons-arrow-path" />
          </div>
          <div class="info-content">
            <h3 class="info-title">加速模式</h3>
            <ul class="info-list">
              <li>
                <strong>Git 仓库克隆：</strong>如果链接判断为 Git 仓库的克隆地址（HTTPS），点击按钮会复制 
                <code class="highlight-code">git clone $URL</code> 到剪贴板
              </li>
              <li>
                <strong>文件下载模式：</strong>如果链接判断为 GitHub 上文件、发布文件，点击按钮会在新标签页进行加速下载
              </li>
            </ul>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon support-icon">
            <UIcon name="i-heroicons-document-check" />
          </div>
          <div class="info-content">
            <h3 class="info-title">支持的地址</h3>
            <div class="info-description">
              <p class="mb-3">支持的文件地址（<code>release、archive</code> 以及文件，右键复制出来的链接都符合标准）：</p>
              <ul class="support-list">
                <li>分支源码：<code class="url-example">archive/master.zip</code></li>
                <li>release源码：<code class="url-example">archive/v0.1.0.tar.gz</code></li>
                <li>release文件：<code class="url-example">releases/download/v0.1.0/example.zip</code></li>
                <li>分支文件：<code class="url-example">blob/master/filename</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 开源信息 -->
      <div class="opensource-section">
        <p class="opensource-text">
          基于 MIT 协议开源项目：
          <a class="opensource-link" href="https://github.com/Mintimate/gh-proxy" target="_blank">
            https://github.com/Mintimate/gh-proxy
          </a>
        </p>
        <p class="sponsor-text">
          如果觉得此工具有用，可以
          <a class="sponsor-link" href="https://afdian.com/a/mintimate" target="_blank">
            加入我们爱发电
          </a>
          ，赞助服务器维护费用 ヾ(≧≦)〃
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {nextTick, ref} from 'vue';
import {Decrypt, Encrypt} from "@/utils/handleAES"

const toast = useToast()

console.log(Encrypt("https://codeload.github.com/hunshcn/gh-proxy/zip/refs/heads/master"))

console.log(Decrypt("vD7Q+tlKiboAnqyXduk5axSuM2xJ6YxJMFCeXUCgO0HBCcRbQPQYtjtKWFGhK3c5VxhuCwolmZoNJ+nTgC6wN+EXMP2ftQMP6CCns5/JAbY="))

// Cloudflare地址
const fastGithubApi = "https://gh.flyinbug.top/gh/"

useHead({
  title: 'Github加速-在线工具箱',
  meta: [
    {
      name: 'description',
      content:
          '在线重定向Github链接，使用CloudFlare对Github链接进行加速访问。',
    },
    {
      name: 'keywords',
      content: '在线工具箱,Github下载加速,Github文件加速',
    },
  ],
});

const targetUrlMethods =[
  {value:'cloudflare',label:'CloudFlare + Fastgit + JSDelivr'},
]

let workMode = ref('');
let targetUrl = ref('cloudflare');
let copyGitUrl = ref('');
let submitDisabled = ref(true);
let inputText = ref('');

const exp1 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i
const exp2 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob|raw)\/.*$/i
const exp3 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-).*$/i
const exp4 = /^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+?\/.+$/i
const exp5 = /^(?:https?:\/\/)?gist\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+$/i
const exp6 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/tags.*$/i
/** 输入时间 */
const inputUrl = (inputText) => {
  for (let i of [exp1, exp2, exp3, exp4, exp5, exp6]) {
    if (inputText.search(i) === 0) {
      submitDisabled.value = false;
      workMode.value = 'Download';
      return
    }
    else {
      console.log(inputText.search(i))
    }
  }
  if (new RegExp('^https://github.com/\\w+/(?:\\w|(?:\\.|\\-))+(?:.git)?$').test(inputText)) {
    copyGitUrl.value =
        'git clone ' + fastGithubApi + Encrypt(inputText);
    submitDisabled.value = false;
    workMode.value = 'Git';
  } else {
    console.log("Not")
    submitDisabled.value = true;
  }
};
/** 进行加工 */
const handleSubmit = async () => {
  console.log(workMode.value)
  if (workMode.value === 'Git') {
    navigator.clipboard
        .writeText(copyGitUrl.value)
        .then(() => {
          toast.add({
            id: 'Module Success',
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
            description: '请求被浏览器拒绝',
            icon: 'i-heroicons-face-frown-20-solid',
            timeout: 5000,
          });
        });
  } else if (workMode.value === 'Download') {
    if (isGithubFileURL(inputText.value)) {
      toast.add({
        title: '定位成功，即将开始下载～',
        timeout: 5000
      })
      await nextTick(
          // window.open("/ghs/" + this.githubURL)
          window.open(fastGithubApi + Encrypt(inputText.value)),
      );
    }
  } else {
    toast.add({
      title: '嗷～链接不是GitHub文件嗷……',
      timeout: 5000
    })
  }
};
/** 判断是否为Github */
const isGithubFileURL = (url) => {
  const pattern =
      '^((https|http)://)?(github.com/.+?/.+?/(?:releases|archive|blob|raw|suites)|((?:raw|gist).(?:githubusercontent|github).com))/.+$';
  const re = new RegExp(pattern);
  return re.test(url);
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
  margin-bottom: 1rem;
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

.status-indicator {
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
  background: rgb(248, 250, 252);
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.status-indicator.active {
  color: rgb(59, 130, 246);
  background: rgba(59, 130, 246, 0.1);
}

@media (prefers-color-scheme: dark) {
  .status-indicator {
    color: rgb(148, 163, 184);
    background: rgb(51, 65, 85);
  }
  
  .status-indicator.active {
    color: rgb(147, 197, 253);
    background: rgba(59, 130, 246, 0.2);
  }
}

/* 模式选择区域 */
.mode-section {
  text-align: center;
}

.mode-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
  color: rgb(30, 41, 59);
  margin-bottom: 1rem;
}

@media (prefers-color-scheme: dark) {
  .mode-title {
    color: white;
  }
}

.mode-options {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.mode-radio {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.mode-radio:hover {
  background: rgba(59, 130, 246, 0.05);
}

/* 信息卡片网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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

.principle-icon {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.mode-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
}

.support-icon {
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
  margin-bottom: 1rem;
  line-height: 1.5;
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

.support-list {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  list-style: none;
  padding: 0;
}

.support-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.support-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: rgb(249, 115, 22);
  font-weight: bold;
}

@media (prefers-color-scheme: dark) {
  .support-list {
    color: rgb(148, 163, 184);
  }
}

/* 链接样式 */
.info-link {
  color: rgb(59, 130, 246);
  text-decoration: underline;
  text-decoration-color: rgba(59, 130, 246, 0.3);
  text-underline-offset: 2px;
  transition: all 0.3s ease;
}

.info-link:hover {
  color: rgb(37, 99, 235);
  text-decoration-color: rgb(37, 99, 235);
}

@media (prefers-color-scheme: dark) {
  .info-link {
    color: rgb(147, 197, 253);
  }
  
  .info-link:hover {
    color: rgb(191, 219, 254);
  }
}

/* 代码样式 */
.highlight-code {
  background: rgba(59, 130, 246, 0.1);
  color: rgb(59, 130, 246);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.8125rem;
}

@media (prefers-color-scheme: dark) {
  .highlight-code {
    background: rgba(147, 197, 253, 0.2);
    color: rgb(147, 197, 253);
  }
}

.url-example {
  background: rgba(249, 115, 22, 0.1);
  color: rgb(249, 115, 22);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.8125rem;
}

@media (prefers-color-scheme: dark) {
  .url-example {
    background: rgba(251, 146, 60, 0.2);
    color: rgb(251, 146, 60);
  }
}

/* 开源信息区域 */
.opensource-section {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  margin-bottom: 2rem;
}

@media (prefers-color-scheme: dark) {
  .opensource-section {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.opensource-text {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  margin-bottom: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  .opensource-text {
    color: rgb(148, 163, 184);
  }
}

.opensource-link {
  color: rgb(59, 130, 246);
  text-decoration: underline;
  text-decoration-color: rgba(59, 130, 246, 0.3);
  text-underline-offset: 2px;
}

.opensource-link:hover {
  color: rgb(37, 99, 235);
  text-decoration-color: rgb(37, 99, 235);
}

@media (prefers-color-scheme: dark) {
  .opensource-link {
    color: rgb(147, 197, 253);
  }
  
  .opensource-link:hover {
    color: rgb(191, 219, 254);
  }
}

.sponsor-text {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
}

@media (prefers-color-scheme: dark) {
  .sponsor-text {
    color: rgb(148, 163, 184);
  }
}

.sponsor-link {
  color: rgb(236, 72, 153);
  text-decoration: underline;
  text-decoration-color: rgba(236, 72, 153, 0.3);
  text-underline-offset: 2px;
  font-weight: 500;
}

.sponsor-link:hover {
  color: rgb(219, 39, 119);
  text-decoration-color: rgb(219, 39, 119);
}

@media (prefers-color-scheme: dark) {
  .sponsor-link {
    color: rgb(244, 114, 182);
  }
  
  .sponsor-link:hover {
    color: rgb(249, 168, 212);
  }
}

/* 广告区域 */
.ad-section {
  text-align: center;
  margin-bottom: 2rem;
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

.tool-card, .info-card, .opensource-section {
  animation: fadeInUp 0.6s ease-out;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }

/* 响应式设计 */
@media (max-width: 768px) {
  .input-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .mode-options {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
