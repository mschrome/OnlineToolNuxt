# 在线工具箱 - OnlineToolNuxt

[![Nuxt](https://img.shields.io/badge/Nuxt-4.1.2-00DC82?logo=nuxt.js)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3.5.21-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)

一个基于 Nuxt.js 构建的现代化在线工具箱，提供多种实用的在线工具，致力于为开发者和用户提供便民服务。

## ✨ 特性

- 🚀 基于 Nuxt 4.x 构建，支持 SSR/SSG
- 🎨 使用 Nuxt UI 组件库，界面美观现代
- 🌙 支持深色/浅色主题切换
- 📱 完全响应式设计，支持移动端
- ⚡ 快速加载，优秀的用户体验
- 🔧 丰富的在线工具集合
- 🐳 支持 Docker 部署

## 🛠️ 工具分类

### 📝 字符工具 (Character Tools)
- **复杂密码生成器** - 生成安全的复杂密码
- **Emoji 混合器** - 创意 Emoji 组合工具
- **Markdown 预览器** - 实时 Markdown 渲染
- **随机数生成器** - 生成各种类型的随机数
- **字符统计工具** - 统计文本字符数量
- **Base64 编解码** - 文本 Base64 编码解码
- **繁简转换** - 中文繁体简体互转
- **URL 音乐解析** - 解析音乐链接信息

### 🌐 网络工具 (Network Tools)
- **IP 地址查询** - 获取和查询 IP 地址信息
- **自动必应搜索** - 便捷的搜索工具
- **跨平台 Chrome 下载** - Chrome 浏览器下载链接
- **GitHub CDN** - GitHub 文件加速访问
- **Minecraft 服务器状态检测** - MC 服务器在线状态查询
- **腾讯云工具集** - 腾讯云相关工具

### 📅 日期工具 (Date Tools)
- **日期计算器** - 计算日期间隔和加减
- **中国农历** - 公历农历转换查询

### 🖼️ 图形工具 (Graphics Tools)
- **HDR 显示测试** - 测试显示器 HDR 支持
- **图片处理工具** - 在线图片编辑处理

### 🔧 其他工具 (Other Tools)
- 更多实用工具持续添加中...

## 🚀 快速开始

### 环境要求

- Node.js 22+ 
- Yarn 或 npm

### 安装依赖

```bash
# 使用 yarn (推荐)
yarn install

# 或使用 npm
npm install
```

### 开发模式

```bash
# 启动开发服务器
yarn dev

# 或
npm run dev
```

访问 `http://localhost:3000` 查看应用。

### 构建生产版本

```bash
# 构建应用
yarn build

# 预览生产版本
yarn preview
```

### 生成静态站点

```bash
# 生成静态文件
yarn generate
```

## 🐳 Docker 部署

项目支持 Docker 容器化部署：

```bash
# 构建镜像
docker build -t online-tool-nuxt .

# 运行容器
docker run -p 3000:3000 online-tool-nuxt
```

### Docker Compose

```yaml
version: '3.8'
services:
  online-tool:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## 📁 项目结构

```
OnlineToolNuxt/
├── app/                    # 应用源码
│   ├── assets/            # 静态资源
│   ├── components/        # Vue 组件
│   ├── layouts/           # 布局文件
│   ├── pages/             # 页面文件
│   │   ├── characterTool/ # 字符工具
│   │   ├── networkTool/   # 网络工具
│   │   ├── dateTool/      # 日期工具
│   │   ├── graphicsTool/  # 图形工具
│   │   └── other/         # 其他工具
│   ├── plugins/           # 插件
│   └── utils/             # 工具函数
├── server/                # 服务端 API
├── public/                # 公共静态文件
├── ExternalData/          # 外部数据文件
├── nuxt.config.ts         # Nuxt 配置
├── package.json           # 项目依赖
└── Dockerfile             # Docker 配置
```

## 🔧 技术栈

- **框架**: [Nuxt.js 4.x](https://nuxt.com/)
- **前端**: [Vue.js 3.x](https://vuejs.org/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **UI 库**: [Nuxt UI](https://ui.nuxt.com/)
- **样式**: CSS3 + TailwindCSS
- **构建工具**: Vite
- **包管理**: Yarn
- **容器化**: Docker

## 📦 主要依赖

```json
{
  "@nuxt/ui": "^3.3.4",
  "@nuxt/content": "3.7.1",
  "@nuxt/image": "1.11.0",
  "nuxt": "^4.1.2",
  "vue": "^3.5.21",
  "typescript": "^5.6.3"
}
```

## 🌐 API 接口

项目需要包含以下 API 接口：

- `GET /api/IP/getBase` - 获取客户端 IP 地址
- `GET /api/IP/getInfo/:ip` - 获取 IP 详细信息
- 更多 API 接口请查看 `server/api/` 目录

## 🎨 主题配置

支持深色/浅色主题切换，主题配置在 `nuxt.config.ts` 中：

```typescript
colorMode: {
  classSuffix: '',
  storageKey: 'tool-theme-mode'
}
```

## 🔧 开发配置

### 代理配置

开发环境下配置了以下代理：

```typescript
nitro: {
  devProxy: {
    '/api_v1': {
      target: 'http://127.0.0.1:8083/',
      changeOrigin: true,
    },
    '/ghs': {
      target: 'https://gh.flyinbug.top/gh/',
      changeOrigin: true,
    }
  }
}
```

### ESLint 配置

项目使用 `@nuxt/eslint` 进行代码规范检查。

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request


## 👨‍💻 作者

**Mintimate**

- 博客: [https://www.mintimate.cn](https://www.mintimate.cn)
- GitHub: [@Mintimate](https://github.com/Mintimate)
- YouTube: [@mintimate](https://www.youtube.com/@mintimate)
- Bilibili: [Mintimate](https://space.bilibili.com/355567627)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/your-repo/issues)
- 爱发电平台: [https://afdian.com/a/mintimate](https://afdian.com/a/mintimate)