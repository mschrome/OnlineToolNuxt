<script setup>
import {vAutoAnimate} from '@formkit/auto-animate'
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
  }
})

const emit = defineEmits(['click']);

// 搜索结果
const emojiSearchFilterResult = ref([]);

/** 点击的Emoji */
let hasClickButton = ref("")

watch(
    () => props.emojis.map(item => item.disabled),
    () => {
      hasClickButton.value = ''
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
  <div>
    <EmojiSearch  v-model="emojiSearchFilterResult"
                  :emoji-list="emojis"
                  :rangeSearchIgnoreDisable="ignoreDisable"
                  @rangeSearch="handleClick"/>
    <div class="flex flex-wrap mb-4 mt-2 justify-center" v-auto-animate>
      <template v-for="item in emojis" :key="item.item">
        <figure class="m-0.5 rounded-lg" @click="handleClick(item)"
                v-if="emojiSearchFilterResult.length === 0 || emojiSearchFilterResult.includes(item.item)"
                :class="hasClickButton===item.item?'ring-1 ring-pink-200 bg-amber-200/50':''">
          <img loading="lazy" :alt="`Emoji_${item.item}`"
               :src="`https://imagehost.mintimate.cn/svgEmoji/emoji_u${item.item.split('-')
                        .filter((x) => x !== 'fe0f')
                        .map((x) => x.padStart(4, '0')) // Handle ©️ and ®️
                        .join('_')}.svg`"
               :class="!ignoreDisable && item.disabled ? 'opacity-30 cursor-not-allowed':'cursor-pointer hover:scale-150 transition-transform duration-150 ease-in-out'"
               class="w-8 rounded-lg hover:ring-2 hover:ring-blue-200 hover:bg-amber-50/10 cursor-pointer
                            hover:scale-150 transition-transform duration-150 ease-in-out"/>

        </figure>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>