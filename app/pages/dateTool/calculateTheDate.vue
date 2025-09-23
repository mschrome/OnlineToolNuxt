<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          日期在线计算工具
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          快速计算日期差值、日期加减运算和工作日统计
        </p>
      </div>

      <!-- 主工具卡片 -->
      <div class="tool-card">
        <!-- 日期选择区域 -->
        <div class="date-section">
          <div class="date-header">
            <div class="date-title">
              <UIcon name="i-lucide-calendar" class="mr-2" />
              日期选择
            </div>
          </div>
          
          <div class="date-inputs">
            <div class="date-input-group">
              <label class="date-label">日期范围选择</label>
              <UPopover>
                <UButton 
                  color="neutral" 
                  variant="subtle" 
                  icon="i-lucide-calendar"
                  size="lg"
                  class="date-button"
                >
                  {{ dateRangeLabel }}
                </UButton>
                <template #content>
                  <UCalendar v-model="dateRange" class="p-2" :number-of-months="2" range />
                </template>
              </UPopover>
              <div class="date-hint">
                选择起始和结束日期范围，用于日期差和工作日计算
              </div>
            </div>
            
            <div class="date-input-group">
              <label class="date-label">单个日期</label>
              <UPopover>
                <UButton 
                  color="neutral" 
                  variant="subtle" 
                  icon="i-lucide-calendar"
                  size="lg"
                  class="date-button"
                >
                  {{ singleDateLabel }}
                </UButton>
                <template #content>
                  <UCalendar v-model="singleDate" class="p-2" />
                </template>
              </UPopover>
              <div class="date-hint">
                选择基准日期，用于日期加减计算
              </div>
            </div>
          </div>
        </div>

        <!-- 操作区域 -->
        <div class="operation-section">
          <div class="operation-header">
            <div class="operation-title">
              <UIcon name="i-lucide-calculator" class="mr-2" />
              计算操作
            </div>
          </div>
          
          <div class="operation-grid">
            <!-- 日期加减计算 -->
            <div class="operation-card">
              <div class="operation-card-title">日期加减计算</div>
              <div class="operation-inputs">
                <UInput
                  size="xl"
                  type="number"
                  v-model="addDays"
                  placeholder="输入天数 (支持正负数)"
                  icon="i-lucide-plus-minus"
                  class="days-input"
                />
                <UButton
                  @click="addTheDays()"
                  size="xl"
                  class="calculate-button add-button"
                >
                  <UIcon name="i-lucide-plus" class="mr-2" />
                  计算日期
                </UButton>
              </div>
              <div class="operation-description">
                在起始日期基础上加减指定天数
              </div>
            </div>

            <!-- 日期差计算 -->
            <div class="operation-card">
              <div class="operation-card-title">日期差计算</div>
              <div class="operation-inputs">
                <UButton
                  @click="calculateTheDate()"
                  size="xl"
                  class="calculate-button diff-button"
                  block
                >
                  <UIcon name="i-lucide-calendar-days" class="mr-2" />
                  计算日期差
                </UButton>
              </div>
              <div class="operation-description">
                计算起始日期和结束日期之间的天数差
              </div>
            </div>

            <!-- 工作日计算 -->
            <div class="operation-card">
              <div class="operation-card-title">工作日计算</div>
              <div class="operation-inputs">
                <UButton
                  @click="calculateWorkdays()"
                  size="xl"
                  class="calculate-button workday-button"
                  block
                >
                  <UIcon name="i-lucide-briefcase" class="mr-2" />
                  计算工作日
                </UButton>
              </div>
              <div class="operation-description">
                计算两个日期间的工作日天数（排除周末）
              </div>
            </div>
          </div>
        </div>

        <!-- 结果展示区域 -->
        <div class="result-section">
          <div class="result-header">
            <UIcon name="i-lucide-file-text" class="mr-2" />
            计算结果
          </div>
          
          <div class="result-card">
            <div class="result-content" v-html="dateResult"></div>
          </div>
        </div>
      </div>

      <!-- 功能介绍卡片 -->
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon date-icon">
            <UIcon name="i-lucide-calendar" />
          </div>
          <div class="info-content">
            <h3 class="info-title">日期差计算</h3>
            <p class="info-description">
              精确计算两个日期之间的天数差，支持跨年、跨月计算，结果包含天数、周数、月数和年数。
            </p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon calc-icon">
            <UIcon name="i-heroicons-squares-plus-16-solid" />
          </div>
          <div class="info-content">
            <h3 class="info-title">日期加减</h3>
            <p class="info-description">
              在指定日期基础上加减天数，支持正数（未来日期）和负数（过去日期），快速计算目标日期。
            </p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon work-icon">
            <UIcon name="i-lucide-briefcase" />
          </div>
          <div class="info-content">
            <h3 class="info-title">工作日统计</h3>
            <p class="info-description">
              计算两个日期间的工作日天数，自动排除周末，适用于项目工期计算和工作日统计。
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

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import { DateDifference, addDate } from '~/utils/calculateDateUtil.js';
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';

useHead({
    title: '日期计算-在线工具箱',
    meta: [
        {
            name: 'description',
            content:
                '在线计算两个日期间相隔几天、计算目标日期先后或向前推断几天后的日期',
        },
        {
            name: 'keywords',
            content: '在线工具箱,开发者,几天后的日期,日期相隔几天',
        },
    ],
});

// 日期格式化器
const df = new DateFormatter('zh-CN', {
    dateStyle: 'medium'
});

// 使用 daterange 模式
const dateRange = shallowRef({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 7 })
});

// 单独的起始日期用于日期加减计算
const singleDate = shallowRef(today(getLocalTimeZone()));

// 格式化日期范围显示
const dateRangeLabel = computed(() => {
    if (dateRange.value.start) {
        if (dateRange.value.end) {
            return `${df.format(dateRange.value.start.toDate(getLocalTimeZone()))} - ${df.format(dateRange.value.end.toDate(getLocalTimeZone()))}`;
        } else {
            return df.format(dateRange.value.start.toDate(getLocalTimeZone()));
        }
    }
    return '选择日期范围';
});

// 格式化单个日期显示
const singleDateLabel = computed(() => {
    return singleDate.value ? df.format(singleDate.value.toDate(getLocalTimeZone())) : '选择日期';
});

let dateResult = ref('等待用户操作');
let addDays = ref();

// 将 CalendarDate 转换为 JavaScript Date 用于计算
const calendarDateToJSDate = (calendarDate: CalendarDate | null) => {
    if (!calendarDate) return new Date();
    return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day);
};

const calculateTheDate = () => {
    if (!dateRange.value.start || !dateRange.value.end) {
        dateResult.value = `<div class="result-error">请先选择完整的日期范围</div>`;
        return;
    }
    
    const startJSDate = calendarDateToJSDate(dateRange.value.start);
    const endJSDate = calendarDateToJSDate(dateRange.value.end);
    
    let days = DateDifference(startJSDate, endJSDate);
    if (isNaN(days)) {
        console.warn('日期计算错误，请检查参数');
        dateResult.value = `<div class="result-error">日期计算错误，请检查输入的日期</div>`;
    } else {
        const weeks = Math.floor(Math.abs(days) / 7);
        const months = Math.floor(Math.abs(days) / 30);
        const years = Math.floor(Math.abs(days) / 365);
        
        const startLabel = df.format(dateRange.value.start.toDate(getLocalTimeZone()));
        const endLabel = df.format(dateRange.value.end.toDate(getLocalTimeZone()));
        
        dateResult.value =
            `<div class="result-item">
              <div class="result-label">日期差计算结果</div>
              <div class="result-value">
                从 <span class="date-highlight">${startLabel}</span> 
                到 <span class="date-highlight">${endLabel}</span><br>
                相差：<span class="number-highlight">${Math.abs(days)}</span> 天<br>
                约 <span class="number-highlight">${weeks}</span> 周<br>
                约 <span class="number-highlight">${months}</span> 个月<br>
                约 <span class="number-highlight">${years}</span> 年
              </div>
            </div>`;
    }
};

const addTheDays = () => {
    let days = addDays.value;
    if (days == undefined){
      days = 0;
    }
    
    if (!singleDate.value) {
        dateResult.value = `<div class="result-error">请先选择基准日期</div>`;
        return;
    }
    
    const baseJSDate = calendarDateToJSDate(singleDate.value);
    let newDay = addDate(baseJSDate, days);
    
    const baseLabel = df.format(singleDate.value.toDate(getLocalTimeZone()));
    
    dateResult.value =
        `<div class="result-item">
          <div class="result-label">日期加减计算结果</div>
          <div class="result-value">
            基准日期 <span class="date-highlight">${baseLabel}</span> 
            ${days >= 0 ? '往后' : '往前'} <span class="number-highlight">${Math.abs(days)}</span> 天<br>
            结果日期：<span class="date-highlight">${newDay}</span>
          </div>
        </div>`;
};

const calculateWorkdays = () => {
    if (!dateRange.value.start || !dateRange.value.end) {
        dateResult.value = `<div class="result-error">请先选择完整的日期范围</div>`;
        return;
    }
    
    const startJSDate = calendarDateToJSDate(dateRange.value.start);
    const endJSDate = calendarDateToJSDate(dateRange.value.end);
    
    let workdays = 0;
    let weekends = 0;
    let current = new Date(startJSDate);
    
    while (current <= endJSDate) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekends++;
        } else {
            workdays++;
        }
        current.setDate(current.getDate() + 1);
    }
    
    const startLabel = df.format(dateRange.value.start.toDate(getLocalTimeZone()));
    const endLabel = df.format(dateRange.value.end.toDate(getLocalTimeZone()));
    
    dateResult.value =
        `<div class="result-item">
          <div class="result-label">工作日统计结果</div>
          <div class="result-value">
            从 <span class="date-highlight">${startLabel}</span> 
            到 <span class="date-highlight">${endLabel}</span><br>
            工作日：<span class="number-highlight">${workdays}</span> 天<br>
            周末：<span class="number-highlight">${weekends}</span> 天<br>
            总计：<span class="number-highlight">${workdays + weekends}</span> 天
          </div>
        </div>`;
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

/* 日期选择区域 */
.date-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .date-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.date-header {
  margin-bottom: 1.5rem;
}

.date-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.25rem;
  color: rgb(30, 41, 59);
}

.dark {
  .date-title {
    color: white;
  }
}

.date-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.date-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.date-label {
  font-weight: 600;
  color: rgb(71, 85, 105);
  font-size: 0.875rem;
}

.dark {
  .date-label {
    color: rgb(148, 163, 184);
  }
}

.date-button {
  width: 100%;
  justify-content: flex-start;
  font-weight: 500;
}

.date-hint {
  font-size: 0.75rem;
  color: rgb(100, 116, 139);
}

.dark {
  .date-hint {
    color: rgb(148, 163, 184);
  }
}

/* 操作区域 */
.operation-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .operation-section {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.operation-header {
  margin-bottom: 1.5rem;
}

.operation-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.25rem;
  color: rgb(30, 41, 59);
}

.dark {
  .operation-title {
    color: white;
  }
}

.operation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.operation-card {
  background: rgb(248, 250, 252);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  transition: all 0.3s ease;
}

.operation-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.dark {
  .operation-card {
    background: rgb(51, 65, 85);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.operation-card-title {
  font-weight: 600;
  font-size: 1rem;
  color: rgb(30, 41, 59);
  margin-bottom: 1rem;
}

.dark {
  .operation-card-title {
    color: white;
  }
}

.operation-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.days-input {
  width: 100%;
}

.calculate-button {
  font-weight: 600;
  transition: all 0.3s ease;
}

.calculate-button:hover {
  transform: translateY(-1px);
}

.add-button {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
  color: white;
  border: none;
}

.add-button:hover {
  box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.3);
}

.diff-button {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
  color: white;
  border: none;
}

.diff-button:hover {
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
}

.workday-button {
  background: linear-gradient(to right, rgb(249, 115, 22), rgb(239, 68, 68));
  color: white;
  border: none;
}

.workday-button:hover {
  box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.3);
}

.operation-description {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  text-align: center;
}

.dark {
  .operation-description {
    color: rgb(148, 163, 184);
  }
}

/* 结果区域 */
.result-section {
  margin-bottom: 2rem;
}

.result-header {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.25rem;
  color: rgb(30, 41, 59);
  margin-bottom: 1.5rem;
}

.dark {
  .result-header {
    color: white;
  }
}

.result-card {
  background: linear-gradient(135deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%);
  border-radius: 1.25rem;
  padding: 2.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.result-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.result-card:hover::before {
  left: 100%;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.dark {
  .result-card {
    background: linear-gradient(135deg, rgb(51, 65, 85) 0%, rgb(30, 41, 59) 100%);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }
  
  .result-card::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }
}

.result-content {
  text-align: center;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* 使用 :deep() 选择器确保样式能应用到动态生成的内容 */
:deep(.result-item) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeInResult 0.5s ease-out;
}

:deep(.result-label) {
  font-weight: 600;
  font-size: 1.125rem;
  color: rgb(59, 130, 246);
  text-align: center;
  padding: 0.75rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 0.75rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.dark {
  :deep(.result-label) {
    color: rgb(147, 197, 253);
    background: rgba(147, 197, 253, 0.1);
    border-color: rgba(147, 197, 253, 0.2);
  }
}

:deep(.result-value) {
  font-size: 1rem;
  color: rgb(30, 41, 59);
  line-height: 1.8;
  text-align: center;
  padding: 1rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 0.75rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  :deep(.result-value) {
    color: white;
    background: rgba(51, 65, 85, 0.8);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

:deep(.date-highlight) {
  color: rgb(34, 197, 94);
  font-weight: 600;
  background: rgba(34, 197, 94, 0.15);
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(34, 197, 94, 0.3);
  display: inline-block;
  margin: 0.125rem;
  transition: all 0.2s ease;
}

:deep(.date-highlight):hover {
  background: rgba(34, 197, 94, 0.2);
  transform: translateY(-1px);
}

.dark {
  :deep(.date-highlight) {
    background: rgba(34, 197, 94, 0.2);
    border-color: rgba(34, 197, 94, 0.4);
  }
}

:deep(.number-highlight) {
  color: rgb(59, 130, 246);
  font-weight: 700;
  font-size: 1.25rem;
  background: rgba(59, 130, 246, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  display: inline-block;
  margin: 0.125rem;
  transition: all 0.2s ease;
}

:deep(.number-highlight):hover {
  background: rgba(59, 130, 246, 0.15);
  transform: scale(1.05);
}

.dark {
  :deep(.number-highlight) {
    color: rgb(147, 197, 253);
    background: rgba(147, 197, 253, 0.1);
    border-color: rgba(147, 197, 253, 0.2);
  }
}

:deep(.result-error) {
  color: rgb(239, 68, 68);
  font-weight: 600;
  text-align: center;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 0.75rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
  animation: shake 0.5s ease-in-out;
}

.dark {
  :deep(.result-error) {
    background: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.3);
  }
}

/* 结果动画效果 */
@keyframes fadeInResult {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
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

.date-icon {
  background: linear-gradient(to right, rgb(147, 51, 234), rgb(79, 70, 229));
}

.calc-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
}

.work-icon {
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

/* 响应式优化 */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .tool-card {
    padding: 1.5rem;
  }
  
  .date-inputs {
    grid-template-columns: 1fr;
  }
  
  .operation-grid {
    grid-template-columns: 1fr;
  }
}
</style>
