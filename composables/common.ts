import dayjs from 'dayjs'

// NULLまたは、空白チェック
const isEmpty = (value: string | any[] | null | undefined) => {
  if (value === null || value === undefined || value.length === 0 || value === '' || value === 'NULL' || value === 'undefined') {
    return true
  }
  return false
}

// ログインチェック
const isAuthCheck = (account: any, authUserInfo: any) => {
  return !isEmpty(account.value) && !isEmpty(authUserInfo) && !isEmpty(authUserInfo.value.token) && authUserInfo.value.permission > 0 ? true : false;
}

// 長い文字を...にする
const stringCut = (value: string) => {
  if (!isEmpty(value) && value.length > 45) {
    return value.substring(0, 45) + "...";
  }
  return value;
}

// 日時をxx前に変換
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

// いいね重複チェック
const distinctLike = (array: any[], value: number) => {
  const result = array.find(({ no, isLike }) => no == value && isLike == 0);
  return isEmpty(result) ? 0 : 1;
}

// バックヘッダページチェック
const headerFilter = (value: string) => {
  const array = [
    '/detail'
  ];
  const str = value.split('-');
  return array.indexOf(`/${!isEmpty(str) ? str[0] : 'unknow'}`);
}

// ファイル存在チェック
const fileFilter = (array: any[], value: any) => {
  const filterData = array.find(itme => itme.name === value.name);
  return isEmpty(filterData) ? true : false;
}

export {
  isEmpty,
  isAuthCheck,
  stringCut,
  datetimeDiff,
  distinctLike,
  headerFilter,
  fileFilter
};