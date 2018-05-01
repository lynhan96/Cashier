import { database } from 'database/database'
import R from 'ramda'
import async from 'async'
import * as firebase from 'firebase'
import Navigator from 'lib/Navigator'
import { getAdminData } from 'lib/Constant'
import { showNotification } from './showNotification'

export const FETCH_TABLE_SUCCESS = 'FETCH_TABLE_SUCCESS'
export const TABLE_CHANGED = 'TABLE_CHANGED'
export const FETCH_TABLE_BEGIN = 'FETCH_TABLE_BEGIN'
export const FETCH_TABLE_END = 'FETCH_TABLE_END'
export const TABLE_DELETED = 'TABLE_DELETED'

export const fetchTablesBegin = () => ({
  type: FETCH_TABLE_BEGIN
})

export const fetchTablesEnd = () => ({
  type: FETCH_TABLE_END
})

export const fetchTablesSuccess = items => ({
  type: FETCH_TABLE_SUCCESS,
  items: items
})

const updateTableInfo = (params, dispatch) => {
  let item = params.item
  item.name = params.tableName
  item.imageUrl = params.imageUrl
  item.status = params.status

  const ref = database.ref(getAdminData().vid + '/tables').child(params.id)
  ref.set(item)
  dispatch(fetchTablesEnd())

  showNotification('topRight', 'success', 'Cập nhập thông tin thành công!')

  Navigator.push('map-tables')
}

export const submitUpdateTable =
  (values, dispatch, props) => {
    let params = values

    if (params.imageUrl) {
      dispatch(fetchTablesBegin())
      const keys = Object.keys(params.imageUrl)

      async.each(keys, function(key, callback) {
        const storageRef = firebase.storage().ref(key + '.png')
        const base64result = R.split(',', params.imageUrl[key])

        if (base64result.length === 1) {
          callback()
          return
        }

        storageRef.putString(base64result[1], 'base64').then(function(snapshot) {
          params.imageUrl[key] = snapshot.downloadURL
          callback()
        })
      }, function(err) {
        if (err) {
          showNotification('topRight', 'error', 'Quá trình Upload hình xảy ra lỗi!')
        } else {
          updateTableInfo(params, dispatch)
        }
      })
    } else {
      dispatch(fetchTablesBegin())
      updateTableInfo(params, dispatch)
    }
  }

export const fetchTables = () => (dispatch) => {
  const ref = database.ref(getAdminData().vid + '/tables')
  ref.once('value')
    .then((snapshot) => {
      const tables = snapshot.val()

      dispatch(fetchTablesSuccess(tables))
    })
    .then(() => {
      ref.on('value', (result) => {
        dispatch(fetchTablesSuccess(result.val()))
      })
      ref.on('child_removed', (result) => dispatch({ type: TABLE_DELETED, item: R.assoc('id', result.key, result.val()) }))
    })
    .catch((error) => console.log(error))
}
