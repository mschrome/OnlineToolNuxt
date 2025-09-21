<script setup>
import FileSaver from 'file-saver'

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
    required: false
  },
  imageUrl: {
    type: String,
    required: true
  }
})

// 定义事件
const emit = defineEmits(['close'])


/** 下载图片 */
const downloadImage = (imageUrl) => {
  // 直接下载
  FileSaver.saveAs(imageUrl, 'emojiMix')
  emit('close')
}

</script>

<template>
  <!-- 下载图片Tab -->
  <div
      v-if="showModal"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
    <div
        class="fixed inset-x-0 bottom-0 flex mx-5 items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 dark:bg-gray-900/50 bg-opacity-50 transition-opacity" @click="emit('close')"
           aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
          class="inline-block align-bottom bg-white dark:bg-gray-900/95 rounded-xl
          px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:mb-8 sm:align-middle sm:max-w-lg w-full sm:p-6">
        <div class="sm:flex sm:items-start">
          <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg
               sm:mx-0 sm:h-auto sm:w-32 ">
            <NuxtImg :src="imageUrl" class="sm:h-auto sm:w-32 h-12 w-12 sm:rounded-none
             object-contain hover:scale-150 transition-all ease-in-out delay-150  duration-700"/>
            <!--            <UIcon class="bg-gray-500 dark:bg-gray-200" name="i-ic-baseline-photo-library"/>-->
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div class="text-xl leading-6 font-medium text-gray-900 dark:text-gray-100 p-5">
              确认下载图片?
              <p class="text-sm leading-5 pt-2 text-gray-500 dark:text-gray-400">
                移动端可能需要自己长按保存哦
              </p>
              <div class="flex items-center justify-center sm:justify-start text-sm leading-5 pt-2 text-pink-500 dark:text-pink-400">
                <span class="pr-1">AD: </span>
                <a href="https://afdian.com/a/mintimate" target="_blank"
                   class="underline decoration-wavy decoration-pink-500 underline-offset-4">喜欢这个项目?
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button type="button"
                  class="w-full inline-flex justify-center
                  rounded-full border border-transparent shadow-sm
                  px-4 py-1 bg-primary-600/90 text-base font-medium text-gray-200
                  hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="downloadImage(imageUrl)">
            确定
          </button>
          <button type="button"
                  class="mt-3 w-full inline-flex justify-center
                   rounded-full border border-gray-300 shadow-sm
                   px-4 py-1 bg-gray-100 text-base font-medium
                   text-gray-700 hover:text-gray-500 focus:outline-none
                   focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  @click="emit('close')">
            取消
          </button>
        </div>

      </div>
    </div>
  </div>

</template>

<style scoped>

</style>