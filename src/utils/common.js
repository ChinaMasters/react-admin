export function formatDate(oldDate, fmt) {
  let date = new Date()
  if (typeof oldDate === 'string' || typeof oldDate === 'number') {
    date = new Date(oldDate)
  } else {
    date = oldDate
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  function padLeftZero(str) {
    return ('00' + str).substr(str.length)
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

export function getParentNodes (array, label, key){
  let stack = [];
  let going = true;
  let walker = (array, label) => {
    array.forEach(item => {
      if (!going) return;
      stack.push(item);
      if (item[key] === label) {
        going = false;
      } else if (item['children']) {
        walker(item['children'], label);
      } else {
        stack.pop();
      }
    });
    if (going) stack.pop();
  }
  walker(array, label);
  return stack
}