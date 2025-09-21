<script setup>
import {vAutoAnimate} from '@formkit/auto-animate'

const props = defineProps({
  // Emoji的表情结果
  resultEmoji: {
    type: Array,
    default: []
  },
  // 过滤结果
  filterResultEmoji:{
    type: Array,
    default:[]
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

/**
 * 触发带有提供的下载URL的点击事件。
 *
 * @param {string} downloadUrl - 下载的URL
 * @return {void}
 */
const clickEmitDownload = (downloadUrl) => {
  emit('click', downloadUrl)
}
</script>

<template>
  <div class="lg:col-span-3 col-span-5 overflow-y-auto h-screen">
    <ClientOnly>
      <template #fallback>
        <!-- 这将在服务器端呈现 -->
        <article class="max-w-sm rounded-lg bg-white lg:p-8 p-2 text-sm leading-6 text-slate-700 mt-2 text-left
           shadow-lg dark:bg-slate-800 dark:text-slate-400 sm:text-base sm:leading-7">
          <p class="line-clamp-3 mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
            请稍等，系统正在拼命加载(╯｀□′)╯
          </p>
        </article>
      </template>
      <div class="flex flex-wrap mb-4 mt-6 justify-center" v-auto-animate>
        <figure v-show="resultEmoji.length !== 0 && !loading"
                v-for="item in filterResultEmoji"
                :key="item.image" class="p-0">
          <NuxtImg :src="item.image" loading="lazy"
                   @click="clickEmitDownload(item.image)"
                   :class="filterResultEmoji.length <= 2  ? 'w-100': 'lg:w-24 sm:w-36'"
                   class="hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
          />
        </figure>
        <figure v-show="loading" v-for="item in 36" class="p-0" v-auto-animate>
          <USkeleton :key="item" class="lg:w-24 lg:h-24 sm:w-36 sm:h-36" :ui="{ rounded: 'rounded-full',base:'animate-bounce'}"/>
        </figure>
      </div>
      <div v-show="resultEmoji.length === 0">
        <figure
            class="p-0 flex flex-col-reverse bg-slate-50 rounded-lg dark:bg-slate-800 dark:highlight-white/5 text-center md:text-left">
          <figcaption>
            <div class="wwads-cn wwads-horizontal" style="min-height: 300px" data-id="264"></div>
          </figcaption>
        </figure>
        <article class="max-w-sm bg-white lg:p-8 p-2 text-sm leading-6 text-slate-700 mt-2 text-left
           shadow-xl dark:bg-slate-800 dark:text-slate-400 sm:text-base sm:leading-7">
          <h2 class="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-200">小提示</h2>
          <p class="line-clamp-3 mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                <span class="underline decoration-primary-500/80 decoration-dashed underline-offset-4">
                  先点击左侧的Emoji，再点击右侧的Emoji
                </span>，让我们一起来看看会有什么神奇的效果呢？
          </p>
          <div class="text-sm text-right">
            <p>特别感谢</p>
            <ul class="list-none list-outside">
              <li><a class="underline decoration-pink-500  break-all"
                     href="https://github.com/xsalazar/emoji-kitchen" target="_blank">xsalazar/emoji-kitchen</a>
              </li>
              <li><a class="underline decoration-sky-500 break-all"
                     href="https://blog.google/products/android/emoji-kitchen-new-mashups-mixing-experience/"
                     target="_blank">Google EmojiMix</a></li>
            </ul>
          </div>
          <div
              class="mt-5 flex flex-wrap justify-between gap-x-2.5 text-sm font-semibold leading-6 text-slate-900 dark:text-slate-200">
            <div class="flex items-center gap-1.5">
              <img class="h-6 w-6 flex-none rounded-full bg-slate-50 dark:bg-slate-900"
                   src="https://www.mintimate.cn/custom/img/MintimateAvatar.png" alt="Logo Of The Mintiate's Blog">
              <a href="https://www.mintimate.cn" target="_blank">
                Mintimate
              </a>
            </div>
            <div class="text-xs flex items-center">
              <a href="https://afdian.com/a/mintimate" target="_blank"
                 class="underline decoration-wavy decoration-pink-500 underline-offset-4">Like this project?
              </a>
            </div>
          </div>

        </article>
      </div>
    </ClientOnly>
  </div>

</template>

<style scoped>

</style>