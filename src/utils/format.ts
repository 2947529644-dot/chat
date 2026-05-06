/**
 * Format time for message timestamp display
 * - Today: "HH:MM"
 * - Yesterday: "昨天 HH:MM"
 * - Within a week: "周X HH:MM"
 * - Earlier: "M月D日 HH:MM"
 */
export function formatTime(date: Date): string {
  const now = new Date()
  const timeStr = formatTimeOnly(date)

  const diffDays = getDayDifference(now, date)

  if (diffDays === 0) {
    // Today
    return timeStr
  } else if (diffDays === 1) {
    // Yesterday
    return `昨天 ${timeStr}`
  } else if (diffDays < 7) {
    // Within a week
    const weekDay = getWeekDayName(date)
    return `${weekDay} ${timeStr}`
  } else {
    // Earlier
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}月${day}日 ${timeStr}`
  }
}

/**
 * Format time for contact list last message time
 * - Today: "HH:MM"
 * - Yesterday: "昨天"
 * - Within a week: "周X"
 * - Earlier: "M/D"
 */
export function formatLastMessageTime(date: Date): string {
  const now = new Date()

  const diffDays = getDayDifference(now, date)

  if (diffDays === 0) {
    // Today
    return formatTimeOnly(date)
  } else if (diffDays === 1) {
    // Yesterday
    return '昨天'
  } else if (diffDays < 7) {
    // Within a week
    return getWeekDayName(date)
  } else {
    // Earlier
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}/${day}`
  }
}

/**
 * Format time as "HH:MM"
 */
function formatTimeOnly(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

/**
 * Get the difference in days between two dates (ignoring time)
 * Returns the number of days that have passed (always >= 0)
 */
function getDayDifference(now: Date, date: Date): number {
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const diffMs = nowDate.getTime() - targetDate.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  return Math.max(0, diffDays)
}

/**
 * Get Chinese weekday name
 */
function getWeekDayName(date: Date): string {
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekDays[date.getDay()]
}
