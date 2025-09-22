<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          随机数生成器
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          在线生成范围内的随机数，支持唯一和重复模式
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/30 mb-8 hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
        <!-- 配置区域 -->
        <div class="mb-8">
          <div class="flex items-center text-xl font-semibold text-slate-800 dark:text-white mb-6">
            <UIcon name="i-heroicons-cog-6-tooth" class="mr-2 text-green-500" />
            <span>随机数配置</span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- 生成个数 -->
            <div class="flex flex-col">
              <div class="flex items-center font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm">
                <UIcon name="i-heroicons-list-bullet" class="mr-2" />
                生成个数
              </div>
              <UInput
                v-model="totalNum"
                placeholder="请输入生成个数"
                type="number"
                size="lg"
                class="w-full"
              />
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">设置要生成的随机数数量</p>
            </div>

            <!-- 生成模式 -->
            <div class="flex flex-col">
              <div class="flex items-center font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm">
                <UIcon name="i-heroicons-adjustments-horizontal" class="mr-2" />
                生成模式
              </div>
              <USelect
                v-model="genMode"
                :items="[
                  { label: '唯一(不重复)', value: 'only' },
                  { label: '随意(可重复)', value: 'random' },
                ]"
                size="lg"
                class="w-full"
              />
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">选择是否允许重复数字</p>
            </div>

            <!-- 最小值 -->
            <div class="flex flex-col">
              <div class="flex items-center font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm">
                <UIcon name="i-heroicons-minus-circle" class="mr-2" />
                最小值
              </div>
              <UInput
                v-model="minNum"
                placeholder="请输入最小值"
                type="number"
                size="lg"
                class="w-full"
              />
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">设置随机数的最小值</p>
            </div>

            <!-- 最大值 -->
            <div class="flex flex-col">
              <div class="flex items-center font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm">
                <UIcon name="i-heroicons-plus-circle" class="mr-2" />
                最大值
              </div>
              <UInput
                v-model="maxNum"
                placeholder="请输入最大值"
                type="number"
                size="lg"
                class="w-full"
              />
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">设置随机数的最大值</p>
            </div>
          </div>

          <!-- 生成按钮 -->
          <div class="text-center">
            <UButton
              @click="ListNotRepeat"
              :disabled="!canGenerate"
              size="xl"
              class="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 font-semibold text-lg px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              block
            >
              <template #leading>
                <UIcon name="i-heroicons-sparkles" />
              </template>
              生成随机数
            </UButton>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-3">
              随机数在本地生成，确保数据安全
            </p>
          </div>
        </div>

        <!-- 分隔线 -->
        <div class="flex justify-center items-center my-8 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-300 dark:border-slate-600"></div>
          </div>
          <div class="relative bg-slate-50 dark:bg-slate-700 p-2 rounded-full border-2 border-slate-200 dark:border-slate-600">
            <UIcon name="i-heroicons-arrow-down" class="text-slate-500 dark:text-slate-400" />
          </div>
        </div>

        <!-- 结果展示区域 -->
        <div class="mt-8">
          <div class="flex items-center text-xl font-semibold text-slate-800 dark:text-white mb-6">
            <UIcon name="i-heroicons-calculator" class="mr-2 text-blue-500" />
            <span>生成结果</span>
          </div>

          <!-- 随机数显示区域 -->
          <div class="mb-6">
            <div class="flex items-center bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-2xl p-5 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-100 dark:focus-within:ring-green-900/30 transition-all duration-200">
              <div class="flex-1 font-mono text-xl font-semibold text-slate-800 dark:text-white tracking-wide break-all transition-all duration-300">
                {{ randomOutPut }}
              </div>
              <div class="flex gap-2 ml-4">
                <UButton
                  @click="copyOutPutRandom"
                  :disabled="!isResultGenerated"
                  variant="ghost"
                  size="sm"
                  square
                  class="hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  <UIcon name="i-heroicons-clipboard-document" />
                </UButton>
                <UButton
                  @click="ListNotRepeat"
                  :disabled="!canGenerate"
                  variant="ghost"
                  size="sm"
                  square
                  class="hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  <UIcon name="i-heroicons-arrow-path" />
                </UButton>
              </div>
            </div>
          </div>

          <!-- 结果统计信息 -->
          <div v-if="isResultGenerated && resultStats" class="bg-slate-50 dark:bg-slate-700 rounded-xl p-5 border border-slate-200 dark:border-slate-600">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ resultStats.count }}</div>
                <div class="text-sm text-slate-600 dark:text-slate-400">生成数量</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ resultStats.min }}</div>
                <div class="text-sm text-slate-600 dark:text-slate-400">最小值</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ resultStats.max }}</div>
                <div class="text-sm text-slate-600 dark:text-slate-400">最大值</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ resultStats.avg }}</div>
                <div class="text-sm text-slate-600 dark:text-slate-400">平均值</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 信息卡片区域 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-slate-700/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-shield-check" class="text-2xl text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">本地生成</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            所有随机数生成过程完全在本地进行，不会上传到服务器，确保您的数据安全。
          </p>
        </div>

        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-slate-700/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-cpu-chip" class="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
          <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">高质量算法</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            使用高质量的随机数生成算法，确保生成的数字具有良好的随机性和分布。
          </p>
        </div>

        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-slate-700/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-light-bulb" class="text-2xl text-purple-600 dark:text-purple-400" />
          </div>
          <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">使用建议</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            唯一模式适合抽奖、分组等场景，随意模式适合模拟、测试等需要重复数字的场景。
          </p>
        </div>
      </div>

      <!-- 广告位 -->
      <div class="text-center">
        <div class="inline-block bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 dark:border-slate-700/30">
          <div class="wwads-cn wwads-horizontal" data-id="264"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { getListNotRepeat, getListEnableRepeat } from '~/utils/randomNumList';

const toast = useToast();

useHead({
  title: '范围随机数生成-在线工具箱',
  meta: [
    {
      name: 'description',
      content: '在线生成范围内的随机数，随机生成范围内多个随机数。',
    },
    {
      name: 'keywords',
      content: '在线工具箱,范围随机数生成,随机数生成,随机数,随机数生成',
    },
  ],
});

// 响应式数据
const randomOutPut = ref('点击生成按钮创建随机数');
const minNum = ref(1);
const maxNum = ref(100);
const totalNum = ref(10);
const genMode = ref('only');

// 计算属性
const canGenerate = computed(() => {
  return totalNum.value > 0 && minNum.value !== null && maxNum.value !== null;
});

const isResultGenerated = computed(() => {
  return randomOutPut.value !== '点击生成按钮创建随机数' && 
         !randomOutPut.value.includes('错了嗷～') &&
         !randomOutPut.value.includes('等待用户操作');
});

const resultStats = computed(() => {
  if (!isResultGenerated.value) return null;
  
  try {
    // 尝试解析结果中的数字
    const numbers = randomOutPut.value.split(/[,，\s]+/)
      .map(str => str.trim())
      .filter(str => str && !isNaN(str))
      .map(str => parseFloat(str));
    
    if (numbers.length === 0) return null;
    
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const avg = Math.round((numbers.reduce((sum, num) => sum + num, 0) / numbers.length) * 100) / 100;
    
    return {
      count: numbers.length,
      min,
      max,
      avg
    };
  } catch (error) {
    return null;
  }
});

// 方法
function ListNotRepeat() {
  if (totalNum.value <= 0) {
    toast.add({
      title: '参数错误',
      description: '生成的总个数必须大于零',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'orange',
      timeout: 3000,
    });
    return;
  }

  if (minNum.value === null || maxNum.value === null) {
    toast.add({
      title: '参数错误',
      description: '请输入有效的最小值和最大值',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'orange',
      timeout: 3000,
    });
    return;
  }

  if (genMode.value === 'only') {
    if (maxNum.value - minNum.value + 1 < totalNum.value) {
      randomOutPut.value = '错了嗷～范围内没这么多数字啦！请调整范围或减少生成个数。';
      toast.add({
        title: '范围不足',
        description: '唯一模式下，范围内的数字数量不足',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'orange',
        timeout: 5000,
      });
    } else if (maxNum.value < minNum.value) {
      randomOutPut.value = '错了嗷～最大值不应该小于最小值！';
      toast.add({
        title: '参数错误',
        description: '最大值必须大于等于最小值',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'orange',
        timeout: 3000,
      });
    } else {
      const numbers = getListNotRepeat(minNum.value, maxNum.value, totalNum.value);
      randomOutPut.value = numbers;
      toast.add({
        title: '生成成功',
        description: `已生成 ${totalNum.value} 个不重复的随机数`,
        icon: 'i-heroicons-check-circle',
        color: 'green',
        timeout: 3000,
      });
    }
  } else {
    if (maxNum.value < minNum.value) {
      randomOutPut.value = '错了嗷～最大值不应该小于最小值！';
      toast.add({
        title: '参数错误',
        description: '最大值必须大于等于最小值',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'orange',
        timeout: 3000,
      });
    } else {
      const numbers = getListEnableRepeat(minNum.value, maxNum.value, totalNum.value);
      randomOutPut.value = numbers;
      toast.add({
        title: '生成成功',
        description: `已生成 ${totalNum.value} 个随机数（允许重复）`,
        icon: 'i-heroicons-check-circle',
        color: 'green',
        timeout: 3000,
      });
    }
  }
}

/** 点击复制输出结果 */
const copyOutPutRandom = () => {
  const text = randomOutPut.value;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.add({
        title: '复制成功',
        description: '随机数已复制到剪贴板',
        icon: 'i-heroicons-clipboard-document-check',
        color: 'green',
        timeout: 3000,
      });
    })
    .catch(() => {
      toast.add({
        title: '复制失败',
        description: '请手动复制随机数',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'red',
        timeout: 5000,
      });
    });
};
</script>

<style scoped>
/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
</style>
