<script setup>
useHead({
  title: '显示器HDR在线检测-By Mintimate',
  meta: [
    {
      name: 'description',
      content: '在线检测当前设备显示器的显示效果，查看当前显示器是否色域足够、HDR是否支持；如果显示器支持HDR或者色域足够，页面将显示出图案，否则只会显示空白界面。',
    },
    {
      name: 'keywords',
      content: '在线工具箱,HDR显示,检测显示器是否开启HDR,显示器动态显示检测,显示器色域,原神启动',
    },
  ],
});
onMounted(() => {
  setTimeout(() => {
    const testSection = document.querySelector(".test-section");
    if (testSection) {
      testSection.classList.add("loaded");
    }
  }, 100);
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          显示器 HDR 检测
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          在线检测显示器 HDR 支持和色域显示效果
        </p>
      </div>

      <!-- HDR 检测区域 -->
      <div class="hdr-test-card">
        <div class="test-header">
          <div class="test-title">
            <UIcon name="i-heroicons-computer-desktop" class="mr-2" />
            HDR 显示测试
          </div>
          <div class="test-status">
            检测中...
          </div>
        </div>
        
        <section class="test-section">
          <div class="background mx-auto rounded-xl">
            <div class="logo"></div>
          </div>
        </section>
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
          <div class="info-icon browser-icon">
            <UIcon name="i-simple-icons-googlechrome" />
          </div>
          <div class="info-content">
            <h3 class="info-title">浏览器要求</h3>
            <div class="info-description">
              <p class="mb-3">
                <span class="highlight-text">为了确保显示效果，请最好使用 Chrome 或 Firefox 浏览器</span>
              </p>
              <p class="text-sm text-amber-600 dark:text-amber-400">
                不同浏览器对 HDR 和色域的支持程度可能有所差异
              </p>
            </div>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon test-icon">
            <UIcon name="i-heroicons-eye" />
          </div>
          <div class="info-content">
            <h3 class="info-title">检测原理</h3>
            <ul class="info-list">
              <li>
                <strong>HDR 支持：</strong>如果显示器支持 HDR 或色彩显示够广，页面加载完毕的 5s 内将显示图像：
                <code class="highlight-code">HDR(●'◡'●)ﾉ♥</code>
              </li>
              <li>
                <strong>不支持 HDR：</strong>如果显示器不支持 HDR 且色彩显示不足，页面将始终为白色状态，无法显示图像
              </li>
            </ul>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon reference-icon">
            <UIcon name="i-heroicons-link" />
          </div>
          <div class="info-content">
            <h3 class="info-title">技术参考</h3>
            <div class="info-description">
              <p class="mb-3">
                此功能借鉴网站：
                <a class="info-link" href="https://paraparty.github.io/genshin/" target="_blank">
                  Github Pages: 原神启动
                </a>
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                通过特定的色彩和渲染技术来检测显示器的 HDR 能力
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 开源信息 -->
      <div class="opensource-section">
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

<style scoped>
/* HDR 测试卡片 */
.hdr-test-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.hdr-test-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

@media (prefers-color-scheme: dark) {
  .hdr-test-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}

/* 测试区域头部 */
.test-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .test-header {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.test-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.25rem;
  color: rgb(30, 41, 59);
}

@media (prefers-color-scheme: dark) {
  .test-title {
    color: white;
  }
}

.test-status {
  font-size: 0.875rem;
  color: rgb(147, 51, 234);
  background: rgba(147, 51, 234, 0.1);
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .test-status {
    color: rgb(196, 181, 253);
    background: rgba(147, 51, 234, 0.2);
  }
}

/* HDR 测试区域 */
.test-section {
  margin: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.background {
  width: 50vw;
  height: 50vh;
  max-width: 600px;
  max-height: 400px;
  min-width: 300px;
  min-height: 200px;
  display: grid;
  align-items: center;
  justify-items: center;
  transition: background-color 1.5s linear 0.5s;
  border: 2px solid rgba(226, 232, 240, 0.3);
}

@media (prefers-color-scheme: dark) {
  .background {
    border-color: rgba(71, 85, 105, 0.3);
  }
}

.logo {
  width: calc(12.5vw + 12.5vh);
  height: calc(12.5vw + 12.5vh);
  max-width: 300px;
  max-height: 300px;
  min-width: 150px;
  min-height: 150px;
  background-image: url("https://imagehost.mintimate.cn/svgHDR/backgroundImage.avif");
  background-repeat: repeat;
  -webkit-mask-image: url("https://imagehost.mintimate.cn/svgHDR//HDR.svg");
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-image: url("https://imagehost.mintimate.cn/svgHDR/HDR.svg");
  mask-position: center;
  mask-repeat: no-repeat;
  visibility: hidden;
  transition: visibility 0.1s step-end 1.5s;
}

@media (max-aspect-ratio: 1/1) {
  .logo {
    transform: rotate(90deg);
  }
}

.loaded .background {
  background-color: white;
}

.test-section.loaded .logo {
  visibility: visible;
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

.browser-icon {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.test-icon {
  background: linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68));
}

.reference-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
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
  color: rgb(236, 72, 153);
  font-weight: bold;
}

@media (prefers-color-scheme: dark) {
  .info-list {
    color: rgb(148, 163, 184);
  }
}

/* 高亮文本 */
.highlight-text {
  color: rgb(236, 72, 153);
  text-decoration: underline;
  text-decoration-color: rgba(236, 72, 153, 0.3);
  text-underline-offset: 2px;
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .highlight-text {
    color: rgb(251, 113, 133);
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
  background: rgba(236, 72, 153, 0.1);
  color: rgb(236, 72, 153);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.8125rem;
}

@media (prefers-color-scheme: dark) {
  .highlight-code {
    background: rgba(244, 114, 182, 0.2);
    color: rgb(244, 114, 182);
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

.hdr-test-card, .info-card, .opensource-section {
  animation: fadeInUp 0.6s ease-out;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }

/* 响应式设计 */
@media (max-width: 768px) {
  .test-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .background {
    width: 80vw;
    height: 40vh;
  }
  
  .logo {
    width: calc(10vw + 10vh);
    height: calc(10vw + 10vh);
  }
}
</style>