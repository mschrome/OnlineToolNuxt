<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

useHead({
  title: '中国节假日历查询-By Mintimate',
  meta: [
    {
      name: 'description',
      content: '查询当前日期的中国节假日、调休日、工作日、24节气、以及农历信息。帮助用户快速了解今天是什么日子，同时也为用户提供一些有用的信息。',
    },
    {
      name: 'keywords',
      content: '在线工具箱,中国节假日查询,中国24节气,农历日期,农历节日,调休日',
    },
  ],
});

// 当前选中的日期
const selectedDate = shallowRef(new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()))

// 当前日期信息
const currentDayInfo = ref({
  date: '',
  isHoliday: false,
  isWorkday: false,
  isFestival: false,
  festivalName: '',
  dayInWeek: 0,
  isLieu: false,
  solarName: '',
  solarIndex: 0,
})

// 农历信息
const currentDateLunarInfo = ref({
  date: "2057-09-28",
  lunarYear: 2057,
  lunarMon: 8,
  lunarDay: 30,
  isLeap: false,
  lunarDayCN: "三十",
  lunarMonCN: "八月",
  lunarYearCN: "二零五七",
  yearCyl: "丁丑",
  monCyl: "己酉",
  dayCyl: "戊子",
  zodiac: "牛"
})

// 节假日数据缓存
const holidayCache = ref(new Map())

// 加载状态
const isLoading = ref(true)

// 获取日期的颜色标识
function getColorByDate(date: Date) {
  const dateStr = date.toISOString().split('T')[0]
  const dayInfo = holidayCache.value.get(dateStr)
  
  if (!dayInfo) {
    // 如果没有数据，根据星期判断
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return 'success' // 周末休息日显示绿色
    } else {
      return 'error' // 工作日显示红色
    }
  }
  
  // 休息日显示为绿色
  if (!dayInfo.isWorkday) {
    return 'success'
  }
  
  // 工作日显示为红色
  if (dayInfo.isWorkday) {
    return 'error'
  }
  
  return undefined
}

// 获取节假日信息
async function fetchHolidayInfo(year: number) {
  try {
    const response = await $fetch(`/api/holiday/${year}`)
    if (response && response.data) {
      // 将数据存储到缓存中
      Object.entries(response.data).forEach(([date, info]: [string, any]) => {
        holidayCache.value.set(date, info)
      })
    }
  } catch (error) {
    console.error('获取节假日信息失败:', error)
  }
}

// 获取农历信息
async function fetchLunarInfo(dateStr: string) {
  try {
    const response = await $fetch(`/api/lunar/${dateStr}`)
    if (response && response.data) {
      currentDateLunarInfo.value = response.data
    }
  } catch (error) {
    console.error('获取农历信息失败:', error)
  }
}

// 更新当前日期信息
async function updateCurrentDayInfo(calendarDate: CalendarDate) {
  const jsDate = calendarDate.toDate('UTC')
  const dateStr = jsDate.toISOString().split('T')[0]
  
  // 更新基本日期信息
  currentDayInfo.value.date = dateStr
  currentDayInfo.value.dayInWeek = jsDate.getDay()
  
  // 获取节假日信息
  const dayInfo = holidayCache.value.get(dateStr)
  if (dayInfo) {
    Object.assign(currentDayInfo.value, dayInfo)
  } else {
    // 如果缓存中没有，则默认为工作日
    currentDayInfo.value.isHoliday = false
    currentDayInfo.value.isWorkday = jsDate.getDay() >= 1 && jsDate.getDay() <= 5
    currentDayInfo.value.isFestival = false
    currentDayInfo.value.festivalName = ''
    currentDayInfo.value.isLieu = false
    currentDayInfo.value.solarName = ''
    currentDayInfo.value.solarIndex = 0
  }
  
  // 获取农历信息
  await fetchLunarInfo(dateStr)
}

// 监听日期变化
watch(selectedDate, async (newDate) => {
  await updateCurrentDayInfo(newDate)
  
  // 如果切换到新的年份，预加载该年份的数据
  const newYear = newDate.year
  if (!holidayCache.value.has(`${newYear}-01-01`)) {
    await fetchHolidayInfo(newYear)
  }
}, { immediate: true })

// 初始化数据
onMounted(async () => {
  try {
    isLoading.value = true
    const currentYear = new Date().getFullYear()
    await Promise.all([
      fetchHolidayInfo(currentYear),
      fetchHolidayInfo(currentYear + 1), // 预加载下一年的数据
      fetchHolidayInfo(currentYear - 1)  // 预加载上一年的数据
    ])
    await updateCurrentDayInfo(selectedDate.value)
  } finally {
    isLoading.value = false
  }
})

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- 主标题区域 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          中国节假日历查询
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 font-medium">
          查询节假日、调休日、工作日、24节气及农历信息
        </p>
      </div>

      <!-- 主日历卡片 -->
      <div class="calendar-card">
        <ClientOnly>
          <div v-if="isLoading" class="loading-container">
            <div class="loading-content">
              <div class="loading-spinner"></div>
              <p class="loading-text">正在加载日历信息...</p>
            </div>
          </div>
          <div v-else class="calendar-container">
            <UCalendar 
              v-model="selectedDate" 
              class="calendar-component"
              locale="zh-CN"
            >
              <template #day="{ day }">
                <div class="calendar-day">
                  <div class="day-content">
                    <span class="day-number">{{ day.day }}</span>
                    <div 
                      v-if="getColorByDate(day.toDate('UTC'))"
                      class="day-indicator"
                      :class="{
                        'indicator-success': getColorByDate(day.toDate('UTC')) === 'success',
                        'indicator-error': getColorByDate(day.toDate('UTC')) === 'error'
                      }"
                    ></div>
                  </div>
                </div>
              </template>
            </UCalendar>
            
            <!-- 图例说明 -->
            <div class="legend-section">
              <div class="legend-item">
                <div class="legend-demo">
                  <span class="legend-day-number">示例</span>
                  <div class="day-indicator indicator-success"></div>
                </div>
                <span class="legend-text">休息日</span>
              </div>
              <div class="legend-item">
                <div class="legend-demo">
                  <span class="legend-day-number">示例</span>
                  <div class="day-indicator indicator-error"></div>
                </div>
                <span class="legend-text">工作日</span>
              </div>
            </div>
          </div>
          <template #fallback>
            <div class="loading-container">
              <div class="loading-content">
                <div class="loading-spinner"></div>
                <p class="loading-text">正在加载日历信息...</p>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- 详细信息卡片 -->
      <div class="info-card">
        <div class="info-header">
          <div class="info-icon">
            <UIcon name="i-heroicons-calendar-days" />
          </div>
          <div class="info-content">
            <h3 class="info-title">{{ currentDayInfo.date }} 详细信息</h3>
            <p class="info-subtitle">节假日、节气与农历信息</p>
          </div>
        </div>
        
        <div class="info-details">
          <div class="detail-item">
            <div class="detail-icon workday-icon">
              <UIcon name="i-heroicons-briefcase" />
            </div>
            <div class="detail-content">
              <h4 class="detail-title">工作日状态</h4>
              <p class="detail-text">
                <span :class="{ 'text-red-500': currentDayInfo.isWorkday, 'text-green-500': !currentDayInfo.isWorkday }">
                  {{ currentDayInfo.isWorkday ? '工作日 (-_-メ)' : '休息日 ヾ(≧≦)〃' }}
                </span>
                <template v-if="currentDayInfo.isFestival">
                  <br>
                  <span class="text-blue-600 dark:text-blue-400">
                    {{ currentDayInfo.isWorkday 
                        ? `因为${currentDayInfo.festivalName}而补班` 
                        : `因为${currentDayInfo.festivalName}而休息` }}
                  </span>
                </template>
              </p>
            </div>
          </div>

          <div class="detail-item">
            <div class="detail-icon solar-icon">
              <UIcon name="i-heroicons-sun" />
            </div>
            <div class="detail-content">
              <h4 class="detail-title">二十四节气</h4>
              <p class="detail-text">
                当前节气：<span class="highlight-text">{{ currentDayInfo.solarName }}</span>
                <br>
                节气第 <span class="highlight-text">{{ currentDayInfo.solarIndex }}</span> 天
              </p>
            </div>
          </div>

          <div class="detail-item">
            <div class="detail-icon lunar-icon">
              <UIcon name="i-heroicons-moon" />
            </div>
            <div class="detail-content">
              <h4 class="detail-title">农历信息</h4>
              <p class="detail-text">
                农历：<span class="highlight-text">{{ currentDateLunarInfo.lunarYearCN }} {{ currentDateLunarInfo.lunarMonCN }} {{ currentDateLunarInfo.lunarDayCN }}</span>
                <br>
                干支：<span class="highlight-text">{{ currentDateLunarInfo.yearCyl }}年 {{ currentDateLunarInfo.monCyl }}月 {{ currentDateLunarInfo.dayCyl }}日</span>
                <br>
                生肖：<span class="highlight-text">{{ currentDateLunarInfo.zodiac }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能介绍卡片 -->
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon holiday-icon">
            <UIcon name="i-heroicons-calendar" />
          </div>
          <div class="feature-content">
            <h3 class="feature-title">节假日查询</h3>
            <p class="feature-description">
              准确查询中国法定节假日、调休安排，帮助您合理规划工作和休息时间。
            </p>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon solar-terms-icon">
            <UIcon name="i-heroicons-sun" />
          </div>
          <div class="feature-content">
            <h3 class="feature-title">二十四节气</h3>
            <p class="feature-description">
              提供准确的二十四节气信息，了解传统农业文化中的时间节点和气候变化。
            </p>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon lunar-calendar-icon">
            <UIcon name="i-heroicons-moon" />
          </div>
          <div class="feature-content">
            <h3 class="feature-title">农历日期</h3>
            <p class="feature-description">
              查看对应的农历日期、干支纪年、生肖信息，传承中华传统文化。
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

<style scoped>
/* 主日历卡片 */
.calendar-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.calendar-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.dark {
  .calendar-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}

/* 加载状态 */
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16rem;
}

.loading-content {
  text-align: center;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid transparent;
  border-top: 2px solid rgb(59, 130, 246);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 0.5rem;
}

.loading-text {
  color: rgb(100, 116, 139);
}

.dark {
  .loading-text {
    color: rgb(148, 163, 184);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 日历组件 */
.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.calendar-component {
  margin: 0 auto 2rem;
  width: 100%;
  max-width: 48rem;
}

.calendar-day {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
}

.day-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
}

.day-number {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(75, 85, 99);
  z-index: 2;
  position: relative;
  margin-bottom: 0.125rem;
}

.dark {
  .day-number {
    color: rgb(209, 213, 219);
  }
}

.day-indicator {
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 0.25rem;
  border-radius: 0.125rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1;
  transition: all 0.2s ease;
}

.dark {
  .day-indicator {
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.indicator-success {
  background: linear-gradient(90deg, 
    rgba(34, 197, 94, 0.6) 0%, 
    rgba(16, 185, 129, 0.7) 50%, 
    rgba(34, 197, 94, 0.6) 100%
  );
  box-shadow: 0 2px 4px rgba(34, 197, 94, 0.3);
}

.dark {
  .indicator-success {
    background: linear-gradient(90deg, 
      rgba(34, 197, 94, 0.8) 0%, 
      rgba(16, 185, 129, 0.9) 50%, 
      rgba(34, 197, 94, 0.8) 100%
    );
    box-shadow: 0 2px 4px rgba(34, 197, 94, 0.5);
  }
}

.indicator-error {
  background: linear-gradient(90deg, 
    rgba(239, 68, 68, 0.6) 0%, 
    rgba(220, 38, 38, 0.7) 50%, 
    rgba(239, 68, 68, 0.6) 100%
  );
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
}

.dark {
  .indicator-error {
    background: linear-gradient(90deg, 
      rgba(239, 68, 68, 0.8) 0%, 
      rgba(220, 38, 38, 0.9) 50%, 
      rgba(239, 68, 68, 0.8) 100%
    );
    box-shadow: 0 2px 4px rgba(239, 68, 68, 0.5);
  }
}

.day-content:hover .day-indicator {
  width: 90%;
  height: 0.3rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dark {
  .day-content:hover .day-indicator {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
}

/* 图例说明 */
.legend-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  font-size: 0.875rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legend-demo {
  position: relative;
  width: 2.5rem;
  height: 2rem;
  background: rgb(248, 250, 252);
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(226, 232, 240, 0.8);
  padding: 0.25rem;
}

.dark {
  .legend-demo {
    background: rgb(71, 85, 105);
    border-color: rgba(100, 116, 139, 0.5);
  }
}

.legend-day-number {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgb(75, 85, 99);
  margin-bottom: 0.125rem;
  z-index: 2;
}

.dark {
  .legend-day-number {
    color: rgb(209, 213, 219);
  }
}

.legend-demo .day-indicator {
  position: absolute;
  bottom: 0.125rem;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 0.1875rem;
  border-radius: 0.125rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark {
  .legend-demo .day-indicator {
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.legend-demo .indicator-success {
  background: linear-gradient(90deg, 
    rgba(34, 197, 94, 0.6) 0%, 
    rgba(16, 185, 129, 0.7) 50%, 
    rgba(34, 197, 94, 0.6) 100%
  );
  box-shadow: 0 1px 2px rgba(34, 197, 94, 0.3);
}

.dark {
  .legend-demo .indicator-success {
    background: linear-gradient(90deg, 
      rgba(34, 197, 94, 0.8) 0%, 
      rgba(16, 185, 129, 0.9) 50%, 
      rgba(34, 197, 94, 0.8) 100%
    );
    box-shadow: 0 1px 2px rgba(34, 197, 94, 0.5);
  }
}

.legend-demo .indicator-error {
  background: linear-gradient(90deg, 
    rgba(239, 68, 68, 0.6) 0%, 
    rgba(220, 38, 38, 0.7) 50%, 
    rgba(239, 68, 68, 0.6) 100%
  );
  box-shadow: 0 1px 2px rgba(239, 68, 68, 0.3);
}

.dark {
  .legend-demo .indicator-error {
    background: linear-gradient(90deg, 
      rgba(239, 68, 68, 0.8) 0%, 
      rgba(220, 38, 38, 0.9) 50%, 
      rgba(239, 68, 68, 0.8) 100%
    );
    box-shadow: 0 1px 2px rgba(239, 68, 68, 0.5);
  }
}

.legend-text {
  color: rgb(100, 116, 139);
  font-weight: 500;
}

.dark {
  .legend-text {
    color: rgb(148, 163, 184);
  }
}

/* 详细信息卡片 */
.info-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.info-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.dark {
  .info-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}

.info-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.dark {
  .info-header {
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }
}

.info-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  margin-right: 1rem;
}

.info-content {
  flex: 1;
}

.info-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.25rem;
}

.dark {
  .info-title {
    color: white;
  }
}

.info-subtitle {
  color: rgb(100, 116, 139);
  font-size: 0.875rem;
}

.dark {
  .info-subtitle {
    color: rgb(148, 163, 184);
  }
}

.info-details {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .info-details {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.detail-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  flex-shrink: 0;
}

.workday-icon {
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234));
}

.solar-icon {
  background: linear-gradient(to right, rgb(249, 115, 22), rgb(245, 158, 11));
}

.lunar-icon {
  background: linear-gradient(to right, rgb(99, 102, 241), rgb(139, 92, 246));
}

.detail-content {
  flex: 1;
}

.detail-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.5rem;
}

.dark {
  .detail-title {
    color: white;
  }
}

.detail-text {
  color: rgb(100, 116, 139);
  line-height: 1.625;
}

.dark {
  .detail-text {
    color: rgb(148, 163, 184);
  }
}

.highlight-text {
  color: rgb(59, 130, 246);
  font-weight: 600;
}

.dark {
  .highlight-text {
    color: rgb(147, 197, 253);
  }
}

/* 功能介绍卡片网格 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  transition: all 0.3s ease;
}

.feature-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.dark {
  .feature-card {
    background: rgb(30, 41, 59);
    border-color: rgba(71, 85, 105, 0.5);
  }
}

.feature-icon {
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

.holiday-icon {
  background: linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129));
}

.solar-terms-icon {
  background: linear-gradient(to right, rgb(249, 115, 22), rgb(245, 158, 11));
}

.lunar-calendar-icon {
  background: linear-gradient(to right, rgb(99, 102, 241), rgb(139, 92, 246));
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(30, 41, 59);
  margin-bottom: 0.75rem;
}

.dark {
  .feature-title {
    color: white;
  }
}

.feature-description {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
  line-height: 1.625;
}

.dark {
  .feature-description {
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

.calendar-card, .info-card, .feature-card {
  animation: fadeInUp 0.6s ease-out;
}

.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }

/* 响应式设计 */
@media (max-width: 640px) {
  .calendar-card, .info-card {
    padding: 1.5rem;
  }
  
  .info-details {
    grid-template-columns: 1fr;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>