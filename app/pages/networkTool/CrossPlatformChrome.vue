<script setup>
useHead({
  title: 'Chrome离线安装包-在线工具箱',
  meta: [
    {
      name: 'description',
      content: '此页面提供Chrome浏览器不同平台和版本的离线安装包下载。'
    },
    {
      name: 'keywords',
      content: 'Chrome,浏览器,下载,Chrome下载,Chrome安装包'
    }
  ]
});

let Windows = ref([])
let Windows7 = ref([])
let macOS = ref([])

onMounted(async () => {
  const {status, message} = await $fetch('/api/crossPlatformChromeLatest', {
    method: 'GET'
  })

  const makeChromeVersionObject2Array = (obj) => {
    return Object.keys(obj).map(key => {
      return {
        version: key,
        info: obj[key]
      }
    })
  }

  Windows.value = makeChromeVersionObject2Array(message['Windows'])
  Windows7.value = makeChromeVersionObject2Array(message['Windows7'])
  macOS.value = makeChromeVersionObject2Array(message['macOS'])
})


</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Chrome 浏览器下载
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto">
          为了方便用户直接下载Chrome浏览器的离线安装包，也就是下载后可以直接进行安装，不需要二次联网下载；本站提供下载解析。
        </p>
      </div>
      <!-- 信息卡片网格 -->
      <div class="info-grid mb-12">
        <div class="info-card">
          <div class="info-icon bilibili-icon">
            <UIcon name="i-heroicons-play-circle" />
          </div>
          <div class="info-content">
            <h3 class="info-title">关注我们</h3>
            <p class="info-description mb-3">
              嘿嘿，欢迎关注我们的B站账号……
            </p>
            <div class="flex items-center space-x-3">
              <img src="https://imagehost.mintimate.cn/icon/bilibili.png" alt="Mintimate's Bilibili"
                   class="w-10 h-10 rounded-full object-cover">
              <div>
                <a href="https://space.bilibili.com/355567627" target="_blank" 
                   class="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Mintimate's Bilibili
                </a>
                <p class="text-xs text-slate-500 dark:text-slate-400">我的Bilibili空间地址</p>
              </div>
            </div>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon chrome-icon">
            <UIcon name="i-heroicons-globe-alt" />
          </div>
          <div class="info-content">
            <h3 class="info-title">下载说明</h3>
            <p class="info-description">
              <span class="font-medium text-blue-600 dark:text-blue-400">
                Windows和macOS的桌面版本Chrome浏览器最新下载地址
              </span>
            </p>
            <p class="info-description mt-2 text-sm">
              Chrome V109之后，不再兼容Windows 7，所以Windows 7请下载下方109版本。对于macOS，不区分ARM或X86。
            </p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon support-icon">
            <UIcon name="i-heroicons-heart" />
          </div>
          <div class="info-content">
            <h3 class="info-title">支持项目</h3>
            <p class="info-description mb-3">
              如果这个项目对您有帮助，欢迎支持我们的工作
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <img class="w-6 h-6 rounded-full" 
                     src="https://www.mintimate.cn/custom/img/MintimateAvatar.png" 
                     alt="Mintimate">
                <a href="https://www.mintimate.cn" target="_blank" 
                   class="text-sm font-medium text-slate-700 dark:text-slate-300 hover:underline">
                  Mintimate
                </a>
              </div>
              <a href="https://afdian.com/a/mintimate" target="_blank"
                 class="text-xs text-pink-600 dark:text-pink-400 hover:underline font-medium">
                Like this project?
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Windows 10+ 版本 -->
      <div class="section-header">
        <div class="section-icon windows-icon">
          <UIcon name="i-heroicons-computer-desktop" />
        </div>
        <h2 class="section-title">Windows 10+ 版本</h2>
      </div>
      <ClientOnly>
        <ListDisplayComponent :list="Windows">
          <template v-slot="{item}">
            <div class="download-card">
              <div class="download-header">
                <img src="/img/operatingSystem/Windows.svg" :alt="item.info.tag"
                     class="download-icon" loading="lazy" decoding="async">
                <div class="download-info">
                  <h3 class="download-title">
                    <a :href="item.info.link" class="download-link">
                      {{ item.info.tag }}
                    </a>
                  </h3>
                  <p class="download-version">版本号: {{ item.version }}</p>
                </div>
              </div>
              <div class="download-footer">
                <p class="download-sha">SHA: {{ item.info.sha }}</p>
              </div>
            </div>
          </template>
          <template #end>
            <div class="download-card special-card">
              <div class="download-header">
                <img src="/img/operatingSystem/WindowsArm.svg" alt="Windows Arm64"
                     class="download-icon" loading="lazy" decoding="async">
                <div class="download-info">
                  <h3 class="download-title">
                    <a href="https://dl.google.com/tag/s/&lang=en&browser=5&usagestats=0&appname=Google%20Chrome&needsadmin=prefers&ap=arm64-statsdef_1&installdataindex=empty/chrome/install/ChromeStandaloneSetup.exe" 
                       class="download-link">
                      Windows ARM64 正式版本
                    </a>
                  </h3>
                  <p class="download-version">适用于基于ARM的Windows(非x86平台)</p>
                </div>
              </div>
              <div class="download-footer">
                <p class="download-sha">Google 实时自动构建</p>
              </div>
            </div>
          </template>
        </ListDisplayComponent>
        <template #fallback>
          <div class="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div class="download-card" v-for="i in 6" :key="i">
              <div class="download-header">
                <USkeleton class="download-icon" :ui="{ rounded: 'rounded-lg' }"/>
                <div class="download-info">
                  <USkeleton class="h-5 w-48 mb-2"/>
                  <USkeleton class="h-4 w-32"/>
                </div>
              </div>
              <div class="download-footer">
                <USkeleton class="h-3 w-64"/>
              </div>
            </div>
          </div>
        </template>
      </ClientOnly>
      <!-- Windows 7-8 版本 -->
      <div class="section-header">
        <div class="section-icon windows7-icon">
          <UIcon name="i-heroicons-computer-desktop" />
        </div>
        <h2 class="section-title">Windows 7-8 版本</h2>
      </div>
      <ClientOnly>
        <ListDisplayComponent :list="Windows7">
          <template v-slot="{item}">
            <div class="download-card">
              <div class="download-header">
                <img src="/img/operatingSystem/Windows7.svg" :alt="item.info.tag"
                     class="download-icon" loading="lazy" decoding="async">
                <div class="download-info">
                  <h3 class="download-title">
                    <a :href="item.info.link" class="download-link">
                      {{ item.info.tag }}
                    </a>
                  </h3>
                  <p class="download-version">版本号: {{ item.version }}</p>
                </div>
              </div>
              <div class="download-footer">
                <p class="download-sha">SHA: {{ item.info.sha }}</p>
              </div>
            </div>
          </template>
        </ListDisplayComponent>
        <template #fallback>
          <div class="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div class="download-card" v-for="i in 6" :key="i">
              <div class="download-header">
                <USkeleton class="download-icon" :ui="{ rounded: 'rounded-lg' }"/>
                <div class="download-info">
                  <USkeleton class="h-5 w-48 mb-2"/>
                  <USkeleton class="h-4 w-32"/>
                </div>
              </div>
              <div class="download-footer">
                <USkeleton class="h-3 w-64"/>
              </div>
            </div>
          </div>
        </template>
      </ClientOnly>
      <!-- macOS 版本 -->
      <div class="section-header">
        <div class="section-icon macos-icon">
          <UIcon name="i-heroicons-device-tablet" />
        </div>
        <h2 class="section-title">macOS 版本 (ARM & X86)</h2>
      </div>
      <ClientOnly>
        <ListDisplayComponent :list="macOS">
          <template v-slot="{item}">
            <div class="download-card">
              <div class="download-header">
                <img src="/img/operatingSystem/macOS.svg" :alt="item.info.tag"
                     class="download-icon" loading="lazy" decoding="async">
                <div class="download-info">
                  <h3 class="download-title">
                    <a :href="item.info.link" class="download-link">
                      {{ item.info.tag }}
                    </a>
                  </h3>
                  <p class="download-version">版本号: {{ item.version }}</p>
                </div>
              </div>
              <div class="download-footer">
                <p class="download-sha">SHA: {{ item.info.sha }}</p>
              </div>
            </div>
          </template>
        </ListDisplayComponent>
        <template #fallback>
          <div class="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div class="download-card" v-for="i in 6" :key="i">
              <div class="download-header">
                <USkeleton class="download-icon" :ui="{ rounded: 'rounded-lg' }"/>
                <div class="download-info">
                  <USkeleton class="h-5 w-48 mb-2"/>
                  <USkeleton class="h-4 w-32"/>
                </div>
              </div>
              <div class="download-footer">
                <USkeleton class="h-3 w-64"/>
              </div>
            </div>
          </div>
        </template>
      </ClientOnly>

      <!-- 广告区域 -->
      <div class="ad-section">
        <div class="ad-container">
          <div class="wwads-cn wwads-horizontal" data-id="264"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 信息卡片网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
}

.info-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.dark {
  .info-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
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

.bilibili-icon {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.chrome-icon {
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

/* 章节标题 */
.section-header {
  display: flex;
  align-items: center;
  margin: 3rem 0 2rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .section-header {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.section-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  margin-right: 1rem;
}

.windows-icon {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.windows7-icon {
  background: linear-gradient(to right, rgb(168, 85, 247), rgb(236, 72, 153));
}

.macos-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: rgb(30, 41, 59);
}

.dark {
  .section-title {
    color: white;
  }
}

/* 下载卡片 */
.download-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.download-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.download-card.special-card {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05));
  border-color: rgba(59, 130, 246, 0.2);
}

.dark {
  .download-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
  
  .download-card.special-card {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  }
}

.download-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.download-icon {
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.download-info {
  flex: 1;
}

.download-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.download-link {
  color: rgb(30, 41, 59);
  text-decoration: none;
  transition: color 0.3s ease;
}

.download-link:hover {
  color: rgb(59, 130, 246);
}

.dark {
  .download-link {
    color: white;
  }
  
  .download-link:hover {
    color: rgb(147, 197, 253);
  }
}

.download-version {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
}

.dark {
  .download-version {
    color: rgb(148, 163, 184);
  }
}

.download-footer {
  border-top: 1px solid rgba(226, 232, 240, 0.5);
  padding-top: 0.75rem;
}

.dark {
  .download-footer {
    border-top-color: rgba(71, 85, 105, 0.5);
  }
}

.download-sha {
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  word-break: break-all;
}

.dark {
  .download-sha {
    color: rgb(148, 163, 184);
  }
}

/* 广告区域 */
.ad-section {
  text-align: center;
  margin-top: 3rem;
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

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }

.section-header {
  animation: fadeInUp 0.6s ease-out;
}

.download-card {
  animation: fadeInUp 0.6s ease-out;
}
</style>