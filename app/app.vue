<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
useHead({
  title: '在线工具箱-By Mintimate',
  htmlAttrs:{
    lang:'zh'
  },
  meta: [
    {name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
  ],
  link: [
    {rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon'},
    {rel: 'icon', size: '64x64', href: '/favicon_64x64.png'},
    {rel: 'icon', size: '128x128', href: '/favicon.png'}
  ],
  script: [
    {
      async: true,
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8322854923336162',
      crossorigin: 'anonymous'
    },
    { // 万维广告
      async: true,
      src: 'https://cdn.wwads.cn/js/makemoney.js',
      crossorigin: 'anonymous'
    },
    {
      async: true,
      src: 'https://umami-console.mintimate.cn/script.js',
      "data-website-id": "57d362ec-45ec-417b-95dc-46855b3c8023"
    },
    { // 验证完整性
      src: '/js/verifyBlock.js',
      type: 'text/javascript'
    }
  ]
})
</script>
