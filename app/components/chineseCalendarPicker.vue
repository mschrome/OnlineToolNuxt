<script setup>
import {getDayDetail, getLunarDate, getSolarTermsInRange, isInLieu, isWorkday} from "chinese-days";

const attrs = {
  transparent: true,
  borderless: true,
  color: 'primary',
  'is-dark': {selector: 'html', darkClass: 'dark'},
  'first-day-of-week': 2,
}

let currentDate = new Date().toISOString().slice(0, 10)


let currentDayInfo = defineModel('currentDayInfo', {
  type: Object,
  default: {}
})

let currentDateLunarInfo = defineModel('currentDateLunarInfo', {
  type: Object,
  default: {}
})

let attributes = ref([])

const emit = defineEmits(['clickDateItem'])

const clickDateItem = (page) => {
  const pageDate = page[0].days.map(item => item.id)
  makeOnPageDetail(pageDate)
  emit('clickDateItem', page)
}

/**
 * @name getDaysInMonth
 * @description 获取指定日期所在月份的所有日期
 * @param {Date} date - 指定日期
 * @returns {Array} - 日期数组
 */
const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth(); // 注意 JavaScript 的月份是从0开始的
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let days = [];
  for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
    const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    days.push(dayString);
  }
  return days;
}



/**
 * @name chosenDate
 * @description 选择日期
 * @param {string|Date} clickDate - 选择的日期
 */
const chosenDate = (clickDate) => {
  const currentDateStr = typeof clickDate === 'string' ? clickDate : clickDate.id;
  const dayDetail = getDayDetail(currentDateStr);
  const [dayOfWeek, festivalName] = dayDetail.name.split(',');

  Object.assign(currentDayInfo.value, {
    date: currentDateStr,
    isHoliday: !dayDetail.work,
    dayInWeek: dayOfWeek,
    festivalName: festivalName || '',
    isFestival: Boolean(festivalName),
    isLieu: isInLieu(currentDateStr),
    isWorkday: isWorkday(currentDateStr),
  });

  const solarTerm = getSolarTermsInRange(currentDateStr)[0];
  Object.assign(currentDayInfo.value, {
    solarName: solarTerm?.name || '',
    solarIndex: solarTerm?.index || 0,
  });

  currentDateLunarInfo.value = getLunarDate(currentDateStr);

};

/**
 * @name makeOnPageDetail
 * @description 生成当前页面的日期详情
 * @param {Array} viewDays - 当前页面的日期数组
 */
const makeOnPageDetail = (viewDays) => {
  const TODAY_KEY = 'today';
  const HIGHLIGHT_COLOR_WORK = 'green';
  const HIGHLIGHT_COLOR_HOLIDAY = 'orange';
  const HIGHLIGHT_FILL_MODE_LIEU = 'outline';
  const HIGHLIGHT_FILL_MODE_LIGHT = 'light';
  const DOT_STYLE_DISPLAY_BLOCK = 'block';
  const DOT_STYLE_DISPLAY_NONE = 'none';
  const HIGHLIGHT_COLOR_TODAY = 'pink';

  attributes.value.splice(0, attributes.value.length);


  const buildAttributes = (date) => {
    const dateDetail = getDayDetail(date);
    const [, festivals] = dateDetail.name.split(","); // 忽略第一个元素
    const isToday = new Date(date).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);

    return {
      key: isToday ? TODAY_KEY : date,
      highlight: {
        color: dateDetail.work ? HIGHLIGHT_COLOR_WORK : HIGHLIGHT_COLOR_HOLIDAY,
        fillMode: isInLieu(date) ? HIGHLIGHT_FILL_MODE_LIEU : HIGHLIGHT_FILL_MODE_LIGHT,
      },
      dot: {
        style: {
          display: festivals ? DOT_STYLE_DISPLAY_BLOCK : DOT_STYLE_DISPLAY_NONE,
        },
      },
      dates: date,
    };
  };

  // 先处理普通日期
  const regularAttributes = viewDays.map(buildAttributes);
  // 处理今天的特殊属性
  const todayAttribute = regularAttributes.find(attr => attr.key === TODAY_KEY);
  if (todayAttribute) {
    todayAttribute.highlight = HIGHLIGHT_COLOR_TODAY;
    todayAttribute.dot = true;
  }
  attributes.value.push(...regularAttributes);
};


onMounted(() =>{
  chosenDate(new Date().toISOString().slice(0, 10))
  const thisMonthDays = getDaysInMonth(new Date());
  makeOnPageDetail(thisMonthDays)
})


</script>

<template>
    <VCalendar v-model="currentDate" mode="date" expanded :attributes="attributes"
               @dayclick="chosenDate"
               @didMove="clickDateItem" v-bind="{ ...attrs, ...$attrs }"/>
</template>

<style>
.vc-bars {
  margin: 5px 0 0 0;
  justify-content: center;
}

:root {
  --vc-gray-50: rgb(var(--color-gray-50));
  --vc-gray-100: rgb(var(--color-gray-100));
  --vc-gray-200: rgb(var(--color-gray-200));
  --vc-gray-300: rgb(var(--color-gray-300));
  --vc-gray-400: rgb(var(--color-gray-400));
  --vc-gray-500: rgb(var(--color-gray-500));
  --vc-gray-600: rgb(var(--color-gray-600));
  --vc-gray-700: rgb(var(--color-gray-700));
  --vc-gray-800: rgb(var(--color-gray-800));
  --vc-gray-900: rgb(var(--color-gray-900));
}

.vc-primary {
  --vc-accent-50: rgb(var(--color-primary-50));
  --vc-accent-100: rgb(var(--color-primary-100));
  --vc-accent-200: rgb(var(--color-primary-200));
  --vc-accent-300: rgb(var(--color-primary-300));
  --vc-accent-400: rgb(var(--color-primary-400));
  --vc-accent-500: rgb(var(--color-primary-500));
  --vc-accent-600: rgb(var(--color-primary-600));
  --vc-accent-700: rgb(var(--color-primary-700));
  --vc-accent-800: rgb(var(--color-primary-800));
  --vc-accent-900: rgb(var(--color-primary-900));
}
</style>