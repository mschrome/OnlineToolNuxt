<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          复杂密码生成器
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          生成安全可靠的复杂密码，保护您的账户安全
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/30 mb-8 hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
        <!-- 配置区域 -->
        <div class="mb-8">
          <div class="flex items-center text-xl font-semibold text-slate-800 dark:text-white mb-6">
            <UIcon name="i-heroicons-cog-6-tooth" class="mr-2 text-blue-500" />
            <span>密码配置</span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <!-- 密码长度选择 -->
            <div class="flex flex-col">
              <div class="flex items-center font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm">
                <UIcon name="i-heroicons-adjustments-horizontal" class="mr-2" />
                密码长度
              </div>
              <USelect
                v-model="passwordLength"
                :items="passwordLengthOptions"
                size="lg"
                class="w-full"
              />
            </div>

            <!-- 字符类型选择 -->
            <div class="lg:col-span-2">
              <div class="flex items-center font-semibold text-slate-700 dark:text-slate-300 mb-4 text-sm">
                <UIcon name="i-heroicons-squares-2x2" class="mr-2" />
                字符类型选择
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  class="bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 rounded-xl p-4 cursor-pointer select-none transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:-translate-y-0.5 active:translate-y-0"
                  @click="toggleCheckbox('number')"
                >
                  <UCheckbox
                    v-model="passwordElement.number"
                    label="数字 (0-9)"
                  />
                  <div class="font-mono text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">123456</div>
                </div>
                <div 
                  class="bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 rounded-xl p-4 cursor-pointer select-none transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:-translate-y-0.5 active:translate-y-0"
                  @click="toggleCheckbox('lowercase')"
                >
                  <UCheckbox
                    v-model="passwordElement.lowercase"
                    label="小写字母 (a-z)"
                  />
                  <div class="font-mono text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">abcdef</div>
                </div>
                <div 
                  class="bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 rounded-xl p-4 cursor-pointer select-none transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:-translate-y-0.5 active:translate-y-0"
                  @click="toggleCheckbox('uppercase')"
                >
                  <UCheckbox
                    v-model="passwordElement.uppercase"
                    label="大写字母 (A-Z)"
                  />
                  <div class="font-mono text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">ABCDEF</div>
                </div>
                <div 
                  class="bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 rounded-xl p-4 cursor-pointer select-none transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:-translate-y-0.5 active:translate-y-0"
                  @click="toggleCheckbox('special')"
                >
                  <UCheckbox
                    v-model="passwordElement.special"
                    label="特殊字符"
                  />
                  <div class="font-mono text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">!@#$%^</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 生成按钮 -->
          <div class="text-center">
            <UButton
              @click="getNewComplexPassword()"
              :disabled="!canGenerate"
              size="xl"
              class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-semibold text-lg px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              block
            >
              <template #leading>
                <UIcon name="i-heroicons-sparkles" />
              </template>
              生成强密码
            </UButton>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-3">
              密码在本地生成，不会上传到服务器
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
            <UIcon name="i-heroicons-key" class="mr-2 text-green-500" />
            <span>生成的密码</span>
          </div>

          <!-- 密码显示区域 -->
          <div class="mb-6">
            <div class="flex items-center bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-2xl p-5 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30 transition-all duration-200">
              <div class="flex-1 font-mono text-xl font-semibold text-slate-800 dark:text-white tracking-wide break-all transition-all duration-300" :class="{ 'blur-sm select-none': !showPassword }">
                {{ complexPassword }}
              </div>
              <div class="flex gap-2 ml-4">
                <UButton
                  @click="togglePasswordVisibility"
                  :disabled="!isPasswordGenerated"
                  variant="ghost"
                  size="sm"
                  square
                  class="hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  <UIcon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" />
                </UButton>
                <UButton
                  @click="copyComplexPassword"
                  :disabled="!isPasswordGenerated"
                  variant="ghost"
                  size="sm"
                  square
                  class="hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  <UIcon name="i-heroicons-clipboard-document" />
                </UButton>
                <UButton
                  @click="getNewComplexPassword"
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

          <!-- 密码强度指示器 -->
          <div v-if="isPasswordGenerated" class="bg-slate-50 dark:bg-slate-700 rounded-xl p-5 border border-slate-200 dark:border-slate-600">
            <div class="flex justify-between items-center mb-3">
              <span class="font-semibold text-slate-700 dark:text-slate-300">密码强度</span>
              <div class="flex items-center gap-1">
                <UIcon
                  v-for="n in 5"
                  :key="n"
                  name="i-heroicons-star-solid"
                  :class="n <= scoreForPassword ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'"
                />
                <span class="ml-2 font-semibold text-sm">{{ strengthText }}</span>
              </div>
            </div>
            <div class="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 mb-3 overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-500 ease-out" 
                :style="{ width: strengthPercentage + '%' }" 
                :class="strengthColorClass"
              ></div>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-400 m-0">{{ infoTip }}</p>
          </div>
        </div>
      </div>

      <!-- 信息卡片区域 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-slate-700/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-shield-check" class="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
          <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">本地生成</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            所有密码生成过程完全在本地进行，不会上传到服务器，确保您的隐私安全。
          </p>
        </div>

        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-slate-700/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-cpu-chip" class="text-2xl text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">高强度算法</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            使用加密安全的随机数生成器，确保生成的密码具有足够的随机性和复杂度。
          </p>
        </div>

        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-slate-700/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-light-bulb" class="text-2xl text-purple-600 dark:text-purple-400" />
          </div>
          <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">安全建议</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            建议密码长度至少16位，包含多种字符类型，定期更换密码，不要重复使用。
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
import { computed, reactive, ref } from 'vue';
import { getPWD } from '~/utils/ComplexPassword.js';
import { checkPWD, getScorePWD } from '~/utils/CheckComplexPassword.js';

const toast = useToast();

useHead({
  title: '复杂密码生成器-在线工具箱',
  meta: [
    {
      name: 'description',
      content: '纯前端生成强密码，分分钟编出一个没有逻辑的强密码，防止隐私泄漏',
    },
    {
      name: 'keywords',
      content: '在线工具箱,强密码,强密码生成,密码生成,复杂密码',
    },
  ],
});

// 响应式数据
const complexPassword = ref('点击生成按钮创建安全密码');
const passwordLength = ref(16);
const showPassword = ref(true);

const passwordElement = reactive({
  number: true,
  lowercase: true,
  uppercase: true,
  special: true,
});

const infoTip = ref('');

// 密码长度选项
const passwordLengthOptions = [
  { label: '8位密码', value: 8 },
  { label: '16位密码 (推荐)', value: 16 },
  { label: '32位密码', value: 32 },
  { label: '64位密码', value: 64 },
];

// 计算属性
const canGenerate = computed(() => {
  return Object.values(passwordElement).some(value => value);
});

const isPasswordGenerated = computed(() => {
  return complexPassword.value !== '点击生成按钮创建安全密码';
});

const scoreForPassword = computed(() => {
  return isPasswordGenerated.value ? getScorePWD(complexPassword.value) : 0;
});

const strengthText = computed(() => {
  const score = scoreForPassword.value;
  if (score <= 1) return '很弱';
  if (score <= 2) return '弱';
  if (score <= 3) return '中等';
  if (score <= 4) return '强';
  return '很强';
});

const strengthPercentage = computed(() => {
  return (scoreForPassword.value / 5) * 100;
});

const strengthColorClass = computed(() => {
  const score = scoreForPassword.value;
  if (score <= 1) return 'bg-red-500';
  if (score <= 2) return 'bg-orange-500';
  if (score <= 3) return 'bg-yellow-500';
  if (score <= 4) return 'bg-blue-500';
  return 'bg-green-500';
});

// 方法
const toggleCheckbox = (type) => {
  passwordElement[type] = !passwordElement[type];
};

const getNewComplexPassword = () => {
  if (!canGenerate.value) {
    toast.add({
      title: '配置错误',
      description: '请至少选择一种字符类型',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'orange',
      timeout: 3000,
    });
    return;
  }

  complexPassword.value = getPWD(
    passwordLength.value,
    passwordElement.number,
    passwordElement.lowercase,
    passwordElement.uppercase,
    passwordElement.special,
  );
  
  infoTip.value = checkPWD(complexPassword.value);
  
  toast.add({
    title: '密码生成成功',
    description: '新密码已生成，请妥善保管',
    icon: 'i-heroicons-check-circle',
    color: 'green',
    timeout: 3000,
  });
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const copyComplexPassword = () => {
  const text = complexPassword.value;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.add({
        title: '复制成功',
        description: '密码已复制到剪贴板',
        icon: 'i-heroicons-clipboard-document-check',
        color: 'green',
        timeout: 3000,
      });
    })
    .catch(() => {
      toast.add({
        title: '复制失败',
        description: '请手动复制密码',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'red',
        timeout: 5000,
      });
    });
};

// 初始化时生成一个密码
onMounted(() => {
  getNewComplexPassword();
});
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