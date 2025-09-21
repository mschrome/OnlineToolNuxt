<template>
  <div>
    <!-- 导航栏 -->
    <nav class="bg-white dark:bg-gray-900 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">
                在线工具箱
              </h1>
            </NuxtLink>
          </div>
          
          <!-- 导航菜单 -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink 
              to="/" 
              class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              首页
            </NuxtLink>
            
            <!-- 字符工具 -->
            <div class="relative group">
              <button class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                字符工具
              </button>
              <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-1">
                  <NuxtLink to="/characterTool/statisticAlpha" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">字符统计</NuxtLink>
                  <NuxtLink to="/characterTool/textBase64" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Base64转码</NuxtLink>
                  <NuxtLink to="/characterTool/complexPassword" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">复杂密码生成</NuxtLink>
                  <NuxtLink to="/characterTool/randomNumber" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">随机数生成</NuxtLink>
                  <NuxtLink to="/characterTool/zhConvertTradSimp" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">繁简转换</NuxtLink>
                  <NuxtLink to="/characterTool/markdownView" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Markdown预览</NuxtLink>
                  <NuxtLink to="/characterTool/emojiMix" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Emoji合成</NuxtLink>
                  <NuxtLink to="/characterTool/urlMusic" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">URL音乐</NuxtLink>
                  <NuxtLink to="/characterTool/unrestrainedChain" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">无约束链</NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- 日期工具 -->
            <div class="relative group">
              <button class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                日期工具
              </button>
              <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-1">
                  <NuxtLink to="/dateTool/calculateTheDate" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">日期计算</NuxtLink>
                  <NuxtLink to="/dateTool/chineseCalendar" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">农历查询</NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- 图形工具 -->
            <div class="relative group">
              <button class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                图形工具
              </button>
              <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-1">
                  <NuxtLink to="/graphicsTool/processImage" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">图片处理</NuxtLink>
                  <NuxtLink to="/graphicsTool/displayHDR" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">HDR显示</NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- 网络工具 -->
            <div class="relative group">
              <button class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                网络工具
              </button>
              <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-1">
                  <NuxtLink to="/networkTool/mcStatus" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">MC服务器检测</NuxtLink>
                  <NuxtLink to="/networkTool/githubCDN" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">GitHub CDN</NuxtLink>
                  <NuxtLink to="/networkTool/autoBingSearch" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">自动Bing搜索</NuxtLink>
                  <NuxtLink to="/networkTool/CrossPlatformChrome" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">跨平台Chrome</NuxtLink>
                  <NuxtLink to="/networkTool/qCloud/qCloudEdgeOneTokenMaker" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">腾讯云Token生成</NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- 其他工具 -->
            <div class="relative group">
              <button class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                其他
              </button>
              <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-1">
                  <NuxtLink to="/other/curl" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">cURL工具</NuxtLink>
                  <NuxtLink to="/other/oneIndex" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">OneIndex</NuxtLink>
                  <NuxtLink to="/about" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">关于</NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- 主题切换按钮 -->
            <ColorModeButtom />
          </div>
          
          <!-- 移动端菜单按钮 -->
          <div class="md:hidden flex items-center">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <div v-show="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg">
          <NuxtLink to="/" class="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">首页</NuxtLink>
          <details class="group">
            <summary class="px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">字符工具</summary>
            <div class="pl-6 space-y-1">
              <NuxtLink to="/characterTool/statisticAlpha" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">字符统计</NuxtLink>
              <NuxtLink to="/characterTool/textBase64" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">Base64转码</NuxtLink>
              <NuxtLink to="/characterTool/complexPassword" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">复杂密码生成</NuxtLink>
              <NuxtLink to="/characterTool/randomNumber" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">随机数生成</NuxtLink>
              <NuxtLink to="/characterTool/zhConvertTradSimp" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">繁简转换</NuxtLink>
              <NuxtLink to="/characterTool/markdownView" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">Markdown预览</NuxtLink>
              <NuxtLink to="/characterTool/emojiMix" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">Emoji合成</NuxtLink>
              <NuxtLink to="/characterTool/urlMusic" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">URL音乐</NuxtLink>
              <NuxtLink to="/characterTool/unrestrainedChain" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">无约束链</NuxtLink>
            </div>
          </details>
          <details class="group">
            <summary class="px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">日期工具</summary>
            <div class="pl-6 space-y-1">
              <NuxtLink to="/dateTool/calculateTheDate" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">日期计算</NuxtLink>
              <NuxtLink to="/dateTool/chineseCalendar" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">农历查询</NuxtLink>
            </div>
          </details>
          <details class="group">
            <summary class="px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">图形工具</summary>
            <div class="pl-6 space-y-1">
              <NuxtLink to="/graphicsTool/processImage" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">图片处理</NuxtLink>
              <NuxtLink to="/graphicsTool/displayHDR" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">HDR显示</NuxtLink>
            </div>
          </details>
          <details class="group">
            <summary class="px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">网络工具</summary>
            <div class="pl-6 space-y-1">
              <NuxtLink to="/networkTool/mcStatus" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">MC服务器检测</NuxtLink>
              <NuxtLink to="/networkTool/githubCDN" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">GitHub CDN</NuxtLink>
              <NuxtLink to="/networkTool/autoBingSearch" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">自动Bing搜索</NuxtLink>
              <NuxtLink to="/networkTool/CrossPlatformChrome" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">跨平台Chrome</NuxtLink>
              <NuxtLink to="/networkTool/qCloud/qCloudEdgeOneTokenMaker" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">腾讯云Token生成</NuxtLink>
            </div>
          </details>
          <details class="group">
            <summary class="px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">其他</summary>
            <div class="pl-6 space-y-1">
              <NuxtLink to="/other/curl" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">cURL工具</NuxtLink>
              <NuxtLink to="/other/oneIndex" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">OneIndex</NuxtLink>
              <NuxtLink to="/about" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400">关于</NuxtLink>
            </div>
          </details>
        </div>
      </div>
    </nav>
    
    <!-- 主要内容区域 -->
    <main class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <slot />
    </main>
    
    <!-- 页脚 -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2024 在线工具箱 - By Mintimate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
/* 确保下拉菜单在移动端正确显示 */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:visible {
  visibility: visible;
}

/* 移动端菜单动画 */
details[open] summary {
  color: rgb(37 99 235);
}

/* 确保导航栏在所有设备上都能正确显示 */
@media (max-width: 768px) {
  .group:hover .absolute {
    position: static;
    opacity: 1;
    visibility: visible;
    box-shadow: none;
    background: transparent;
  }
}
</style>