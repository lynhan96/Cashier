import React, { Component } from 'react'
import R from 'ramda'
import moment from 'moment'

import Navigator from 'lib/Navigator'
import { showConfirmAlertDeleteItem } from '../../../../lib/actions/showNotification'

import { isAdmin } from 'components/wrappers/isAdmin'

const goto = (url) => () => Navigator.push(url)

class TableBody extends Component {
  render() {
    const { arrLink, dispatch, deleteItem, tableHeader, datas } = this.props

    return (
      <tbody>
        {datas.map(function(item, itemIndex) {
          return (
            <tr key={itemIndex}>
              {tableHeader.map(function(headerItem, headerIndex) {
                if (headerItem.fieldName === 'isView' && item[headerItem.fieldName] === true) {
                  return <td key={headerIndex}>Có</td>
                }

                if (headerItem.fieldName === 'imageUrl') {
                  if (item[headerItem.fieldName] !== null) {
                    const key = Object.keys(item[headerItem.fieldName])

                    return (
                      <td key={headerIndex}>
                        <img src={item[headerItem.fieldName][key[0]]} style={style.imageItem}/>
                      </td>
                    )
                  } else {
                    return <td key={headerIndex}></td>
                  }
                }

                if (headerItem.fieldName === 'time') {
                  item[headerItem.fieldName] = moment.utc(item[headerItem.fieldName]).add(7, 'hours').format('YYYY-MM-DD hh:mm')
                }

                return <td key={headerIndex}>{item[headerItem.fieldName]}</td>
              })}
              <td className='td-actions text-right'>
                { arrLink.view &&
                  <button onClick={goto(arrLink.view + '?index=' + itemIndex)} type='button' rel='tooltip' title='Xem thông thi tiết' className='btn btn-primary btn-simple btn-xs'>
                    <i className='material-icons'>visibility</i>
                  </button>
                }

                { arrLink.edit &&
                  <button onClick={goto(arrLink.edit + '?index=' + itemIndex)} type='button' rel='tooltip' title='Chỉnh sửa dữ liệu' className='btn btn-primary btn-simple btn-xs'>
                    <i className='material-icons'>edit</i>
                  </button>
                }

                {
                  arrLink.delete &&
                  <button onClick={showConfirmAlertDeleteItem(deleteItem, item.id, dispatch, itemIndex, 'list')}type='button' rel='tooltip' title='Xóa dữ liệu' className='btn btn-danger btn-simple btn-xs'>
                    <i className='material-icons'>close</i>
                  </button>
                }
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }
}

export default R.pipe(
  isAdmin
)(TableBody)

const style = {
  imageItem: {
    width: '80px',
    objectFit: 'contain'
  }
}
