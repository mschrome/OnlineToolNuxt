<script setup>
let colorMode;
colorMode = useColorMode();

// 定义一个参数，记录isDark可能存在的值和对应图标
const items = [
  [{
    label: '跟随系统',
    icon: 'i-heroicons-cog-20-solid',
    onSelect: () => {
      isDark.value = 'system'
    },
  },
    {
      label: '亮色模式',
      icon: 'i-heroicons-sun-20-solid',
      onSelect: () => {
        isDark.value = 'light'
      }
    },
    {
      label: '暗色模式',
      icon: 'i-heroicons-moon-20-solid',
      onSelect: () => {
        isDark.value = 'dark'
      }
    },
  ]
]

const isDark = computed({
  get() {
    if (colorMode.preference === 'system') {
      return 'system';
    } else if (colorMode.preference === 'dark') {
      return 'dark';
    } else {
      return 'light';
    }
  },
  set(newValue) {
    console.log('newValue', newValue);
    colorMode.preference = newValue === 'dark' ? 'dark' : (newValue === 'system' ? 'system' : 'light');
  },
});

</script>

<template>
  <ClientOnly>
    <UDropdownMenu :items="items" mode="hover" :popper="{ placement: 'bottom-start' }"
               :ui="{ item: { base: 'group flex items-center w-full gap-2'} }">
      <UButton
          :icon="
                isDark === 'system' ?
                'i-heroicons-cog-20-solid' : isDark === 'dark' ?
                'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
          color="gray"
          variant="ghost"
          aria-label="Theme"
      />
    </UDropdownMenu>
    <template #fallback>
      <div
          class="w-8 h-8 focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center">
        <span class="i-heroicons-cog-20-solid h-5 w-5"></span>
      </div>
    </template>
  </ClientOnly>
</template>