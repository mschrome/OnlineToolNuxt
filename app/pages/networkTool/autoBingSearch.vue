<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Bing 自动搜索 🔍
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          自动进行必应搜索，帮助测试浏览器和网络性能
        </p>
      </div>

      <!-- 主控制卡片 -->
      <div class="control-card">
        <!-- 状态显示区域 -->
        <div class="status-section">
          <div class="status-container">
            <div class="status-icon" :class="{ active: statusMode }">
              <UIcon :name="statusMode ? 'i-heroicons-play-circle' : 'i-heroicons-pause-circle'" class="text-3xl" />
            </div>
            <div class="status-info">
              <div class="status-title">{{ statusMode ? '搜索进行中' : '准备就绪' }}</div>
              <div class="status-description">{{ statusLabel }}</div>
              <div v-if="statusMode" class="progress-info">
                <div class="progress-text">进度: {{ count }}/36</div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: `${(count / 36) * 100}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 控制按钮区域 -->
        <div class="action-section">
          <UButton
            v-if="!statusMode"
            @click="newTab"
            size="xl"
            class="primary-button"
          >
            <UIcon name="i-heroicons-play" class="mr-2" />
            开始 Bing 搜索
          </UButton>
          
          <UButton
            v-else
            @click="stopNewTab"
            :disabled="statusDisable"
            size="xl"
            color="orange"
            class="stop-button"
          >
            <UIcon name="i-heroicons-stop" class="mr-2" />
            停止搜索
          </UButton>
        </div>
      </div>

      <!-- 信息卡片网格 -->
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon tips-icon">
            <UIcon name="i-heroicons-light-bulb" />
          </div>
          <div class="info-content">
            <h3 class="info-title">使用提示</h3>
            <ul class="info-list">
              <li>免费资源，请合理使用，请勿滥用本工具</li>
              <li>点击开始按钮，将会每隔5秒开启并关闭一个 Bing 搜索页面</li>
              <li>浏览器会限制页面打开多页面，需要允许本网站打开多个标签页</li>
              <li>本工具参考自项目 <a href="https://github.com/microsoft-farmer/bing-rewards" 
                     class="special-link github-link" target="_blank">microsoft-farmer/bing-rewards</a></li>
            </ul>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon operation-icon">
            <UIcon name="i-heroicons-cog-6-tooth" />
          </div>
          <div class="info-content">
            <h3 class="info-title">额外操作</h3>
            <ul class="info-list">
              <li>可以安装 User-Agent 切换插件，设置为 Edge Android 来测试移动端搜索</li>
              <li>建议在使用前关闭弹窗拦截器</li>
              <li>如果觉得工具有用，可以加入我们的 
                <a href="https://afdian.com/a/mintimate" 
                   class="special-link sponsor-link" target="_blank">
                  <span class="sponsor-icon">💖</span>
                  爱发电
                </a> 
                赞助服务器维护费用</li>
            </ul>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon security-icon">
            <UIcon name="i-heroicons-shield-check" />
          </div>
          <div class="info-content">
            <h3 class="info-title">安全说明</h3>
            <p class="info-description">
              本工具仅用于测试目的，所有搜索内容均为预设的技术相关关键词。
              请遵守 Bing 搜索引擎的使用条款，合理使用本工具。
            </p>
          </div>
        </div>
      </div>

      <!-- 浏览器插件推荐 -->
      <div class="plugin-section">
        <div class="plugin-card">
          <div class="plugin-header">
            <UIcon name="i-heroicons-puzzle-piece" class="text-2xl text-blue-500" />
            <h3 class="plugin-title">浏览器 UA 修改插件推荐</h3>
          </div>
          <div class="plugin-grid">
            <a href="https://chrome.google.com/webstore/detail/user-agent-switcher-and-m/bhchdcejhohfmigjafbampogmaanbfkg"
               target="_blank" class="plugin-item">
              <img src="/img/bingAuto/ChromeAddons.png" class="plugin-logo" alt="Chrome Extension">
              <span class="plugin-name">Chrome 扩展</span>
            </a>
            <a href="https://microsoftedge.microsoft.com/addons/detail/useragent-switcher-and-m/cnjkedgepfdpdbnepgmajmmjdjkjnifa"
               target="_blank" class="plugin-item">
              <img src="/img/bingAuto/EdgeAddons.png" class="plugin-logo" alt="Edge Extension">
              <span class="plugin-name">Edge 扩展</span>
            </a>
            <a href="https://addons.mozilla.org/en-US/firefox/addon/user-agent-string-switcher"
               target="_blank" class="plugin-item">
              <img src="/img/bingAuto/FireFoxAddons.svg" class="plugin-logo" alt="Firefox Extension">
              <span class="plugin-name">Firefox 扩展</span>
            </a>
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
import { ref } from 'vue';

const toast = useToast();

useHead({
  title: 'Bing自动搜索-在线工具箱',
  meta: [
    {
      name: 'description',
      content:
          '自动进行必应搜索引擎的搜索，随机打开必应的搜索引擎并搜索内容，帮助你测试浏览器和网络性能',
    },
    {
      name: 'keywords',
      content: 'bing auto,bing rewards auto,必应,bing,必应搜索,bing search',
    },
  ],
});

const words = ['How to center a div?', '如何居中一个div?',
  'How to loop through an array?', '如何遍历一个数组?',
  'How to get selected value from dropdown?', '如何得到下拉列表的选中值?',
  'How to validate email address in Javascript?', '如何用Javascript验证邮箱地址?',
  'How to replace all occurrences of a string?', '如何替换字符串中所有的指定子串?',
  'How to check if variable is empty?', '如何检查一个变量是否为空?',
  'How to convert string to number?', '如何将字符串转换为数字?',
  'How to track state changes in React?', '如何在React中跟踪状态变化?',
  'How to make AJAX call?', '如何发起AJAX请求?',
  'How to debug Node.js application?', '如何调试Node.js应用程序?',
  'How to parse JSON in Javascript?', '如何用Javascript解析JSON?',
  'How to check if object has property?', '如何检查一个对象是否具有某属性?',
  'How to sort array of objects?', '如何对对象数组进行排序?',
  'How to bind event handler in JS?', '如何在JS中绑定事件处理函数?',
  'How to clone an object in JS?', '如何在JS中克隆一个对象?',
  'How to create object instance?', '如何用JS创建对象实例?',
  'How to call async API in React?', '如何在React中调用异步API?',
  'How to redirect to another page?', '如何重定向到另一个页面?',
  'How to parse query string in URL?', '如何解析URL中的查询字符串?',
  'Why we need useEffect in React?', '为什么在React中需要使用useEffect?',
  'Why component doesn\'t re - render ? ', '为什么组件不重新渲染 ? ',
  'What is difference between props and state?', 'props和state的区别是什么?',
  'How to conditionally render components?', '如何有条件地渲染组件?',
  'How to use React Context for state management?', '如何使用React Context来管理状态?',
  'How to implement pagination in React?', '如何在React中实现分页?',
  'How to optimize images in React app?', '如何优化React应用中的图片?',
  'How to deploy React app on server?', '如何在服务器上部署React应用?',
  'Why promises are better than callbacks?', '为什么Promise比回调函数更好?',
  'How to chain multiple promises?', '如何链式调用多个Promise?',
  'How to write async/await with promises?', '如何通过async/await使用Promise?',
  'How to handle errors with promises?', '如何处理Promise中的错误?',
  'When to use promise vs callback?', '在什么时候该使用Promise和回调函数?',
  'How to access DOM elements in React?', '如何在React中访问DOM元素?',
  'How to conditionally apply class in React?', '如何在React中条件添加class?',
  'How to communicate between React components?', 'React组件之间如何通讯?',
  'How to pass data between routes in React Router?', '如何在React Router中路由之间传递数据?',
  'How to deploy Nodejs app on server?', '如何在服务器上部署Nodejs应用?',
  'How to handle file upload in Nodejs?', '如何在Nodejs中处理文件上传?',
  'How to connect to MongoDB from Nodejs?', '如何从Nodejs连接MongoDB?',
  'How to build REST API with Nodejs?', '如何用Nodejs构建REST API?',
  'How to authenticate users in Nodejs app?', '如何在Nodejs应用中认证用户?',
  'How to debug Nodejs application?', '如何调试Nodejs应用程序?',
  'How to use NPM modules in Nodejs?', '如何在Nodejs中使用NPM模块?',
  'How to create custom NPM modules?', '如何创建自定义的NPM模块?',
  'Spring Boot', 'Spring Boot',
  '依赖注入', 'Dependency Injection',
  '自动配置', 'Auto Configuration',
  'Mintimate', 'Mintimate Blog', '雨月空间站', 'RustDesk Mintimate', 'Mintimate B站', '薄荷拼音', 'oh-my-rime', '薄荷拼音 Mintimate', '小狼毫输入法 Mintimate',
  'C++11新特性','C++11 Features',
  'C++14新特性','C++14 Features',
  'C++17新特性','C++17 Features',
  'C++20新特性','C++20 Features',
  'Mintimate Github','Mintimate 薄荷拼音',
  '什么是全栈开发?', 'What is full stack development?',
  '全栈开发者需要掌握哪些技能?', 'What skills does a full stack developer need?',
  'Mintimate Tool'
];

console.log(words.length)

// 配置参数
const baseWaitTime = 5000;
const count = ref(1);
const statusMode = ref(false);
const statusDisable = ref(false);
const statusLabel = ref("准备开始 Bing 搜索");

// 随机数工具类
class RandomUtils {
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  static getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  static getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  static generateRandomString(length, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

// 生成随机 CVID (Bing 的会话 ID)
const generateRandomCVID = () => {
  return RandomUtils.generateRandomString(32, 'ABCDEF0123456789');
}

// 生成随机 Refig (Bing 的引用 ID)
const generateRandomRefig = () => {
  return RandomUtils.generateRandomString(32, 'abcdef0123456789');
}

// 生成随机参数
const generateRandomParams = () => {
  const forms = ['QBRE', 'QBLH', 'ANNTH1', 'ANNH01', 'HCTS', 'ABT', 'MOZLBR'];
  const pcs = ['U531', 'U316', 'HCTS', 'MZABT', 'MOZI', 'MOZD'];
  
  return {
    form: RandomUtils.getRandomElement(forms),
    pc: RandomUtils.getRandomElement(pcs),
    sp: RandomUtils.getRandomInt(-1, 10),
    sc: `${RandomUtils.getRandomInt(8, 15)}-${RandomUtils.getRandomInt(3, 10)}`,
    qs: RandomUtils.getRandomElement(['n', 'AS', 'HS']),
    lq: RandomUtils.getRandomInt(0, 1)
  };
}

// 浏览器检测
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return {
    isFirefox: userAgent.includes('firefox'),
    isChrome: userAgent.includes('chrome') && !userAgent.includes('edge') && !userAgent.includes('edg'),
    isEdge: userAgent.includes('edge') || userAgent.includes('edg/'),
    isSafari: userAgent.includes('safari') && !userAgent.includes('chrome'),
    userAgent
  };
}

// 生成优化的 Bing 搜索 URL
const generateBingSearchUrl = (searchQuery, browserInfo) => {
  const encodedQuery = encodeURIComponent(searchQuery);
  const cvid = generateRandomCVID();
  const refig = generateRandomRefig();
  const params = generateRandomParams();
  const firstWord = encodeURIComponent(searchQuery.split(' ')[0]);
  
  const urlTemplates = {
    chrome: [
      `https://www.bing.com/search?q=${encodedQuery}&qs=n&form=QBRE&sp=-1&lq=0&pq=${firstWord}&sc=12-5&sk=&cvid=${cvid}`,
      `https://www.bing.com/search?q=${encodedQuery}&form=QBLH&pq=${firstWord}&sc=8-10&cvid=${cvid}`,
      `https://www.bing.com/search?q=${encodedQuery}&qs=AS&pq=${firstWord}&sc=10-8&cvid=${cvid}&FORM=QBRE`
    ],
    firefox: [
      `https://www.bing.com/search?pc=MZABT&form=ABT&q=${encodedQuery}`,
      `https://www.bing.com/search?pc=MOZI&form=MOZLBR&q=${encodedQuery}`,
      `https://www.bing.com/search?pc=MOZD&form=MOZSBR&q=${encodedQuery}`
    ],
    edge: [
      `https://www.bing.com/search?q=${encodedQuery}&form=ANNTH1&refig=${refig}&pc=U531`,
      `https://www.bing.com/search?q=${encodedQuery}&form=${params.form}&refig=${refig}&pc=${params.pc}&sp=${params.sp}`,
      `https://www.bing.com/search?q=${encodedQuery}&form=ANNH01&refig=${refig}&pc=U316&qs=${params.qs}&pq=${firstWord}`,
      `https://www.bing.com/search?q=${encodedQuery}&form=HCTS&pc=HCTS&refig=${refig}&cvid=${cvid}&sc=${params.sc}`
    ],
    safari: [
      `https://www.bing.com/search?q=${encodedQuery}&form=QBRE&cvid=${cvid}`,
      `https://www.bing.com/search?q=${encodedQuery}&pc=APPL&form=APPLBR`
    ]
  };
  
  // 根据浏览器选择 URL 模板
  let browserType = 'edge'; // 默认使用 Edge 模板
  if (browserInfo.isFirefox) browserType = 'firefox';
  else if (browserInfo.isChrome) browserType = 'chrome';
  else if (browserInfo.isSafari) browserType = 'safari';
  else if (browserInfo.isEdge) browserType = 'edge';
  
  const urls = urlTemplates[browserType];
  return RandomUtils.getRandomElement(urls);
}

// 智能等待时间计算
const calculateWaitTime = () => {
  // 基础等待时间：4-7秒之间随机
  const baseTime = RandomUtils.getRandomInt(4000, 7000);
  
  // 添加人性化随机延迟：±20%
  const variation = baseTime * 0.2;
  const randomVariation = RandomUtils.getRandomFloat(-variation, variation);
  
  return Math.max(2000, Math.floor(baseTime + randomVariation));
}

// 改进的数组洗牌算法 (Fisher-Yates)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 智能睡眠函数
const sleep = (ms) => {
  return new Promise((resolve) => {
    // 添加小幅随机延迟模拟人类行为
    const actualDelay = ms + RandomUtils.getRandomInt(-200, 500);
    setTimeout(resolve, Math.max(1000, actualDelay));
  });
}

// 标签页管理器
class TabManager {
  constructor() {
    this.openTabs = new Set();
  }
  
  async openTab(url) {
    try {
      // 直接使用 _blank 打开新标签页，不设置窗口特性
      const newTab = window.open(url, '_blank');
      
      if (newTab && !newTab.closed) {
        this.openTabs.add(newTab);
        return newTab;
      } else {
        throw new Error('标签页被阻止或无法打开');
      }
    } catch (error) {
      console.warn('打开标签页失败:', error);
      // 降级处理：尝试直接打开
      const fallbackTab = window.open(url, '_blank');
      if (fallbackTab) {
        this.openTabs.add(fallbackTab);
      }
      return fallbackTab;
    }
  }
  
  closeTab(tabRef) {
    if (tabRef && !tabRef.closed) {
      try {
        tabRef.close();
        this.openTabs.delete(tabRef);
      } catch (error) {
        console.warn('关闭标签页失败:', error);
        // 某些浏览器可能不允许关闭非脚本打开的标签页
        // 这种情况下我们只从集合中移除引用
        this.openTabs.delete(tabRef);
      }
    }
  }
  
  closeAllTabs() {
    this.openTabs.forEach(tab => this.closeTab(tab));
    this.openTabs.clear();
  }
  
  getOpenTabsCount() {
    // 清理已关闭的标签页引用
    this.openTabs.forEach(tab => {
      if (tab.closed) {
        this.openTabs.delete(tab);
      }
    });
    return this.openTabs.size;
  }
}

const tabManager = new TabManager();

/** 开始任务 */
const newTab = async () => {
  // 获取浏览器信息
  const browserInfo = getBrowserInfo();
  
  // 洗牌搜索词数组
  const shuffledWords = shuffleArray(words);
  
  statusMode.value = true;
  statusDisable.value = false;
  const used = new Set();
  
  toast.add({
    id: 'search-start',
    title: '🚀 搜索启动',
    description: `检测到 ${browserInfo.isChrome ? 'Chrome' : browserInfo.isFirefox ? 'Firefox' : browserInfo.isEdge ? 'Edge' : browserInfo.isSafari ? 'Safari' : '未知'} 浏览器，使用优化参数`,
    icon: 'i-heroicons-play-circle',
    timeout: 4000,
  });
  
  /** 开始搜索循环 */
  for (let i = 1; i <= 36; i++) {
    if (statusDisable.value) {
      break;
    }
    
    count.value = i;
    statusLabel.value = `正在执行第 ${i} 次搜索任务 (${Math.round((i/36)*100)}%)`;
    
    try {
      // 智能选择搜索词，避免重复
      let searchTerm;
      let attempts = 0;
      do {
        const index = RandomUtils.getRandomInt(0, shuffledWords.length - 1);
        searchTerm = shuffledWords[index];
        attempts++;
      } while (used.has(searchTerm) && attempts < 10);
      
      used.add(searchTerm);
      
      // 生成优化的搜索 URL
      const searchUrl = generateBingSearchUrl(searchTerm, browserInfo);
      
      // 打开搜索标签页
      const searchTab = await tabManager.openTab(searchUrl);
      
      if (!searchTab) {
        throw new Error('无法打开搜索标签页');
      }
      
      // 智能等待时间
      const waitTime = calculateWaitTime();
      statusLabel.value = `第 ${i} 次搜索完成，等待 ${Math.round(waitTime/1000)} 秒...`;
      
      await sleep(waitTime);
      
      // 关闭标签页
      tabManager.closeTab(searchTab);
      
      // 每10次搜索显示进度提示
      if (i % 10 === 0) {
        toast.add({
          id: `progress-${i}`,
          title: '📊 进度更新',
          description: `已完成 ${i}/36 次搜索 (${Math.round((i/36)*100)}%)`,
          icon: 'i-heroicons-chart-bar',
          timeout: 2000,
        });
      }
      
    } catch (error) {
      console.error(`第 ${i} 次搜索失败:`, error);
      
      toast.add({
        id: `error-${i}`,
        title: '⚠️ 搜索异常',
        description: `第 ${i} 次搜索遇到问题，继续下一次...`,
        icon: 'i-heroicons-exclamation-triangle',
        timeout: 3000,
      });
      
      // 出错时稍微延长等待时间
      await sleep(calculateWaitTime() * 1.5);
    }
  }
  
  /** 任务结束处理 */
  tabManager.closeAllTabs(); // 确保所有标签页都关闭
  
  if (!statusDisable.value) {
    statusLabel.value = "🎉 所有搜索任务已完成";
    toast.add({
      id: 'search-complete',
      title: '✅ 任务完成',
      description: `成功完成所有 36 次 Bing 搜索任务！使用了 ${browserInfo.isChrome ? 'Chrome' : browserInfo.isFirefox ? 'Firefox' : browserInfo.isEdge ? 'Edge' : '通用'} 优化参数`,
      icon: 'i-heroicons-check-circle',
      timeout: 6000,
    });
  } else {
    statusLabel.value = "🛑 搜索任务已停止";
    toast.add({
      id: 'search-stopped',
      title: '⏹️ 任务停止',
      description: `搜索任务已被用户停止，完成了 ${count.value - 1} 次搜索`,
      icon: 'i-heroicons-stop-circle',
      timeout: 4000,
    });
  }
  
  statusDisable.value = false;
  statusMode.value = false;
}

/** 提前结束 */
const stopNewTab = () => {
  statusLabel.value = "🛑 正在停止搜索任务...";
  statusDisable.value = true;
  
  // 关闭所有打开的标签页
  tabManager.closeAllTabs();
  
  toast.add({
    id: 'stopping',
    title: '⏸️ 正在停止',
    description: '正在安全停止搜索任务并关闭相关标签页...',
    icon: 'i-heroicons-pause',
    timeout: 2000,
  });
}

const startReward = () => {
  window.addEventListener('load', function () {
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 100);
  });
}
</script>

<style scoped>
/* 主控制卡片 */
.control-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.control-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

@media (prefers-color-scheme: dark) {
  .control-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}

/* 状态显示区域 */
.status-section {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .status-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 768px) {
  .status-container {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }
}

.status-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(226, 232, 240);
  color: rgb(100, 116, 139);
  transition: all 0.3s ease;
}

.status-icon.active {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
  color: white;
  animation: pulse 2s infinite;
}

@media (prefers-color-scheme: dark) {
  .status-icon {
    background: rgb(51, 65, 85);
    color: rgb(148, 163, 184);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.status-info {
  text-align: center;
}

@media (min-width: 768px) {
  .status-info {
    text-align: left;
  }
}

.status-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  .status-title {
    color: white;
  }
}

.status-description {
  color: rgb(100, 116, 139);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

@media (prefers-color-scheme: dark) {
  .status-description {
    color: rgb(148, 163, 184);
  }
}

.progress-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.progress-text {
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .progress-text {
    color: rgb(148, 163, 184);
  }
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background: rgb(226, 232, 240);
  border-radius: 0.25rem;
  overflow: hidden;
}

@media (prefers-color-scheme: dark) {
  .progress-bar {
    background: rgb(51, 65, 85);
  }
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
  border-radius: 0.25rem;
  transition: width 0.3s ease;
}

/* 操作按钮区域 */
.action-section {
  display: flex;
  justify-content: center;
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

.tips-icon {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.operation-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
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
  margin-bottom: 0.75rem;
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

/* 插件推荐区域 */
.plugin-section {
  margin-bottom: 2rem;
}

.plugin-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  transition: all 0.3s ease;
}

@media (prefers-color-scheme: dark) {
  .plugin-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.plugin-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.plugin-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
}

@media (prefers-color-scheme: dark) {
  .plugin-title {
    color: white;
  }
}

.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.plugin-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: rgb(248, 250, 252);
  transition: all 0.3s ease;
  text-decoration: none;
}

.plugin-item:hover {
  background: rgb(241, 245, 249);
  transform: translateY(-2px);
}

@media (prefers-color-scheme: dark) {
  .plugin-item {
    background: rgb(51, 65, 85);
  }
  
  .plugin-item:hover {
    background: rgb(71, 85, 105);
  }
}

.plugin-logo {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}

.plugin-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(30, 41, 59);
  text-align: center;
}

@media (prefers-color-scheme: dark) {
  .plugin-name {
    color: white;
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

.control-card, .info-card, .plugin-card {
  animation: fadeInUp 0.6s ease-out;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }

/* 特殊链接样式 */
.special-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
}

.special-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.special-link:hover::before {
  left: 100%;
}

/* GitHub 链接样式 */
.github-link {
  background: linear-gradient(135deg, #24292e 0%, #4a5568 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(36, 41, 46, 0.3);
}

.github-link:hover {
  background: linear-gradient(135deg, #1a1e22 0%, #2d3748 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(36, 41, 46, 0.4);
}

/* 爱发电赞助链接样式 */
.sponsor-link {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #ff9ff3 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  position: relative;
}

.sponsor-link::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E") repeat;
  border-radius: 0.5rem;
  pointer-events: none;
}

.sponsor-link:hover {
  background: linear-gradient(135deg, #ff5252 0%, #d63031 50%, #fd79a8 100%);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5);
}

.sponsor-icon {
  font-size: 1rem;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* 波浪效果 */
.sponsor-link {
  background-image: 
    linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #ff9ff3 100%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/path%3E%3C/svg%3E");
  background-size: cover, 200% 100%;
  background-position: center, 0% 0%;
  animation: wave 3s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { background-position: center, 0% 0%; }
  50% { background-position: center, 100% 0%; }
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .github-link {
    background: linear-gradient(135deg, #0d1117 0%, #21262d 100%);
    box-shadow: 0 4px 15px rgba(13, 17, 23, 0.5);
  }
  
  .github-link:hover {
    background: linear-gradient(135deg, #010409 0%, #161b22 100%);
    box-shadow: 0 8px 25px rgba(13, 17, 23, 0.7);
  }
  
  .sponsor-link {
    background: linear-gradient(135deg, #ff4757 0%, #c44569 50%, #f8b500 100%);
  }
  
  .sponsor-link:hover {
    background: linear-gradient(135deg, #ff3742 0%, #a55eea 50%, #feca57 100%);
  }
}

/* 响应式设计 */
@media (max-width: 640px) {
  .special-link {
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
  }
  
  .sponsor-icon {
    font-size: 0.875rem;
  }
}
</style>