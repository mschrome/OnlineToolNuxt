import chineseDays from 'chinese-days'
const { getLunarDate } = chineseDays

export default defineEventHandler(async (event) => {
  const dateParam = getRouterParam(event, 'date')
  
  if (!dateParam) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid date parameter'
    })
  }
  
  try {
    const date = new Date(dateParam)
    if (isNaN(date.getTime())) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid date format'
      })
    }
    
    // 使用 chinese-days 库获取真实的农历数据
    const lunarData = getLunarDate(dateParam)
    
    return {
      success: true,
      data: lunarData
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch lunar data'
    })
  }
})