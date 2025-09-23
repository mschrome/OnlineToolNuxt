<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          图片压缩/转码
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          高效的图片格式转换和压缩工具
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="tool-card">
        <!-- 配置选项区域 -->
        <div class="config-section">
          <div class="config-grid">
            <div class="config-item">
              <div class="config-label">
                <UIcon name="i-heroicons-photo" class="mr-2" />
                图片格式
              </div>
              <USelect
                v-model="uploadData.format"
                placeholder="请选择格式"
                :items="formatOptions"
                option-attribute="name"
                class="config-select"
              />
            </div>

            <div class="config-item">
              <div class="config-label">
                <UIcon name="i-heroicons-adjustments-horizontal" class="mr-2" />
                图片质量
              </div>
              <USelect
                v-model="uploadData.compression"
                placeholder="请选择质量"
                :items="qualityOptions"
                option-attribute="name"
                class="config-select"
              />
            </div>

            <div class="config-item">
              <div class="config-label">
                <UIcon name="i-heroicons-arrows-pointing-out" class="mr-2" />
                尺寸模式
              </div>
              <USelect
                v-model="uploadData.mode"
                placeholder="请选择模式"
                :items="modeOptions"
                option-attribute="name"
                class="config-select"
              />
            </div>

            <div class="config-item">
              <div class="config-label">
                <UIcon name="i-heroicons-cog-6-tooth" class="mr-2" />
                模式详情
              </div>
              <USelect
                v-model="uploadData.modeDetail"
                placeholder="请选择详情"
                :items="modeDetail.data"
                option-attribute="text"
                class="config-select"
              />
            </div>
          </div>
        </div>

        <!-- 文件上传区域 -->
        <div class="upload-section">
          <div class="upload-container">
            <UFileUpload
              v-model="selectedFile"
              :multiple="false"
              accept="image/png,image/jpeg,image/webp,image/bmp"
              class="upload-area"
            >
              <template #default="{ open, removeFile }">
                <div class="upload-content">
                  <!-- 如果没有选择文件，显示上传区域 -->
                  <div v-if="!selectedFile" class="upload-empty" @click="open">
                    <div class="upload-icon">
                      <UIcon name="i-heroicons-cloud-arrow-up" class="text-4xl" />
                    </div>
                    <div class="upload-text">
                      <h3 class="upload-title">点击或拖拽上传图片</h3>
                      <p class="upload-description">支持 PNG、JPG、WEBP、BMP 等格式</p>
                    </div>
                    <div class="upload-warning">
                      <UIcon name="i-heroicons-shield-check" class="mr-2" />
                      本网站不会存储用户信息，请确保网络环境安全
                    </div>
                  </div>

                  <!-- 如果已选择文件，显示预览 -->
                  <div v-else class="file-preview">
                    <div class="preview-header">
                      <div class="preview-title">
                        <UIcon name="i-heroicons-eye" class="mr-2" />
                        文件预览
                      </div>
                      <div class="preview-actions">
                        <UButton
                          @click="open"
                          variant="outline"
                          size="sm"
                          color="blue"
                        >
                          <UIcon name="i-heroicons-arrow-path" class="mr-1" />
                          更换图片
                        </UButton>
                        <UButton
                          @click="removeFile"
                          variant="outline"
                          size="sm"
                          color="red"
                        >
                          <UIcon name="i-heroicons-x-mark" class="mr-1" />
                          移除
                        </UButton>
                      </div>
                    </div>
                    <div class="preview-content">
                      <div class="file-info">
                        <img
                          v-if="previewUrl"
                          :src="previewUrl"
                          alt="预览图片"
                          class="preview-image"
                        />
                        <div class="file-details">
                          <p class="file-name">{{ selectedFile.name }}</p>
                          <p class="file-size">{{ formatFileSize(selectedFile.size) }}</p>
                          <p class="file-type">{{ selectedFile.type }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </UFileUpload>
          </div>
        </div>

        <!-- 操作按钮区域 -->
        <div class="action-section">
          <UButton
            @click="submitImage"
            :disabled="!selectedFile || isProcessing"
            :loading="isProcessing"
            class="primary-button"
            size="lg"
          >
            <UIcon name="i-heroicons-cog-6-tooth" class="mr-2" />
            {{ isProcessing ? '处理中...' : '开始处理图片' }}
          </UButton>
        </div>

        <!-- 处理结果区域 -->
        <div v-if="responseData.data.imageName.length" class="result-section">
          <div class="result-header">
            <div class="result-title">
              <UIcon name="i-heroicons-check-circle" class="mr-2 text-green-500" />
              处理完成
            </div>
          </div>
          
          <div class="result-content">
            <!-- AI 识别标签 -->
            <div v-if="responseData.data.imgType && responseData.data.imgType.length > 0" class="ai-tags">
              <div class="ai-tags-title">
                <UIcon name="i-heroicons-sparkles" class="mr-2" />
                AI 图片识别分类
              </div>
              <div class="tags-container">
                <UBadge
                  v-for="item in responseData.data.imgType"
                  :key="item"
                  :label="item"
                  variant="soft"
                  class="tag-item"
                />
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="result-actions">
              <UButton
                :href="`/api_v1/processIMG/download/${responseData.data.outPutPathName}`"
                target="_blank"
                class="download-button"
                size="lg"
              >
                <UIcon name="i-heroicons-arrow-down-tray" class="mr-2" />
                立即下载
              </UButton>

              <UButton
                @click="delIMG"
                variant="outline"
                color="red"
                size="lg"
                class="delete-button"
              >
                <UIcon name="i-heroicons-trash" class="mr-2" />
                立即删除
              </UButton>
            </div>

            <div class="result-notice">
              <UIcon name="i-heroicons-clock" class="mr-2" />
              服务器保存24小时后，图片将被自动删除
            </div>
          </div>
        </div>
      </div>

      <!-- 信息卡片 -->
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon format-icon">
            <UIcon name="i-heroicons-photo" />
          </div>
          <div class="info-content">
            <h3 class="info-title">支持格式</h3>
            <p class="info-description">
              支持 PNG、JPG、WEBP、BMP 等主流图片格式的相互转换，满足不同场景的使用需求。
            </p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon compress-icon">
            <UIcon name="i-heroicons-arrows-pointing-in" />
          </div>
          <div class="info-content">
            <h3 class="info-title">智能压缩</h3>
            <ul class="info-list">
              <li>等比例缩放保持图片比例</li>
              <li>质量调节平衡文件大小</li>
              <li>缩略图模式快速生成</li>
              <li>AI 识别图片内容分类</li>
            </ul>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon security-icon">
            <UIcon name="i-heroicons-shield-check" />
          </div>
          <div class="info-content">
            <h3 class="info-title">安全保障</h3>
            <p class="info-description">
              所有图片处理均在服务器端完成，24小时后自动删除，确保您的隐私安全。
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
import { get } from '~/utils/request';
import { reactive, ref, watch, computed } from 'vue';

const toast = useToast();

useHead({
  title: '图片压缩转码-在线工具箱',
  meta: [
    {
      name: 'description',
      content: '在线转码图片，PNG转JPG、JPG转WEBP等，支持智能压缩和AI识别',
    },
    {
      name: 'keywords',
      content: '在线工具箱,转码图片,图片转码,WEBP转码,图片压缩',
    },
  ],
});

// 响应式数据
const selectedFile = ref(null);
const previewUrl = ref('');
const isProcessing = ref(false);

// 上传图片的选项
const uploadData = reactive({
  format: 'None',
  compression: '1.0',
  mode: 'scale',
  modeDetail: '1.0',
});

// 图片处理好后的回调
const responseData = reactive({
  data: {
    imageName: '',
    outPutPathName: '',
    imgType: [],
  },
});

const modeDetail = reactive({
  data: [
    { label: '1.0', text: '原图尺寸' },
    { label: '0.75', text: '原图75%' },
    { label: '0.5', text: '原图50%' },
    { label: '0.25', text: '原图25%' },
  ],
});

// 选项配置
const formatOptions = [
  { label: '保持原格式', value: 'None' },
  { label: 'PNG', value: 'PNG' },
  { label: 'JPG', value: 'JPG' },
  { label: 'WEBP', value: 'WEBP' },
  { label: 'BMP', value: 'BMP' },
];

const qualityOptions = [
  { label: '原图质量', value: '1.0' },
  { label: '原图80%', value: '0.8' },
  { label: '原图60%', value: '0.6' },
  { label: '原图40%', value: '0.4' },
  { label: '原图20%', value: '0.2' },
];

const modeOptions = [
  { label: '等比例缩小', value: 'scale' },
  { label: '缩略图输出', value: 'size' },
];

// 监听模式变化
watch(() => uploadData.mode, (newValue) => {
  if (newValue === 'scale') {
    modeDetail.data = [
      { value: '1.0', text: '原图尺寸' },
      { value: '0.75', text: '原图75%' },
      { value: '0.5', text: '原图50%' },
      { value: '0.25', text: '原图25%' },
    ];
  } else {
    modeDetail.data = [
      { value: '1.0', text: '中心100%' },
      { value: '0.75', text: '中心75%' },
      { value: '0.5', text: '中心50%' },
    ];
  }
  uploadData.modeDetail = '1.0';
});

// 监听文件选择
watch(selectedFile, (newFile) => {
  if (newFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target.result;
    };
    reader.readAsDataURL(newFile);
  } else {
    previewUrl.value = '';
  }
});

// 工具函数
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const clearFiles = () => {
  selectedFile.value = null;
  previewUrl.value = '';
};

// 上传方法
const submitImage = async () => {
  if (!selectedFile.value) {
    toast.add({
      id: 'no-file',
      title: '请选择文件',
      description: '请先选择要处理的图片文件',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'orange',
      timeout: 3000,
    });
    return;
  }

  isProcessing.value = true;
  
  try {
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('format', uploadData.format);
    formData.append('compression', uploadData.compression);
    formData.append('mode', uploadData.mode);
    formData.append('modeDetail', uploadData.modeDetail);

    const response = await fetch('/api_v1/processIMG/uploadImage', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    if (result.flag) {
      responseData.data = result.data;
      toast.add({
        id: 'process-success',
        title: '处理成功',
        description: '图片已成功处理完成',
        icon: 'i-heroicons-check-circle',
        color: 'green',
        timeout: 3000,
      });
    } else {
      throw new Error(result.message || '处理失败');
    }
  } catch (error) {
    console.error('图片处理失败:', error);
    toast.add({
      id: 'process-error',
      title: '处理失败',
      description: error.message || '图片处理过程中发生错误',
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 5000,
    });
  } finally {
    isProcessing.value = false;
  }
};

// 删除图片
const delIMG = async () => {
  try {
    const res = await get('/processIMG/delete/' + responseData.data.outPutPathName);
    if (res.data === 'Success') {
      responseData.data.imageName = '';
      responseData.data.outPutPathName = '';
      responseData.data.imgType = [];
      toast.add({
        id: 'delete-success',
        title: '删除成功',
        description: '图片已从服务器删除',
        icon: 'i-heroicons-check-circle',
        color: 'green',
        timeout: 3000,
      });
    } else {
      toast.add({
        id: 'delete-failed',
        title: '删除失败',
        description: '不过文件还是会在24小时后销毁',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'orange',
        timeout: 3000,
      });
    }
  } catch (error) {
    console.error('删除失败:', error);
    toast.add({
      id: 'delete-error',
      title: '删除失败',
      description: '删除过程中发生错误',
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 3000,
    });
  }
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

/* 配置选项区域 */
.config-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .config-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.config-item {
  display: flex;
  flex-direction: column;
}

.config-label {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.dark {
  .config-label {
    color: white;
  }
}

/* 文件上传区域 */
.upload-section {
  margin-bottom: 2.5rem;
}

.upload-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.upload-content {
  border: 2px dashed rgba(59, 130, 246, 0.3);
  border-radius: 1rem;
  background: rgba(59, 130, 246, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
}

.upload-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 12rem;
  cursor: pointer;
  padding: 2rem;
}

.upload-empty:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

.dark {
  .upload-content {
    border-color: rgba(147, 197, 253, 0.3);
    background: rgba(59, 130, 246, 0.1);
  }
  
  .upload-empty:hover {
    border-color: rgba(147, 197, 253, 0.5);
    background: rgba(59, 130, 246, 0.2);
  }
}

.upload-icon {
  color: rgb(59, 130, 246);
  margin-bottom: 1rem;
}

.dark {
  .upload-icon {
    color: rgb(147, 197, 253);
  }
}

.upload-text {
  text-align: center;
  margin-bottom: 1rem;
}

.upload-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.5rem;
}

.dark {
  .upload-title {
    color: white;
  }
}

.upload-description {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
}

.dark {
  .upload-description {
    color: rgb(148, 163, 184);
  }
}

.upload-warning {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
  background: rgba(59, 130, 246, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.dark {
  .upload-warning {
    color: rgb(148, 163, 184);
    background: rgba(59, 130, 246, 0.2);
  }
}

/* 文件预览 */
.file-preview {
  background: rgba(248, 250, 252, 0.8);
  padding: 1.5rem;
}

.dark {
  .file-preview {
    background: rgba(51, 65, 85, 0.8);
  }
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.preview-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(30, 41, 59);
}

.dark {
  .preview-title {
    color: white;
  }
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
}

.preview-content {
  display: flex;
  gap: 1rem;
}

.file-info {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
}

.preview-image {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 0.75rem;
  border: 2px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dark {
  .preview-image {
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.file-name {
  font-weight: 600;
  color: rgb(30, 41, 59);
  font-size: 0.875rem;
  word-break: break-all;
}

.dark {
  .file-name {
    color: white;
  }
}

.file-size, .file-type {
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
}

.dark {
  .file-size, .file-type {
    color: rgb(148, 163, 184);
  }
}

/* 操作按钮区域 */
.action-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

/* 处理结果区域 */
.result-section {
  border-top: 1px solid rgba(226, 232, 240, 0.5);
  padding-top: 2rem;
}

.dark {
  .result-section {
    border-top-color: rgba(71, 85, 105, 0.5);
  }
}

.result-header {
  margin-bottom: 1.5rem;
}

.result-title {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
}

.dark {
  .result-title {
    color: white;
  }
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.ai-tags {
  background: rgba(34, 197, 94, 0.05);
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.dark {
  .ai-tags {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.3);
  }
}

.ai-tags-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgb(34, 197, 94);
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-item {
  background: rgba(34, 197, 94, 0.1);
  color: rgb(34, 197, 94);
}

.result-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

@media (max-width: 640px) {
  .result-actions {
    flex-direction: column;
  }
}

.result-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
  background: rgba(59, 130, 246, 0.05);
  padding: 0.75rem;
  border-radius: 0.5rem;
}

.dark {
  .result-notice {
    color: rgb(148, 163, 184);
    background: rgba(59, 130, 246, 0.1);
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

.format-icon {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.compress-icon {
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
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(34, 197, 94);
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

/* 加载状态 */
.primary-button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .config-grid {
    grid-template-columns: 1fr;
  }
  
  .upload-content {
    min-height: 10rem;
    padding: 1.5rem;
  }
  
  .file-info {
    flex-direction: column;
    text-align: center;
  }
}
</style>
