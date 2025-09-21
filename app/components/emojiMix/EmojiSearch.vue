<script setup>
const props = defineProps({
  chosenEmoji: {
    type: String,
    default: ""
  },
  emojiList: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array,
    required: true
  },
  rangeSearchIgnoreDisable: {
    type: Boolean,
    default: false
  }
})

// 定义事件
const emit = defineEmits(['rangeSearch','update:modelValue'])


// 搜索内容
const searchKeyWord = ref('');

/** 进行搜索操作 */
let handleSearch = async (keyWords) => {
  // 如果关键词长度小于3，返回一个空数组
  if (keyWords.length < 3) {
    return emit("update:modelValue",[])
  }
  // 否则，向 "/api/emojiSearch" 发送异步请求，将关键词作为查询参数
  const {message, pending, error} = await $fetch("/api/emojiSearch", {query: {'keyword': keyWords}});
  // 根据是否有错误来更新值
  emit("update:modelValue", error ? [] : message);
}
let getRandomEnabledEmoji = () => {
  const enabledEmojis = props.rangeSearchIgnoreDisable ?  props.emojiList : props.emojiList.filter(e => !e.disabled);
  const randomIndex = Math.floor(Math.random() * enabledEmojis.length);
  emit('rangeSearch',enabledEmojis[randomIndex])
}
</script>

<template>
    <div style="position: sticky; top: 2px; z-index: 1">
      <div class="flex items-center justify-center">
        <UInput placeholder="Emoji英文描述..." size="lg"
                class="hidden lg:inline-block"
                v-model="searchKeyWord" @keydown.enter="handleSearch(searchKeyWord)">
          <template #leading>
            <UAvatar v-if="!chosenEmoji" src="/img/emoji/EmojiMixLogo.png" size="xs"/>
            <UAvatar
                v-else
                :src="`/img/emoji/svg/emoji_u${chosenEmoji.split('-')
                        .filter((x) => x !== 'fe0f')
                        .map((x) => x.padStart(4, '0')) // Handle ©️ and ®️
                        .join('_')}.svg`"
                size="xs"
            />
          </template>
        </UInput>
        <UButton
            @click="getRandomEnabledEmoji()"
            color="white"
            size="sm"
            square>
          <UAvatar src="/img/emoji/EmojiMixGameDict.png" size="xs" />
        </UButton>
      </div>
  </div>

</template>

<style scoped>

</style>