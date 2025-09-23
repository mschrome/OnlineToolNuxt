<script setup>
import { vAutoAnimate } from '@formkit/auto-animate'
import { ref, watch } from 'vue'
import EmojiSearch from "~/components/emojiMix/EmojiSearch.vue";

const props = defineProps({
  emojis: {
    type: Array,
    required: false
  },
  ignoreDisable: {
    type: Boolean,
    default: true,
    required: false
  },
  selectedEmoji: {
    type: String,
    default: ""
  }
})

const emit = defineEmits(['click']);

// 搜索结果
const emojiSearchFilterResult = ref([]);

/** 点击的Emoji */
let hasClickButton = ref("")

watch(
    () => props.selectedEmoji,
    (newVal) => {
      hasClickButton.value = newVal
    },
    { immediate: true }
)

watch(
    () => props.emojis.map(item => item.disabled),
    () => {
      if (!props.ignoreDisable) {
        hasClickButton.value = ''
      }
    },
    {deep: true, immediate: true}
)

function handleClick(emoji) {
  if (hasClickButton.value === emoji.item) {
    hasClickButton.value = ""
  } else if (props.ignoreDisable || !emoji.disabled) {
    hasClickButton.value = emoji.item
  }
  emit('click', emoji)
}

</script>

<template>
  <div class="emoji-list-container">
    <EmojiSearch  
      v-model="emojiSearchFilterResult"
      :emoji-list="emojis"
      :rangeSearchIgnoreDisable="ignoreDisable"
      :chosen-emoji="hasClickButton"
      @rangeSearch="handleClick"
    />
    <div class="emoji-grid" v-auto-animate>
      <template v-for="item in emojis" :key="item.item">
        <figure 
          v-if="emojiSearchFilterResult.length === 0 || emojiSearchFilterResult.includes(item.item)"
          class="emoji-item"
          :class="{
            'selected': hasClickButton === item.item,
            'disabled': !ignoreDisable && item.disabled,
            'available': ignoreDisable || !item.disabled
          }"
          @click="handleClick(item)"
        >
          <img 
            loading="lazy" 
            :alt="`Emoji_${item.item}`"
            :src="`https://imagehost.mintimate.cn/svgEmoji/emoji_u${item.item.split('-')
                     .filter((x) => x !== 'fe0f')
                     .map((x) => x.padStart(4, '0'))
                     .join('_')}.svg`"
            class="emoji-image"
          />
        </figure>
      </template>
    </div>
  </div>
</template>

<style scoped>
.emoji-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.emoji-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.5rem;
  flex: 1;
  overflow-y: auto;
}

.emoji-item {
  margin: 0;
  padding: 0.25rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

.emoji-item.available:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: scale(1.1);
}

.emoji-item.selected {
  background: linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119));
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
}

.emoji-item.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.emoji-item.disabled:hover {
  transform: none;
  background: none;
}

.emoji-image {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  display: block;
}

.emoji-item.selected .emoji-image {
  filter: brightness(1.1);
}

@media (max-width: 768px) {
  .emoji-image {
    width: 2rem;
    height: 2rem;
  }
  
  .emoji-grid {
    gap: 0.25rem;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .emoji-item.available:hover {
    background: rgba(147, 197, 253, 0.1);
  }
}
</style>