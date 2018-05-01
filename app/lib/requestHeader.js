import moment from 'moment'
import md5 from 'md5'
import Store from 'lib/Store'
import { apiDomainUrl } from 'lib/Constant'

export const makeHeader = _ => {
  let headers = {
    'Content-Type': 'application/json',
    'Date-Time': moment.utc().format('YYYY-MM-DD hh:mm:ss'),
    'X-API-Language': 'en',
    'Uid': '',
    'Token': '',
    'Vid': ''
  }

  const headerInfo = Store.getState().admin.data

  if (headerInfo && headerInfo !== null) {
    headers['Uid'] = headerInfo.uid
    headers['Token'] = headerInfo.token
    headers['Vid'] = headerInfo.vid
  }

  headers['Authorization'] = md5(md5(headers['Token'] + headers['Uid'] + headers['Date-Time']))
  return headers
}

export const makeRequestOptions = (params, url) => ({
  method: 'POST',
  uri: apiDomainUrl() + url,
  body: params,
  headers: makeHeader(),
  json: true
})
