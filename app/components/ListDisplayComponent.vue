<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  enableEnd: {
    type: Boolean,
    default:false
  }
});

// 使用computed计算出不同组片段
const moreInfoWebGroups = computed(() => {
  const len = props.list.length
  const groupSize = Math.ceil(len / 3)
  let GroupA = props.list.slice(0, groupSize);
  let GroupB = props.list.slice(groupSize, groupSize + Math.ceil((len - groupSize) / 2));
  let GroupC = props.list.slice(groupSize + Math.ceil((len - groupSize) / 2));

  if (props.enableEnd){
    let shortest = GroupA;
    if(GroupB.length < GroupA.length) {
      shortest = GroupB;
    }
    if(GroupC.length < shortest.length) {
      shortest = GroupC;
    }
    // 在最短的Array后面添加元素
    let newElement = {"EndTag":true};
    shortest.push(newElement);
  }

  return [{
    name: "GroupA",
    items: GroupA,
  },
    {
      name: "GroupB",
      items: GroupB,
    },
    {
      name: "groupC",
      items: GroupC
    }
  ]
})

const isItemInArray = (element, array) => {
  if (!array) {
    return false;
  }
  return array.includes(element);
}

const getItemClass = (index) => {
  if ((index + 1) % 3 === 2) {
    return 'md:text-center';
  } else if ((index + 1) % 3 === 0) {
    return 'md:text-right';
  } else {
    return 'md-text-left';
  }
}
</script>

<template>
  <div class="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-1 lg:grid-cols-3">
    <ul class="space-y-8" v-for="(group,index) in moreInfoWebGroups" :key="group.name">
      <li class="text-sm leading-6" v-for="item in group.items">
        <template v-if="item.EndTag && enableEnd">
          <slot name="first">
            <figure class="relative flex flex-col-reverse bg-slate-50 rounded-lg dark:bg-slate-800 dark:highlight-white/5 text-center md:text-left">
              <figcaption>
                <div class="wwads-cn wwads-horizontal" data-id="264"></div>
              </figcaption>
            </figure>
          </slot>
        </template>
        <template v-else>
          <slot :item="item">
            <figure
                :class="getItemClass(index)"
                class="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5 text-center md:text-left">
              <blockquote class="mt-6 text-slate-700 dark:text-slate-300">
                <p>{{ item.description }}</p>
              </blockquote>
              <figcaption class="flex items-center space-x-4">
                <img :src="item.imageSrc" :alt="item.imageAlt"
                     :class="isItemInArray('no-round',item.imageStyle) ? 'rounded-full' : ''"
                     class="flex-none w-14 h-14 object-cover" loading="lazy" decoding="async">
                <div class="flex-auto">
                  <div class="text-base text-slate-900 font-semibold dark:text-slate-300">
                    <a :href="item.href" tabindex="0">
                      <span class="absolute inset-0"></span>{{ item.title }}
                    </a></div>
                  <div class="mt-0.5">
                    {{ item.subTitle }}
                  </div>
                </div>
              </figcaption>
            </figure>
          </slot>
        </template>
      </li>
    </ul>
    <slot name="end"></slot>
  </div>
</template>

<style scoped>

</style>