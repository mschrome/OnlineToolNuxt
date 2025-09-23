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
  <div class="search-container">
    <div class="search-wrapper">
      <UInput 
        placeholder="搜索 Emoji (英文描述)..." 
        size="lg"
        class="search-input"
        v-model="searchKeyWord" 
        @keydown.enter="handleSearch(searchKeyWord)"
      >
        <template #leading>
          <div class="search-icon">
            <UIcon v-if="!chosenEmoji" name="i-heroicons-magnifying-glass" />
            <img
              v-else
              :src="`https://imagehost.mintimate.cn/svgEmoji/emoji_u${chosenEmoji.split('-')
                      .filter((x) => x !== 'fe0f')
                      .map((x) => x.padStart(4, '0'))
                      .join('_')}.svg`"
              class="chosen-emoji-icon"
              :alt="chosenEmoji"
            />
          </div>
        </template>
        <template #trailing>
          <UButton
            @click="getRandomEnabledEmoji()"
            variant="ghost"
            size="xs"
            class="random-button"
            :ui="{ rounded: 'rounded-full' }"
          >
            <UIcon name="i-heroicons-dice-3" class="text-lg" />
          </UButton>
        </template>
      </UInput>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.75rem;
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

@media (prefers-color-scheme: dark) {
  .search-container {
    background: rgba(30, 41, 59, 0.95);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
}

.chosen-emoji-icon {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
}

.random-button {
  color: rgb(100, 116, 139);
  transition: all 0.2s ease;
}

.random-button:hover {
  color: rgb(147, 51, 234);
  transform: rotate(180deg);
}

@media (prefers-color-scheme: dark) {
  .random-button {
    color: rgb(148, 163, 184);
  }
  
  .random-button:hover {
    color: rgb(196, 181, 253);
  }
}

@media (max-width: 768px) {
  .search-container {
    padding: 0.5rem;
  }
}
</style>