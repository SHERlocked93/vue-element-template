/**
 * Created by qianyu on 2017/10/25
 */
import fetch from '@/utils/fetch'

export function orderRate() {
  return fetch({
    url: '/homepage/orderrate'
  })
}

export function alermInfo(lastAlermId = '', queryFuzzy = '') {
  return fetch({
    url: '/homepage/alerminfo',
    params: { lastAlermId, queryFuzzy }
  })
}

export function oeeAnalyze(timeSpan = 7) {
  return fetch({
    url: '/homepage/oeeanalyze',
    params: { timeSpan }
  })
}
