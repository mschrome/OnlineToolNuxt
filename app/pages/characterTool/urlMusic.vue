<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          乐谱长链生成器
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          将 URL 转换为音乐符号编码的神奇工具
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="tool-card">
        <!-- 输入区域 -->
        <div class="input-section">
          <div class="input-header">
            <div class="input-title">
              <UIcon name="i-heroicons-link" class="mr-2" />
              原始链接
            </div>
            <div class="char-count">{{ originUrl.length }} 字符</div>
          </div>
          <div class="input-container">
            <UInput
              v-model="originUrl"
              placeholder="请输入需要转换的 URL 地址 (http/https)"
              size="xl"
              class="w-full"
            >
              <template #leading>
                <UIcon name="i-heroicons-globe-alt" class="text-slate-400" />
              </template>
            </UInput>
          </div>
        </div>

        <!-- 转换箭头 -->
        <div class="arrow-container">
          <div class="arrow-icon">
            <UIcon name="i-heroicons-musical-note" class="text-2xl" />
          </div>
        </div>

        <!-- 输出区域 -->
        <div class="output-section">
          <div class="output-header">
            <div class="output-title">
              <UIcon name="i-heroicons-musical-note" class="mr-2" />
              乐谱链接
            </div>
            <div class="char-count">{{ generateUrl.length }} 字符</div>
          </div>
          <div class="output-container">
            <UTextarea
              v-model="generateUrl"
              placeholder="生成的乐谱链接将显示在这里..."
              :rows="4"
              readonly
              class="w-full"
              resize
            />
          </div>
        </div>

        <!-- 操作按钮区域 -->
        <div class="action-section">
          <UButton
            @click="handleToMakeLongUrl"
            :disabled="!originUrl.trim()"
            class="primary-button"
            size="lg"
          >
            <UIcon name="i-heroicons-sparkles" class="mr-2" />
            生成乐谱链接
          </UButton>

          <UButton
            @click="copyTheOutPutText"
            :disabled="!generateUrl || generateUrl === '……等待用户操作……'"
            variant="outline"
            size="lg"
            class="secondary-button"
          >
            <UIcon name="i-heroicons-clipboard-document" class="mr-2" />
            复制结果
          </UButton>

          <UButton
            @click="clearInputs"
            :disabled="!originUrl && generateUrl === '……等待用户操作……'"
            variant="outline"
            size="lg"
            color="red"
            class="danger-button"
          >
            <UIcon name="i-heroicons-trash" class="mr-2" />
            清空内容
          </UButton>
        </div>
      </div>

      <!-- 信息卡片 -->
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon about-icon">
            <UIcon name="i-heroicons-information-circle" />
          </div>
          <div class="info-content">
            <h3 class="info-title">什么是乐谱链接？</h3>
            <p class="info-description">
              乐谱链接是将普通 URL 转换为音乐符号（♫♪♬¶）编码的有趣工具。通过 UTF-8 编码和四进制转换，让链接变成美妙的"乐谱"。
            </p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon usage-icon">
            <UIcon name="i-heroicons-light-bulb" />
          </div>
          <div class="info-content">
            <h3 class="info-title">使用场景</h3>
            <ul class="info-list">
              <li>创意链接分享</li>
              <li>趣味编码展示</li>
              <li>音乐主题装饰</li>
              <li>技术原理学习</li>
            </ul>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon security-icon">
            <UIcon name="i-heroicons-musical-note" />
          </div>
          <div class="info-content">
            <h3 class="info-title">编码原理</h3>
            <p class="info-description">
              将 URL 转换为 UTF-8 字节数组，再转换为四进制数字，最后映射到四种音乐符号：♫♪♬¶，创造独特的视觉效果。
            </p>
          </div>
        </div>
      </div>

      <!-- 广告区域 -->
      <div class="ad-section">
        <div class="ad-container">
          <div class="wwads-cn wwads-horizontal" data-id="264"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { toUTF8Array } from "~/utils/longUrlMake";

const toast = useToast();

useHead({
  title: '乐谱长链生成器-在线工具箱',
  meta: [
    {
      name: 'description',
      content: '对给定的超链接/URL，进行编码，生成长链接。没什么特殊意义，但是有趣~ 快来编写你的乐章吧~',
    },
    {
      name: 'keywords',
      content: '在线工具箱,长链接生成,链接转乐谱,超链接转乐谱',
    },
  ],
});

let originUrl = ref("");
let generateUrl = ref("……等待用户操作……");

const handleToMakeLongUrl = () => {
  if (!originUrl.value.trim()) {
    toast.add({
      id: 'url-empty',
      title: '输入为空',
      description: '请输入需要转换的 URL 地址',
      icon: 'i-heroicons-exclamation-triangle',
      timeout: 3000,
    });
    return;
  }

  try {
    new URL(originUrl.value);
  } catch (e) {
    let oldValue = originUrl.value;
    originUrl.value = "Invalid URL! Ops!!";
    let times = 0;
    toast.add({
      id: 'url-invalid',
      title: '乐谱编写失败',
      description: '所填写的并不是有效的 URL 地址',
      icon: 'i-heroicons-face-frown-20-solid',
      timeout: 5000,
    });
    let i = setInterval(async () => {
      if (++times == 6) {
        clearInterval(i);
        originUrl.value = oldValue;
      }
    }, 150);
    return;
  }

  const enc = ["♫", "♪", "♬", "¶"];
  // 获取utf8数组
  let UTF8Array = toUTF8Array(originUrl.value)
    // 转换为base 4字符串
    // padstart非常重要！否则会丢失前导0
    .map(n => n.toString(4).padStart(4, "0"))
    // 转换为字符数组
    .join("").split("")
    // 映射到音乐符号
    .map(x => enc[parseInt(x)])
    // 连接成单个字符串
    .join("");

  toast.add({
    id: 'generate-success',
    title: '乐谱编写成功',
    description: '快去用生成的乐谱进行奏乐吧',
    icon: 'i-heroicons-face-smile-20-solid',
    timeout: 3000,
  });

  // 获取当前 host 并拼接到 url 中
  const host = window.location.host;
  generateUrl.value = host + "/musicUrl/" + UTF8Array;
};

const copyTheOutPutText = () => {
  const text = generateUrl.value;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.add({
        id: 'copy-success',
        title: '复制成功',
        description: '乐谱链接已复制到剪贴板',
        icon: 'i-heroicons-face-smile-20-solid',
        timeout: 3000,
      });
    })
    .catch(() => {
      toast.add({
        id: 'copy-error',
        title: '复制失败',
        description: '请手动复制内容',
        icon: 'i-heroicons-face-frown-20-solid',
        timeout: 3000,
      });
    });
};

const clearInputs = () => {
  originUrl.value = "";
  generateUrl.value = "……等待用户操作……";
  toast.add({
    id: 'clear-success',
    title: '内容已清空',
    description: '可以开始新的乐谱创作了',
    icon: 'i-heroicons-trash',
    timeout: 2000,
  });
};
</script>

<style scoped>
/* 主工具卡片 */
.tool-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.tool-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.dark {
  .tool-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}

/* 输入输出区域 */
.input-section, .output-section {
  margin-bottom: 2rem;
}

.input-header, .output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.input-title, .output-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(30, 41, 59);
}

.dark {
  .input-title, .output-title {
    color: white;
  }
}

.char-count {
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
  background: rgb(248, 250, 252);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

.dark {
  .char-count {
    color: rgb(148, 163, 184);
    background: rgb(51, 65, 85);
  }
}

.input-container, .output-container {
  width: 100%;
}

/* 转换箭头 */
.arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
}

.arrow-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
}

.arrow-icon:hover {
  transform: scale(1.1) rotate(10deg);
}

/* 操作按钮区域 */
.action-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .action-section {
    border-top-color: rgba(71, 85, 105, 0.5);
  }
}

@media (max-width: 640px) {
  .action-section {
    flex-direction: column;
  }
}

/* 信息卡片网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  transition: all 0.3s ease;
}

.info-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.dark {
  .info-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.info-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.about-icon {
  background: linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153));
}

.usage-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
}

.security-icon {
  background: linear-gradient(to right, rgb(249, 115, 22), rgb(239, 68, 68));
}

.info-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.75rem;
}

.dark {
  .info-title {
    color: white;
  }
}

.info-description {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  line-height: 1.625;
}

.dark {
  .info-description {
    color: rgb(148, 163, 184);
  }
}

.info-list {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  list-style: none;
  padding: 0;
}

.info-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.info-list li::before {
  content: '♪';
  position: absolute;
  left: 0;
  color: rgb(147, 51, 234);
  font-weight: bold;
}

.dark {
  .info-list {
    color: rgb(148, 163, 184);
  }
}

/* 广告区域 */
.ad-section {
  text-align: center;
}

.ad-container {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .ad-container {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
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

.tool-card, .info-card {
  animation: fadeInUp 0.6s ease-out;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }

/* 音乐主题动画 */
@keyframes musicNote {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.arrow-icon {
  animation: musicNote 2s ease-in-out infinite;
}
</style>