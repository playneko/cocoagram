import dayjs from 'dayjs'

const isEmpty = (value: string | any[] | null | undefined) => {
  if (value === null || value === undefined || value.length === 0 || value === '' || value === 'NULL' || value === 'undefined') {
    return true
  }
  return false
}

const stringCut = (value: string) => {
  if (!isEmpty(value) && value.length > 45) {
    return value.substring(0, 45) + "...";
  }
  return value;
}

const datetimeDiff = (value: string) => {
  const dateDiffSecond = dayjs(new Date()).diff(value, 'second');
  if (dateDiffSecond > 60) {
    const dateDiffMinute = dayjs(new Date()).diff(value, 'minute');
    if (dateDiffMinute > 60) {
      const dateDiffHour = dayjs(new Date()).diff(value, 'hour');
      if (dateDiffHour > 24) {
        const dateDiffDay = dayjs(new Date()).diff(value, 'day');
        if (dateDiffDay > 30) {
          const dateDiffMonth = dayjs(new Date()).diff(value, 'month');
          if (dateDiffMonth > 12) {
            const dateDiffYear = dayjs(new Date()).diff(value, 'year');
            return dateDiffYear + "年前";
          } else {
            return dateDiffMonth + "月前";
          }
        } else {
          return dateDiffDay + "日前";
        }
      } else {
        return dateDiffHour + "時間前";
      }
    } else {
      return dateDiffMinute + "分前";
    }
  } else {
    return dateDiffSecond + "秒前";
  }
}

export {
  isEmpty,
  stringCut,
  datetimeDiff
};