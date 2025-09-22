<template>
  <div>
    <!-- 导航栏 -->
    <nav class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
          <div class="flex items-center gap-3">
            <NuxtLink
                to="/"
                class="flex items-end gap-1.5 font-bold text-xl text-gray-900 dark:text-white"
            >
              <span class="sm:block text-lg sm:text-xl">Mintimate</span>
              <span class="text-lg sm:text-xl text-primary-400">在线工具箱</span>
            </NuxtLink>
          </div>
          </div>
          
          <!-- 导航菜单 -->
          <div class="hidden lg:flex items-center space-x-1">
            <NuxtLink 
              to="/" 
              class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              首页
            </NuxtLink>
            
            <!-- 工具集合 -->
            <div class="relative group">
              <button class="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                工具集合
                <svg class="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
              <div class="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 scale-95 group-hover:scale-100 origin-top">
                <div class="p-4 grid grid-cols-2 gap-4">
                  <!-- 字符工具 -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.1s;">
                    <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">字符工具</h3>
                    <div class="space-y-1">
                      <NuxtLink to="/characterTool/statisticAlpha" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">字符统计</NuxtLink>
                      <NuxtLink to="/characterTool/textBase64" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">Base64转码</NuxtLink>
                      <NuxtLink to="/characterTool/complexPassword" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">密码生成</NuxtLink>
                      <NuxtLink to="/characterTool/randomNumber" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">随机数生成</NuxtLink>
                      <NuxtLink to="/characterTool/zhConvertTradSimp" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">繁简转换</NuxtLink>
                    </div>
                  </div>
                  
                  <!-- 网络工具 -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.2s;">
                    <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">网络工具</h3>
                    <div class="space-y-1">
                      <NuxtLink to="/networkTool/mcStatus" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">MC服务器检测</NuxtLink>
                      <NuxtLink to="/networkTool/githubCDN" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">GitHub CDN</NuxtLink>
                      <NuxtLink to="/networkTool/autoBingSearch" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">自动Bing搜索</NuxtLink>
                      <NuxtLink to="/networkTool/CrossPlatformChrome" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">跨平台Chrome</NuxtLink>
                      <NuxtLink to="/networkTool/qCloud/qCloudEdgeOneTokenMaker" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">腾讯云Token</NuxtLink>
                    </div>
                  </div>
                  
                  <!-- 其他工具 -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.3s;">
                    <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">其他工具</h3>
                    <div class="space-y-1">
                      <NuxtLink to="/dateTool/calculateTheDate" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">日期计算</NuxtLink>
                      <NuxtLink to="/dateTool/chineseCalendar" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">农历查询</NuxtLink>
                      <NuxtLink to="/graphicsTool/processImage" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">图片处理</NuxtLink>
                      <NuxtLink to="/graphicsTool/displayHDR" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">HDR显示</NuxtLink>
                      <NuxtLink to="/other/curl" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">cURL工具</NuxtLink>
                    </div>
                  </div>
                  
                  <!-- 特色功能 -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.4s;">
                    <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">特色功能</h3>
                    <div class="space-y-1">
                      <NuxtLink to="/characterTool/markdownView" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">Markdown预览</NuxtLink>
                      <NuxtLink to="/characterTool/emojiMix" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">Emoji合成</NuxtLink>
                      <NuxtLink to="/characterTool/urlMusic" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">URL音乐</NuxtLink>
                      <NuxtLink to="/characterTool/unrestrainedChain" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">无约束链</NuxtLink>
                      <NuxtLink to="/other/oneIndex" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all duration-200 hover:translate-x-1">OneIndex</NuxtLink>
                    </div>
                  </div>
                </div>
                <div class="border-t border-gray-200 dark:border-gray-700 p-3">
                  <NuxtLink to="/about" class="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                    </svg>
                    关于我们
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- 主题切换按钮 -->
            <div class="ml-4">
              <ColorModeButtom />
            </div>
          </div>
          
          <!-- 移动端菜单按钮 -->
          <div class="lg:hidden flex items-center space-x-2">
            <ColorModeButtom />
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-all duration-200">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <Transition name="mobile-menu">
        <div v-show="mobileMenuOpen" class="lg:hidden border-t border-gray-200 dark:border-gray-700">
        <div class="px-4 pt-4 pb-6 space-y-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          <NuxtLink to="/" @click="mobileMenuOpen = false" class="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              首页
            </div>
          </NuxtLink>
          
          <details class="group">
            <summary class="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg cursor-pointer transition-all duration-200">
              <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              字符工具
              <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </summary>
            <div class="mt-2 ml-8 space-y-1">
              <NuxtLink to="/characterTool/statisticAlpha" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">字符统计</NuxtLink>
              <NuxtLink to="/characterTool/textBase64" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">Base64转码</NuxtLink>
              <NuxtLink to="/characterTool/complexPassword" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">密码生成</NuxtLink>
              <NuxtLink to="/characterTool/randomNumber" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">随机数生成</NuxtLink>
              <NuxtLink to="/characterTool/zhConvertTradSimp" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">繁简转换</NuxtLink>
              <NuxtLink to="/characterTool/markdownView" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">Markdown预览</NuxtLink>
              <NuxtLink to="/characterTool/emojiMix" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">Emoji合成</NuxtLink>
              <NuxtLink to="/characterTool/urlMusic" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">URL音乐</NuxtLink>
              <NuxtLink to="/characterTool/unrestrainedChain" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">无约束链</NuxtLink>
            </div>
          </details>
          
          <details class="group">
            <summary class="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg cursor-pointer transition-all duration-200">
              <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              网络工具
              <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </summary>
            <div class="mt-2 ml-8 space-y-1">
              <NuxtLink to="/networkTool/mcStatus" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">MC服务器检测</NuxtLink>
              <NuxtLink to="/networkTool/githubCDN" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">GitHub CDN</NuxtLink>
              <NuxtLink to="/networkTool/autoBingSearch" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">自动Bing搜索</NuxtLink>
              <NuxtLink to="/networkTool/CrossPlatformChrome" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">跨平台Chrome</NuxtLink>
              <NuxtLink to="/networkTool/qCloud/qCloudEdgeOneTokenMaker" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">腾讯云Token</NuxtLink>
            </div>
          </details>
          
          <details class="group">
            <summary class="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg cursor-pointer transition-all duration-200">
              <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
              </svg>
              其他工具
              <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </summary>
            <div class="mt-2 ml-8 space-y-1">
              <NuxtLink to="/dateTool/calculateTheDate" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">日期计算</NuxtLink>
              <NuxtLink to="/dateTool/chineseCalendar" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">农历查询</NuxtLink>
              <NuxtLink to="/graphicsTool/processImage" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">图片处理</NuxtLink>
              <NuxtLink to="/graphicsTool/displayHDR" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">HDR显示</NuxtLink>
              <NuxtLink to="/other/curl" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">cURL工具</NuxtLink>
              <NuxtLink to="/other/oneIndex" @click="mobileMenuOpen = false" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">OneIndex</NuxtLink>
            </div>
          </details>
          
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <NuxtLink to="/about" @click="mobileMenuOpen = false" class="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
              <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              关于我们
            </NuxtLink>
          </div>
        </div>
        </div>
      </Transition>
    </nav>
    <NuxtRouteAnnouncer />
    <UApp>
      <NuxtPage />
    </UApp>
  </div>
</template>

<script setup>
// 移动端菜单状态
const mobileMenuOpen = ref(false)

// 监听路由变化，关闭移动端菜单
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

// 点击外部区域关闭菜单
onMounted(() => {
  const handleClickOutside = (event) => {
    const nav = document.querySelector('nav')
    if (nav && !nav.contains(event.target)) {
      mobileMenuOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
  opacity: 0;
}

/* 确保下拉菜单在悬停时显示动画 */
.group:hover .animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}

/* 为移动端菜单添加滑入动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
