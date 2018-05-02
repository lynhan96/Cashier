import React, {Component} from 'react'
import R from 'ramda'
import { Link } from 'react-router'

import { isAdmin } from 'components/wrappers/isAdmin'
import { showConfirmAlertDeleteItem } from '../../../../lib/actions/showNotification'

class ListAction extends Component {
  render() {
    const { arrLink, dispatch, itemIndex, items, deleteItem } = this.props

    return (
      <div style={{ textAlign: 'center' }}>
        <Link to={arrLink.list} className='btn btn-success btn-round' style={style.buttonMargin}>
          Trở lại
        </Link>
        <Link to={arrLink.view + '?index=' + itemIndex} className='btn btn-primary btn-round' style={style.buttonMargin}>
          Thông tin chi tiết
        </Link>
        <button onClick={showConfirmAlertDeleteItem(deleteItem, items[itemIndex].id, dispatch, itemIndex, 'edit')} type='button' className='btn btn-danger btn-round' style={style.buttonMargin}>
          Xóa dữ liệu
        </button>
      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(ListAction)

const style = {
  buttonMargin: {
    margin: '5px 15px 10px 15px'
  }
}
