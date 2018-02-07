/**
 * 创建于 2018/2/1
 * 功能: vue的过滤器
 */

/**
 * 警报：类型
 * 0-机床
 * 1-产品
 * 2-其他
 */
export const alarmTypeFilter = value => {
  return value === 0
         ? '机床' : value === 1
                  ? '产品'
                  : '其他'
}

/**
 * 警报：是否关闭状态
 * 0-未关闭
 * 1-已关闭
 */
export const alarmDelFlagFilter = value => {
  return value === 0
         ? '未关闭'
         : '已关闭'
}
