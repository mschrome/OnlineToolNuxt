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
            <div class="info-card ad-card">
              <div class="wwads-cn wwads-horizontal" data-id="264"></div>
            </div>
          </slot>
        </template>
        <template v-else>
          <slot :item="item">
            <div class="info-card" :class="getItemClass(index)">
              <div class="card-header">
                <img :src="item.imageSrc" :alt="item.imageAlt"
                     :class="isItemInArray('no-round',item.imageStyle) ? '' : 'rounded-full'"
                     class="card-avatar" loading="lazy" decoding="async">
                <div class="card-info">
                  <h3 class="card-title">
                    <a :href="item.href" target="_blank" class="card-link">
                      {{ item.title }}
                    </a>
                  </h3>
                  <p class="card-subtitle">{{ item.subTitle }}</p>
                </div>
              </div>
              <p class="card-description">{{ item.description }}</p>
            </div>
          </slot>
        </template>
      </li>
    </ul>
    <slot name="end"></slot>
  </div>
</template>

<style scoped>
/* 信息卡片 */
.info-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.info-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
  border-color: rgba(147, 51, 234, 0.3);
}

.dark .info-card {
  background: rgb(30, 41, 59);
  border-color: rgba(71, 85, 105, 0.5);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.dark .info-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
  border-color: rgba(147, 51, 234, 0.5);
}

/* 广告卡片 */
.ad-card {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1));
  border: 1px solid rgba(147, 51, 234, 0.2);
}

.dark .ad-card {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2));
  border-color: rgba(147, 51, 234, 0.3);
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* 头像 */
.card-avatar {
  width: 3.5rem;
  height: 3.5rem;
  object-fit: cover;
  border: 2px solid rgba(226, 232, 240, 0.5);
  transition: all 0.3s ease;
}

.info-card:hover .card-avatar {
  border-color: rgba(147, 51, 234, 0.5);
  transform: scale(1.05);
}

.dark .card-avatar {
  border-color: rgba(71, 85, 105, 0.5);
}

/* 卡片信息 */
.card-info {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin: 0;
  line-height: 1.4;
}

.dark .card-title {
  color: white;
}

.card-link {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.card-link:hover {
  color: rgb(147, 51, 234);
}

.card-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153));
  transition: width 0.3s ease;
}

.card-link:hover::after {
  width: 100%;
}

.dark .card-link:hover {
  color: rgb(196, 181, 253);
}

.card-subtitle {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  margin: 0.25rem 0 0 0;
  line-height: 1.4;
}

.dark .card-subtitle {
  color: rgb(148, 163, 184);
}

/* 卡片描述 */
.card-description {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  line-height: 1.6;
  margin: 0;
}

.dark .card-description {
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

.info-card {
  animation: fadeInUp 0.6s ease-out;
}

/* 为不同列添加延迟 */
.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }
.info-card:nth-child(4) { animation-delay: 0.4s; }
.info-card:nth-child(5) { animation-delay: 0.5s; }

/* 响应式设计 */
@media (max-width: 768px) {
  .info-card {
    padding: 1.25rem;
  }
  
  .card-avatar {
    width: 3rem;
    height: 3rem;
  }
  
  .card-title {
    font-size: 1rem;
  }
}
</style>