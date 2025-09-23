import chineseDays from 'chinese-days'
const { getDayDetail, getSolarTermsInRange, isInLieu, isWorkday } = chineseDays

export default defineEventHandler(async (event) => {
  const year = getRouterParam(event, 'year')
  
  if (!year || isNaN(Number(year))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid year parameter'
    })
  }
  
  try {
    const holidayData = generateHolidayData(Number(year))
    
    return {
      success: true,
      data: holidayData
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch holiday data'
    })
  }
})

// 使用 chinese-days 库生成真实的节假日数据
function generateHolidayData(year: number) {
  const holidays: Record<string, any> = {}
  
  // 生成一年中的所有日期
  const startDate = new Date(year, 0, 1)
  const endDate = new Date(year, 11, 31)
  
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const dateStr = date.toISOString().split('T')[0]
    
    try {
      const dayDetail = getDayDetail(dateStr)
      const [dayOfWeek, festivalName] = dayDetail.name.split(',')
      
      const solarTerm = getSolarTermsInRange(dateStr)[0]
      
      holidays[dateStr] = {
        isHoliday: !dayDetail.work,
        isWorkday: isWorkday(dateStr),
        isFestival: Boolean(festivalName),
        festivalName: festivalName || '',
        dayInWeek: date.getDay(),
        isLieu: isInLieu(dateStr),
        solarName: solarTerm?.name || '',
        solarIndex: solarTerm?.index || 0,
      }
    } catch (error) {
      // 如果某个日期获取失败，使用默认值
      holidays[dateStr] = {
        isHoliday: false,
        isWorkday: date.getDay() >= 1 && date.getDay() <= 5,
        isFestival: false,
        festivalName: '',
        dayInWeek: date.getDay(),
        isLieu: false,
        solarName: '',
        solarIndex: 0,
      }
    }
  }
  
  return holidays
}