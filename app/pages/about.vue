<script setup>
useHead({
  title: '关于网站-在线工具箱',
  meta: [
    {
      name: 'description',
      content:
          '此处是在线工具箱的关于页面,包含网站介绍、联系信息等内容。欢迎使用我们的工具箱,提升效率!',
    },
    {
      name: 'keywords',
      content: '在线工具箱,工具箱,关于页面,网站介绍,友情链接',
    },
  ],
});

const sourceMoreInfoWeb = [
  {
    title:'Mintimate\'s Blog',
    subTitle: '也可以称作: 雨月空间站；我的博客',
    description:'分享一些代码、项目和新技术，偶尔也荒腔走板聊聊生活(o′ω`o)ノ',
    href:'https://www.mintimate.cn',
    imageSrc:'https://mintimate.cn/custom/img/favicon/favicon.png',
    imageAlt:'雨月空间站',
  },
  {
    title:'薄荷拼音输入法',
    subTitle: 'oh-my-rime、mint输入法',
    description:'基于rime开源输入法框架，配置的一个输入法模板',
    href:'https://www.mintimate.cc',
    imageSrc:'https://avatars.githubusercontent.com/u/10554324?s=200&v=4',
    imageAlt:'oh-my-rime',
  },
  {
    title:'Mintimate\'s Youtube',
    subTitle: '我的Youtube空间地址',
    description:'人挺少的，以至于连广告收入都没有~',
    href:'https://www.youtube.com/@mintimate',
    imageSrc:'https://imagehost.mintimate.cn/icon/youtube.png',
    imageAlt:'Mintimate\'s Youtube',
  },
  {
    title:'Mintimate\'s Bilibili',
    subTitle: '我的Bilibili空间地址',
    description:'技术教程视频；不过我B站人挺少的，以至于做一次视频就要花自己不少钱和时间，入不敷出……',
    href:'https://space.bilibili.com/355567627',
    imageSrc:'https://imagehost.mintimate.cn/icon/bilibili.png',
    imageAlt:'Mintimate\'s Bilibili',
  },
  {
    title:'爱发电粉丝交流平台',
    subTitle: '我的爱发电平台地址',
    description:'本来是想留邮箱或者QQ等联系方式的，但是奈何广告多，还有太多来求教的学生群体，实在没时间，只能用平台来加高门槛了',
    href:'https://afdian.com/a/mintimate',
    imageSrc:'https://imagehost.mintimate.cn/icon/aifadian.png',
    imageStyle: ['no-round'],
    imageAlt:'爱发电粉丝平台',
  },
]

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          关于本站
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          了解我们的团队和项目
        </p>
      </div>

      <!-- 主要介绍卡片 -->
      <div class="about-main-card">
        <div class="md:flex items-center gap-8">
          <div class="flex-shrink-0 text-center md:text-left mb-6 md:mb-0">
            <img
                id="avatar"
                class="w-32 h-32 md:w-48 md:h-48 rounded-2xl mx-auto md:mx-0 shadow-lg border-4 border-white dark:border-slate-700" 
                src="/avatar.png" 
                alt="Mintimate"
                width="512" 
                height="512">
          </div>
          <div class="flex-1 space-y-6">
            <div class="team-intro">
              <h3 class="section-title">
                <UIcon name="i-heroicons-users" class="mr-2" />
                我们团队主要
              </h3>
              <ul class="feature-list">
                <li>精通Linux操作系统使用以及基于Linux网站部署和编译。（Almost：RHCE级别）</li>
                <li>软件全栈工程师（SQL可能不是很熟，最起码存储过程不是，哈哈）</li>
                <li>精通DaVinci、Affinity Photo，业余Blogger</li>
              </ul>
              <p class="mt-4 text-slate-600 dark:text-slate-300">
                所以，我们的内容创作主要集中于：Java、Linux/Mac使用。同时我们会自己制作内容封面、视频教程。
              </p>
            </div>
            
            <div class="essential-info">
              <h3 class="section-title">
                <UIcon name="i-heroicons-information-circle" class="mr-2" />
                More Essential
              </h3>
              <ul class="feature-list">
                <li>网站资源都是免费的，并且也不会进行任何资料收集或出售给第三方公司，请放心使用(￣∇￣)</li>
                <li>网站功能更新也不能保证，部分功能受限于成本，在高峰期可能存在资源耗尽而无法使用的情况。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- About More 区域 -->
      <div class="text-center mb-12 mt-16">
        <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          About More
        </h2>
        <p class="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          这里包含更多网站的信息，包括一些我们的联系方式、其他网站和项目。希望有你感兴趣的东西~
        </p>
      </div>

      <!-- 列表展示组件 -->
      <ListDisplayComponent :list="sourceMoreInfoWeb"/>
    </div>
  </div>
</template>

<style scoped>
/* 主要介绍卡片 */
.about-main-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.about-main-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.dark .about-main-card {
  background: rgb(30, 41, 59);
  border-color: rgba(71, 85, 105, 0.5);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* 头像动画效果 */
#avatar {
  transition: all 0.3s ease;
}

#avatar:hover {
  transform: rotate(666turn);
  transition-delay: 1s;
  transition-property: all;
  transition-duration: 59s;
  transition-timing-function: cubic-bezier(.34, 0, .84, 1);
}

/* 章节标题 */
.section-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 1rem;
}

.dark .section-title {
  color: white;
}

/* 特性列表 */
.feature-list {
  list-style: none;
  padding: 0;
  space-y: 0.75rem;
}

.feature-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.6;
  color: rgb(100, 116, 139);
}

.feature-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(236, 72, 153);
  font-weight: bold;
  font-size: 1.2em;
}

.dark .feature-list li {
  color: rgb(148, 163, 184);
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

.about-main-card {
  animation: fadeInUp 0.6s ease-out;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-main-card {
    padding: 1.5rem;
  }
  
  #avatar {
    width: 8rem;
    height: 8rem;
  }
}
</style>