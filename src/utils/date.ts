import blossomDate from '../database/blossomDate.json'
import fallDate from '../database/fallDate.json'

export function getCurrentBlossomFlowers() {
  // blossomDate
}

export function getBlossomDate(plantName) {
  return blossomDate.find(item => plantName === item.name)
}

export function getFallDate(plantName) {
  return fallDate.find(item => plantName === item.name)
}

const months = ['', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
const weeks = ['上旬', '中旬', '下旬']
//4.1 - 4.3 => 四月中旬 - 四月下旬
//4.3 - 5.2 => 五月上旬 - 五月中旬
//开始日期的旬数如果为3，将变成下个月上旬
export function stringifyStartDate(startDate) {
  let [month, week] = startDate.split('.');
  if (week === '3') {
    month++;
    week = 0;
  }
  return months[month] + weeks[week]
}

export function stringifyEndDate(endDate) {
  let [month, week] = endDate.split('.');
  week--;
  return months[month] + weeks[week]
}

