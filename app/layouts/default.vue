``<template>
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
            
            <!-- 常用工具 - 提升到一级导航 -->
            <NuxtLink 
              to="/textBase64" 
              class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Base64
            </NuxtLink>
            
            <NuxtLink 
              to="/generatePWD" 
              class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              密码生成
            </NuxtLink>
            
            <NuxtLink 
              to="/emojiMix" 
              class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Emoji合成
            </NuxtLink>
            
            <NuxtLink 
              to="/mcstatus" 
              class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              MC服务器检测
            </NuxtLink>
            
            <NuxtLink 
              to="/urlMusic" 
              class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              URL音乐
            </NuxtLink>
            
            <!-- 更多工具下拉菜单 -->
            <div class="relative group">
              <button class="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                更多工具
                <svg class="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
              
              <!-- 美化的下拉菜单 -->
              <div class="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 scale-95 group-hover:scale-100 origin-top-right backdrop-blur-xl bg-white/95 dark:bg-gray-800/95">
                <!-- 菜单头部 -->
                <div class="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-t-2xl">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                    工具集合
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">选择您需要的在线工具</p>
                </div>
                
                <div class="p-4 grid grid-cols-2 gap-6">
                  <!-- 文本处理 -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.1s;">
                    <div class="flex items-center mb-3">
                      <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-2">
                        <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                      </div>
                      <h4 class="text-sm font-semibold text-gray-900 dark:text-white">文本处理</h4>
                    </div>
                    <div class="space-y-1">
                      <NuxtLink to="/statisticsChars" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                        字符统计
                      </NuxtLink>
                      <NuxtLink to="/zhConvertTradSimp" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                        繁简转换
                      </NuxtLink>
                      <NuxtLink to="/mdv" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                        Markdown预览
                      </NuxtLink>
                      <NuxtLink to="/qCloud/qCloudEdgeOneTokenMaker" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                        腾讯云Token
                      </NuxtLink>
                    </div>
                  </div>
                  
                  <!-- 网络服务 -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.2s;">
                    <div class="flex items-center mb-3">
                      <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-2">
                        <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <h4 class="text-sm font-semibold text-gray-900 dark:text-white">网络服务</h4>
                    </div>
                    <div class="space-y-1">
                      <NuxtLink to="/mcstatus" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-green-500 transition-colors"></span>
                        MC服务器检测
                      </NuxtLink>
                      <NuxtLink to="/gh" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-green-500 transition-colors"></span>
                        GitHub CDN
                      </NuxtLink>
                      <NuxtLink to="/autoBing" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-green-500 transition-colors"></span>
                        自动Bing搜索
                      </NuxtLink>
                    </div>
                  </div>
                  
                  <!-- 生成工具 -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.3s;">
                    <div class="flex items-center mb-3">
                      <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-2">
                        <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <h4 class="text-sm font-semibold text-gray-900 dark:text-white">生成工具</h4>
                    </div>
                    <div class="space-y-1">
                      <NuxtLink to="/randomNumber" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-purple-500 transition-colors"></span>
                        随机数生成
                      </NuxtLink>
                      <NuxtLink to="/unrestrainedChain" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-purple-500 transition-colors"></span>
                        为所欲为
                      </NuxtLink>
                      <NuxtLink to="/calculateTheDate" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-purple-500 transition-colors"></span>
                        日期计算
                      </NuxtLink>
                      <NuxtLink to="/chineseCalendar" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-purple-500 transition-colors"></span>
                        农历查询
                      </NuxtLink>
                    </div>
                  </div>
                  
                  <!-- 媒体工具 -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.4s;">
                    <div class="flex items-center mb-3">
                      <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-2">
                        <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                        </svg>
                      </div>
                      <h4 class="text-sm font-semibold text-gray-900 dark:text-white">媒体工具</h4>
                    </div>
                    <div class="space-y-1">
                      <NuxtLink to="/processIMG" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-orange-500 transition-colors"></span>
                        图片处理
                      </NuxtLink>
                      <NuxtLink to="/displayHDR" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-orange-500 transition-colors"></span>
                        HDR显示
                      </NuxtLink>
                      <NuxtLink to="/CrossPlatformChrome" class="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-all duration-200">
                        <span class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover:bg-orange-500 transition-colors"></span>
                        跨平台Chrome
                      </NuxtLink>
                    </div>
                  </div>
                </div>
                
                <!-- 菜单底部 -->
                <div class="border-t border-gray-100 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-2xl">
                  <div class="flex items-center justify-center">
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      共 {{ totalToolsCount }} 个工具
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 右侧功能区 -->
          <div class="hidden lg:flex items-center space-x-3">
            <!-- 关于我们 -->
            <NuxtLink 
              to="/about" 
              class="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
            >
              <svg class="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              关于我们
            </NuxtLink>
            
            <!-- 主题切换按钮 -->
            <ColorModeButtom />
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
        <div class="px-4 pt-4 pb-6 space-y-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          <!-- 首页链接 -->
          <NuxtLink to="/" @click="mobileMenuOpen = false" class="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              首页
            </div>
          </NuxtLink>
          
          <!-- 常用工具快捷访问 -->
          <div class="space-y-2">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4">常用工具</h3>
            <div class="grid grid-cols-2 gap-2">
              <NuxtLink to="/textBase64" @click="mobileMenuOpen = false" class="flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
                <svg class="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Base64
              </NuxtLink>
              <NuxtLink to="/generatePWD" @click="mobileMenuOpen = false" class="flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                密码生成
              </NuxtLink>
              <NuxtLink to="/emojiMix" @click="mobileMenuOpen = false" class="flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200">
                <svg class="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Emoji合成
              </NuxtLink>
              <NuxtLink to="/mcstatus" @click="mobileMenuOpen = false" class="flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
                MC服务器检测
              </NuxtLink>
              <NuxtLink to="/urlMusic" @click="mobileMenuOpen = false" class="flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
                <svg class="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                URL音乐
              </NuxtLink>
            </div>
          </div>
          
          <!-- 工具分类 -->
          <div class="space-y-3">
            <details class="group bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <summary class="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-all duration-200">
                <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                文本处理
                <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </summary>
              <div class="px-4 pb-3 space-y-1">
                <NuxtLink to="/statisticsChars" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">字符统计</NuxtLink>
                <NuxtLink to="/zhConvertTradSimp" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">繁简转换</NuxtLink>
                <NuxtLink to="/mdv" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">Markdown预览</NuxtLink>
                <NuxtLink to="/urlMusic" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">URL音乐</NuxtLink>
              </div>
            </details>
            
            <details class="group bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <summary class="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition-all duration-200">
                <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
                网络服务
                <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </summary>
              <div class="px-4 pb-3 space-y-1">
                <NuxtLink to="/mcstatus" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">MC服务器检测</NuxtLink>
                <NuxtLink to="/gh" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">GitHub CDN</NuxtLink>
                <NuxtLink to="/autoBing" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">自动Bing搜索</NuxtLink>
              </div>
            </details>
            
            <details class="group bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <summary class="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-all duration-200">
                <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                  </svg>
                </div>
                生成工具
                <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </summary>
              <div class="px-4 pb-3 space-y-1">
                <NuxtLink to="/randomNumber" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">随机数生成</NuxtLink>
                <NuxtLink to="/unrestrainedChain" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">为所欲为</NuxtLink>
                <NuxtLink to="/calculateTheDate" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">日期计算</NuxtLink>
                <NuxtLink to="/chineseCalendar" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">农历查询</NuxtLink>
              </div>
            </details>
            
            <details class="group bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <summary class="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer transition-all duration-200">
                <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                  </svg>
                </div>
                媒体工具
                <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </summary>
              <div class="px-4 pb-3 space-y-1">
                <NuxtLink to="/processIMG" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors">图片处理</NuxtLink>
                <NuxtLink to="/displayHDR" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors">HDR显示</NuxtLink>
                <NuxtLink to="/CrossPlatformChrome" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors">跨平台Chrome</NuxtLink>
              </div>
            </details>
          </div>
          
          <!-- 底部信息 -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <NuxtLink to="/about" @click="mobileMenuOpen = false" class="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
              <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              关于我们
            </NuxtLink>
            
            <div class="px-4 py-2 text-center">
              <div class="text-xs text-gray-500 dark:text-gray-400">
                共 {{ totalToolsCount }} 个实用工具
              </div>
            </div>
          </div>
        </div>
        </div>
      </Transition>
    </nav>
    
    <!-- 主要内容区域 -->
    <main class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <slot />
    </main>
    
    <!-- 页脚 -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            <span class="footer-heart">💻</span> 
            始于 2022 · 在线工具箱 - By Mintimate 
            <span class="footer-heart">✨</span>
            <br>
            <small class="footer-subtitle">让工具更简单，让生活更美好 🚀</small>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// 移动端菜单状态
const mobileMenuOpen = ref(false)

// 工具总数计算
const totalToolsCount = computed(() => {
  // 计算所有工具的总数
  const textTools = 4      // 文本处理工具
  const networkTools = 3   // 网络服务工具
  const generateTools = 4  // 生成工具
  const mediaTools = 3     // 媒体工具
  return textTools + networkTools + generateTools + mediaTools
})

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

/* 搜索下拉框动画 */
.search-dropdown-enter-active,
.search-dropdown-leave-active {
  transition: all 0.2s ease;
}

.search-dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.search-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

/* 增强的悬停效果 */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* 自定义滚动条样式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}

/* 深色模式下的滚动条 */
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 0.7);
}
</style>