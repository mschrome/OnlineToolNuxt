<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-7xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Markdown 编辑器
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          实时预览的 Markdown 编辑器，支持 Mermaid 图表渲染
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="tool-card">
        <!-- 模式切换区域 -->
        <div class="mode-switch-section">
          <div class="mode-switch-container">
            <div class="mode-label" :class="{ active: !showSidebar }">
              <UIcon name="i-heroicons-eye-slash" class="mr-2" />
              隐藏目录
            </div>
            <USwitch
              v-model="showSidebar"
              class="mode-switch"
              size="lg"
            />
            <div class="mode-label" :class="{ active: showSidebar }">
              <UIcon name="i-heroicons-list-bullet" class="mr-2" />
              显示目录
            </div>
          </div>
          <p class="mode-description">
            实时编辑预览模式，左侧编辑 Markdown，右侧实时显示渲染结果
          </p>
        </div>

        <!-- 编辑器区域 -->
        <div class="editor-section" :class="{ 'no-sidebar': !showSidebar }">
          <!-- 侧边栏目录 -->
          <div v-if="showSidebar" class="sidebar">
            <div class="toc-container">
              <div class="toc-header">
                <UIcon name="i-heroicons-list-bullet" class="mr-2" />
                目录
              </div>
              <div class="toc-content" ref="tocContainer">
                <!-- 目录将在这里动态生成 -->
              </div>
            </div>
          </div>

          <!-- 编辑器和预览区域 -->
          <div class="main-content">
            <!-- 编辑器 -->
            <div class="editor-container">
              <div class="editor-header">
                <div class="editor-title">
                  <UIcon name="i-heroicons-document-text" class="mr-2" />
                  Markdown 编辑器
                </div>
                <div class="char-count">{{ markdownText.length }} 字符</div>
              </div>
              <UTextarea
                v-model="markdownText"
                placeholder="请输入 Markdown 内容..."
                class="markdown-textarea"
                :ui="{ 
                  base: 'w-full h-full flex-1',
                  wrapper: 'w-full h-full flex-1'
                }"
                autoresize
              />
            </div>

            <!-- 预览区域 -->
            <div class="preview-container">
              <div class="preview-header">
                <div class="preview-title">
                  <UIcon name="i-heroicons-eye" class="mr-2" />
                  预览结果
                </div>
                <div class="word-count">{{ wordCount }} 字</div>
              </div>
              <div 
                class="markdown-preview"
                ref="previewContainer"
                v-html="renderedMarkdown"
              ></div>
            </div>
          </div>
        </div>

        <!-- 操作按钮区域 -->
        <div class="action-section">
          <UButton
            @click="copyMarkdown"
            :disabled="!markdownText"
            class="primary-button"
            size="lg"
          >
            <UIcon name="i-heroicons-clipboard-document" class="mr-2" />
            复制 Markdown
          </UButton>

          <UButton
            @click="copyHtml"
            :disabled="!renderedMarkdown"
            variant="outline"
            size="lg"
            class="secondary-button"
          >
            <UIcon name="i-heroicons-code-bracket" class="mr-2" />
            复制 HTML
          </UButton>

          <UButton
            @click="clearContent"
            :disabled="!markdownText"
            variant="outline"
            size="lg"
            color="red"
            class="danger-button"
          >
            <UIcon name="i-heroicons-trash" class="mr-2" />
            清空内容
          </UButton>

          <UButton
            @click="loadDemo"
            variant="outline"
            size="lg"
            class="secondary-button"
          >
            <UIcon name="i-heroicons-document-duplicate" class="mr-2" />
            加载示例
          </UButton>
        </div>
      </div>

      <!-- 信息卡片 -->
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon about-icon">
            <UIcon name="i-heroicons-information-circle" />
          </div>
          <div class="info-content">
            <h3 class="info-title">什么是 Markdown？</h3>
            <p class="info-description">
              Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的 HTML 文档。
            </p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon usage-icon">
            <UIcon name="i-heroicons-light-bulb" />
          </div>
          <div class="info-content">
            <h3 class="info-title">支持的功能</h3>
            <ul class="info-list">
              <li>标题、列表、链接</li>
              <li>代码块语法高亮</li>
              <li>Mermaid 图表渲染</li>
              <li>自动生成目录</li>
            </ul>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon security-icon">
            <UIcon name="i-heroicons-shield-check" />
          </div>
          <div class="info-content">
            <h3 class="info-title">隐私保护</h3>
            <p class="info-description">
              所有内容都在本地浏览器中处理，不会上传到服务器。您的文档内容完全私密安全。
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
import { ref, computed, watch, nextTick, onMounted } from 'vue';

const toast = useToast();

useHead({
  title: 'Markdown在线编辑/渲染-在线工具箱',
  meta: [
    {
      name: 'description',
      content: '在线渲染和编辑Markdown内容，支持Mermaid图表，所有内容均在本地浏览器上完成。',
    },
    {
      name: 'keywords',
      content: '在线工具箱,Markdown在线渲染,Markdown画图,Markdown渲染,Markdown在线编辑,Mermaid',
    },
  ],
});

// 响应式数据
const showSidebar = ref(true);
const markdownText = ref(`# 关于
在此输入Markdown：
- \`渲染目录\`会根据本区块内标题内容，进行提取渲染。
- \`渲染文章\`会自动渲染本区块内Markdown为HTML内容。

渲染代码：
\`\`\`javascript
console.log("Hello, Markdown!");
\`\`\`

mermaid渲染图：
\`\`\`mermaid
graph TD
    A[开始] --> B{选择模式}
    B -- 编辑 --> C[编辑Markdown]
    C --> D[实时预览]
    B -- 预览 --> E[查看渲染结果]
    E --> F[导出HTML]
    D --> G[结束]
    F --> G
\`\`\`

## 安全信息
页面加载后，将不再连接网站服务器，所有内容存储在本地\`localStorage\`内，不用担心自己隐私泄露。

## 教程
如果你并不会使用Markdown语句，可以参考教程：
- [Markdown菜鸟教程](https://www.runoob.com/markdown/md-tutorial.html)

# 版权所有
- Mintimate's Blog：[https://www.mintimate.cn](https://www.mintimate.cn)
- Mintimate's Bilibili：[https://space.bilibili.com/355567627](https://space.bilibili.com/355567627)

## 感谢
- [Vue3](https://github.com/vuejs/vue-next)
- [Markdown-it](https://github.com/markdown-it/markdown-it)
- [Mermaid](https://github.com/mermaid-js/mermaid)

![示例图片](/Demo/MarkdownDemo.jpg)`);

const previewContainer = ref(null);
const tocContainer = ref(null);

// 计算属性
const wordCount = computed(() => {
  return markdownText.value.replace(/\s/g, '').length;
});

// Markdown 渲染器和渲染结果
let markdownIt = null;
let mermaid = null;
const renderedMarkdown = ref('');
let renderTimeout = null;

// 初始化 Markdown-it
const initMarkdownIt = async () => {
  if (process.client) {
    const MarkdownIt = (await import('markdown-it')).default;
    const markdownItAnchor = (await import('markdown-it-anchor')).default;
    
    markdownIt = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
                   hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                   '</code></pre>';
          } catch (__) {}
        }
        return '<pre class="hljs"><code>' + markdownIt.utils.escapeHtml(str) + '</code></pre>';
      }
    });

    // 添加锚点插件
    markdownIt.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink()
    });

    // 自定义 mermaid 渲染规则
    const defaultFence = markdownIt.renderer.rules.fence;
    markdownIt.renderer.rules.fence = function (tokens, idx, options, env, renderer) {
      const token = tokens[idx];
      if (token.info === 'mermaid') {
        const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
        return `<div class="mermaid-container">
          <div id="${id}" class="mermaid">${token.content}</div>
        </div>`;
      }
      return defaultFence(tokens, idx, options, env, renderer);
    };

    renderMarkdown();
  }
};

// 初始化 Mermaid
const initMermaid = async () => {
  if (process.client) {
    const mermaidModule = await import('mermaid');
    mermaid = mermaidModule.default;
    
    mermaid.initialize({
      startOnLoad: false,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Arial, sans-serif',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      },
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
        primaryBorderColor: '#3b82f6',
        lineColor: document.documentElement.classList.contains('dark') ? '#64748b' : '#374151',
        sectionBkgColor: 'transparent',
        altSectionBkgColor: 'transparent',
        gridColor: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
        secondaryColor: 'transparent',
        tertiaryColor: 'transparent'
      }
    });
  }
};

// 渲染 Markdown
const renderMarkdown = () => {
  if (!markdownIt) return;
  
  // 清除之前的定时器
  if (renderTimeout) {
    clearTimeout(renderTimeout);
  }
  
  try {
    const newContent = markdownIt.render(markdownText.value);
    
    // 只有内容真正改变时才更新
    if (newContent !== renderedMarkdown.value) {
      renderedMarkdown.value = newContent;
      
      // 延迟渲染 Mermaid 和目录，避免频繁更新
      renderTimeout = setTimeout(() => {
        nextTick(() => {
          renderMermaidCharts();
          generateToc();
        });
      }, 150);
    }
  } catch (error) {
    console.error('Markdown rendering error:', error);
    renderedMarkdown.value = '<p>渲染错误，请检查 Markdown 语法</p>';
  }
};

// 渲染 Mermaid 图表
const renderMermaidCharts = async () => {
  if (!mermaid || !previewContainer.value) return;
  
  const mermaidElements = previewContainer.value.querySelectorAll('.mermaid');
  
  for (let i = 0; i < mermaidElements.length; i++) {
    const element = mermaidElements[i];
    const content = element.textContent.trim();
    
    if (!content || element.querySelector('svg')) {
      // 如果没有内容或已经渲染过，跳过
      continue;
    }
    
    try {
      const uniqueId = `mermaid-${Date.now()}-${i}`;
      const { svg } = await mermaid.render(uniqueId, content);
      element.innerHTML = svg;
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      element.innerHTML = `<p style="color: red;">Mermaid 图表渲染失败</p>`;
    }
  }
};

// 生成目录
const generateToc = () => {
  if (!previewContainer.value || !tocContainer.value) return;
  
  const headings = previewContainer.value.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const tocHtml = [];
  
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent;
    const id = heading.id || `heading-${index}`;
    
    if (!heading.id) {
      heading.id = id;
    }
    
    tocHtml.push(`
      <div class="toc-item toc-level-${level}">
        <a href="#${id}" class="toc-link">${text}</a>
      </div>
    `);
  });
  
  tocContainer.value.innerHTML = tocHtml.join('');
  
  // 添加点击事件
  tocContainer.value.querySelectorAll('.toc-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};



// 复制 Markdown
const copyMarkdown = () => {
  navigator.clipboard.writeText(markdownText.value)
    .then(() => {
      toast.add({
        id: 'copy-markdown-success',
        title: '复制成功',
        description: 'Markdown 内容已复制到剪贴板',
        icon: 'i-heroicons-face-smile-20-solid',
        timeout: 3000,
      });
    })
    .catch(() => {
      toast.add({
        id: 'copy-markdown-error',
        title: '复制失败',
        description: '请手动复制内容',
        icon: 'i-heroicons-face-frown-20-solid',
        timeout: 3000,
      });
    });
};

// 复制 HTML
const copyHtml = () => {
  navigator.clipboard.writeText(renderedMarkdown.value)
    .then(() => {
      toast.add({
        id: 'copy-html-success',
        title: '复制成功',
        description: 'HTML 内容已复制到剪贴板',
        icon: 'i-heroicons-face-smile-20-solid',
        timeout: 3000,
      });
    })
    .catch(() => {
      toast.add({
        id: 'copy-html-error',
        title: '复制失败',
        description: '请手动复制内容',
        icon: 'i-heroicons-face-frown-20-solid',
        timeout: 3000,
      });
    });
};

// 清空内容
const clearContent = () => {
  markdownText.value = '';
  renderedMarkdown.value = '';
};

// 加载示例
const loadDemo = () => {
  markdownText.value = `# Markdown 示例文档

## 基本语法

### 文本格式
- **粗体文本**
- *斜体文本*
- ~~删除线~~
- \`行内代码\`

### 列表
1. 有序列表项 1
2. 有序列表项 2
   - 无序子项
   - 另一个子项

### 链接和图片
[链接文本](https://example.com)

### 代码块
\`\`\`javascript
function hello() {
    console.log("Hello, World!");
}
\`\`\`

### Mermaid 流程图
\`\`\`mermaid
graph LR
    A[开始] --> B{判断}
    B -->|是| C[执行A]
    B -->|否| D[执行B]
    C --> E[结束]
    D --> E
\`\`\`

### 表格
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

## 高级功能

### 引用
> 这是一个引用块
> 可以包含多行内容

### 分割线
---

这就是 Markdown 的基本用法！`;
};

// 监听 Markdown 内容变化
let watchTimeout = null;
watch(markdownText, () => {
  // 清除之前的定时器
  if (watchTimeout) {
    clearTimeout(watchTimeout);
  }
  
  // 防抖处理，减少频繁渲染
  watchTimeout = setTimeout(() => {
    renderMarkdown();
  }, 500);
});

// 组件挂载
onMounted(async () => {
  // 动态导入 highlight.js
  if (process.client) {
    const hljs = await import('highlight.js');
    window.hljs = hljs.default;
    
    await initMarkdownIt();
    await initMermaid();
    
    // 初始渲染
    renderMarkdown();
  }
});
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

/* 模式切换区域 */
.mode-switch-section {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .mode-switch-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.mode-switch-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.mode-label {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: rgb(100, 116, 139);
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
}

.mode-label.active {
  color: rgb(59, 130, 246);
  background: rgba(59, 130, 246, 0.1);
}

@media (prefers-color-scheme: dark) {
  .mode-label {
    color: rgb(148, 163, 184);
  }
  
  .mode-label.active {
    color: rgb(147, 197, 253);
    background: rgba(59, 130, 246, 0.2);
  }
}

.mode-description {
  color: rgb(100, 116, 139);
  font-size: 0.875rem;
}

@media (prefers-color-scheme: dark) {
  .mode-description {
    color: rgb(148, 163, 184);
  }
}

/* 编辑器区域 */
.editor-section {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
  min-height: 600px;
}

.editor-section.no-sidebar {
  grid-template-columns: 1fr;
}

@media (max-width: 1024px) {
  .editor-section {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    display: none;
  }
}

.sidebar {
  transition: all 0.3s ease;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  height: 600px;
  overflow: hidden; /* 防止整体溢出 */
}

@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    height: auto;
    min-height: 600px;
  }
}

/* 目录样式 */
.toc-container {
  background: rgb(248, 250, 252);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  position: sticky;
  top: 2rem;
  max-height: 500px;
  overflow-y: auto;
}

@media (prefers-color-scheme: dark) {
  .toc-container {
    background: rgb(51, 65, 85);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.toc-header {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .toc-header {
    color: white;
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.toc-item {
  margin-bottom: 0.5rem;
}

.toc-level-1 { padding-left: 0; }
.toc-level-2 { padding-left: 1rem; }
.toc-level-3 { padding-left: 2rem; }
.toc-level-4 { padding-left: 3rem; }
.toc-level-5 { padding-left: 4rem; }
.toc-level-6 { padding-left: 5rem; }

.toc-link {
  display: block;
  color: rgb(100, 116, 139);
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.toc-link:hover {
  color: rgb(59, 130, 246);
  background: rgba(59, 130, 246, 0.1);
}

@media (prefers-color-scheme: dark) {
  .toc-link {
    color: rgb(148, 163, 184);
  }
  
  .toc-link:hover {
    color: rgb(147, 197, 253);
    background: rgba(59, 130, 246, 0.2);
  }
}

/* 编辑器和预览区域 */
.editor-container, .preview-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 0; /* 防止内容溢出 */
  overflow: hidden; /* 防止溢出 */
}

.editor-header, .preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.editor-title, .preview-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(30, 41, 59);
}

@media (prefers-color-scheme: dark) {
  .editor-title, .preview-title {
    color: white;
  }
}

.char-count, .word-count {
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
  background: rgb(248, 250, 252);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

@media (prefers-color-scheme: dark) {
  .char-count, .word-count {
    color: rgb(148, 163, 184);
    background: rgb(51, 65, 85);
  }
}

.markdown-textarea {
  flex: 1 !important;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
  height: 0 !important; /* 让 flex: 1 正确工作 */
  min-height: 0 !important; /* 允许收缩 */
  resize: none !important;
}

.markdown-textarea textarea {
  height: 100% !important;
  min-height: 0 !important; /* 允许收缩 */
  resize: none !important;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
}

.preview-container {
  background: rgb(248, 250, 252);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  height: 100%;
  overflow: hidden;
}

@media (prefers-color-scheme: dark) {
  .preview-container {
    background: rgb(51, 65, 85);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.markdown-preview {
  flex: 1;
  overflow-y: auto;
  line-height: 1.7;
  height: 0; /* 让 flex: 1 正确工作 */
  min-height: 0; /* 允许收缩 */
}

/* 操作按钮区域 */
.action-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

@media (max-width: 640px) {
  .action-section {
    flex-direction: column;
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
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.usage-icon {
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

/* Mermaid 图表样式 */
.mermaid-container {
  text-align: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background: transparent !important;
  border-radius: 0.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.mermaid {
  background: transparent !important;
}

.mermaid svg {
  background: transparent !important;
  max-width: 100%;
  height: auto;
}

@media (prefers-color-scheme: dark) {
  .mermaid-container {
    background: transparent !important;
    border-color: rgba(71, 85, 105, 0.5);
  }
  
  .mermaid svg {
    background: transparent !important;
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
</style>

<style>
/* 全局 Markdown 预览样式 */
.markdown-preview {
  color: rgb(30, 41, 59);
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.25;
  color: rgb(30, 41, 59);
}

.markdown-preview h1 { font-size: 2rem; }
.markdown-preview h2 { font-size: 1.75rem; }
.markdown-preview h3 { font-size: 1.5rem; }
.markdown-preview h4 { font-size: 1.25rem; }
.markdown-preview h5 { font-size: 1.125rem; }
.markdown-preview h6 { font-size: 1rem; }

.markdown-preview p {
  margin-bottom: 1rem;
  line-height: 1.7;
  color: rgb(30, 41, 59);
}

.markdown-preview ul,
.markdown-preview ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
  list-style-position: outside;
}

.markdown-preview ul {
  list-style-type: disc;
}

.markdown-preview ol {
  list-style-type: decimal;
}

.markdown-preview ul ul {
  list-style-type: circle;
}

.markdown-preview ul ul ul {
  list-style-type: square;
}

.markdown-preview li {
  margin-bottom: 0.25rem;
  line-height: 1.6;
  color: rgb(30, 41, 59);
}

.markdown-preview blockquote {
  border-left: 4px solid rgb(59, 130, 246);
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: rgb(100, 116, 139);
  background: rgba(59, 130, 246, 0.05);
  border-radius: 0 0.5rem 0.5rem 0;
}

.markdown-preview code {
  background: rgb(248, 250, 252);
  color: rgb(239, 68, 68);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.markdown-preview pre {
  background: rgb(248, 250, 252);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid rgba(226, 232, 240, 0.5);
  position: relative;
}

.markdown-preview pre code {
  background: none;
  padding: 0;
  border: none;
  color: rgb(30, 41, 59);
  font-size: 0.875rem;
}

.markdown-preview table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  border: 1px solid rgba(226, 232, 240, 0.5);
  border-radius: 0.5rem;
  overflow: hidden;
}

.markdown-preview th,
.markdown-preview td {
  border: 1px solid rgba(226, 232, 240, 0.5);
  padding: 0.75rem;
  text-align: left;
}

.markdown-preview th {
  background: rgb(248, 250, 252);
  font-weight: 600;
  color: rgb(30, 41, 59);
}

.markdown-preview td {
  color: rgb(30, 41, 59);
}

.markdown-preview hr {
  border: none;
  border-top: 2px solid rgba(226, 232, 240, 0.5);
  margin: 2rem 0;
}

.markdown-preview a {
  color: rgb(59, 130, 246);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-bottom-color 0.2s ease;
}

.markdown-preview a:hover {
  border-bottom-color: rgb(59, 130, 246);
}

.markdown-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.markdown-preview strong {
  font-weight: 600;
  color: rgb(30, 41, 59);
}

.markdown-preview em {
  font-style: italic;
  color: rgb(100, 116, 139);
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .markdown-preview {
    color: rgb(226, 232, 240);
  }
  
  .markdown-preview h1,
  .markdown-preview h2,
  .markdown-preview h3,
  .markdown-preview h4,
  .markdown-preview h5,
  .markdown-preview h6 {
    color: white;
  }
  
  .markdown-preview p,
  .markdown-preview li,
  .markdown-preview td,
  .markdown-preview strong {
    color: rgb(226, 232, 240);
  }
  
  .markdown-preview blockquote {
    color: rgb(148, 163, 184);
    background: rgba(59, 130, 246, 0.1);
  }
  
  .markdown-preview code {
    background: rgb(51, 65, 85);
    color: rgb(251, 146, 60);
    border-color: rgba(71, 85, 105, 0.5);
  }
  
  .markdown-preview pre {
    background: rgb(51, 65, 85);
    border-color: rgba(71, 85, 105, 0.5);
  }
  
  .markdown-preview pre code {
    color: rgb(226, 232, 240);
  }
  
  .markdown-preview th {
    background: rgb(51, 65, 85);
    color: white;
  }
  
  .markdown-preview th,
  .markdown-preview td {
    border-color: rgba(71, 85, 105, 0.5);
  }
  
  .markdown-preview table {
    border-color: rgba(71, 85, 105, 0.5);
  }
  
  .markdown-preview hr {
    border-top-color: rgba(71, 85, 105, 0.5);
  }
  
  .markdown-preview a {
    color: rgb(147, 197, 253);
  }
  
  .markdown-preview a:hover {
    border-bottom-color: rgb(147, 197, 253);
  }
  
  .markdown-preview em {
    color: rgb(148, 163, 184);
  }
}

/* Highlight.js 代码高亮样式 */
.hljs {
  background: rgb(248, 250, 252) !important;
  color: rgb(30, 41, 59) !important;
  padding: 1rem !important;
  border-radius: 0.5rem !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
}

.hljs-comment,
.hljs-quote {
  color: rgb(100, 116, 139) !important;
  font-style: italic !important;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-subst {
  color: rgb(147, 51, 234) !important;
  font-weight: 600 !important;
}

.hljs-number,
.hljs-literal,
.hljs-variable,
.hljs-template-variable,
.hljs-tag .hljs-attr {
  color: rgb(239, 68, 68) !important;
}

.hljs-string,
.hljs-doctag {
  color: rgb(34, 197, 94) !important;
}

.hljs-title,
.hljs-section,
.hljs-selector-id {
  color: rgb(59, 130, 246) !important;
  font-weight: 600 !important;
}

.hljs-type,
.hljs-class .hljs-title {
  color: rgb(249, 115, 22) !important;
}

.hljs-tag,
.hljs-name,
.hljs-attribute {
  color: rgb(16, 185, 129) !important;
}

.hljs-regexp,
.hljs-link {
  color: rgb(236, 72, 153) !important;
}

.hljs-symbol,
.hljs-bullet {
  color: rgb(168, 85, 247) !important;
}

.hljs-built_in,
.hljs-builtin-name {
  color: rgb(6, 182, 212) !important;
}

.hljs-meta {
  color: rgb(100, 116, 139) !important;
}

.hljs-deletion {
  background: rgba(239, 68, 68, 0.1) !important;
}

.hljs-addition {
  background: rgba(34, 197, 94, 0.1) !important;
}

.hljs-emphasis {
  font-style: italic !important;
}

.hljs-strong {
  font-weight: 600 !important;
}

/* 暗色模式下的代码高亮 */
@media (prefers-color-scheme: dark) {
  .hljs {
    background: rgb(51, 65, 85) !important;
    color: rgb(226, 232, 240) !important;
  }
  
  .hljs-comment,
  .hljs-quote {
    color: rgb(148, 163, 184) !important;
  }
  
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-subst {
    color: rgb(196, 181, 253) !important;
  }
  
  .hljs-number,
  .hljs-literal,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag .hljs-attr {
    color: rgb(252, 165, 165) !important;
  }
  
  .hljs-string,
  .hljs-doctag {
    color: rgb(134, 239, 172) !important;
  }
  
  .hljs-title,
  .hljs-section,
  .hljs-selector-id {
    color: rgb(147, 197, 253) !important;
  }
  
  .hljs-type,
  .hljs-class .hljs-title {
    color: rgb(251, 191, 36) !important;
  }
  
  .hljs-tag,
  .hljs-name,
  .hljs-attribute {
    color: rgb(110, 231, 183) !important;
  }
  
  .hljs-regexp,
  .hljs-link {
    color: rgb(244, 114, 182) !important;
  }
  
  .hljs-symbol,
  .hljs-bullet {
    color: rgb(196, 181, 253) !important;
  }
  
  .hljs-built_in,
  .hljs-builtin-name {
    color: rgb(103, 232, 249) !important;
  }
  
  .hljs-meta {
    color: rgb(148, 163, 184) !important;
  }
}
</style>