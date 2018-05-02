import React from 'react'
import R from 'ramda'
import { Link } from 'react-router'
import ReactQueryParams from 'react-query-params'

import { isAdmin } from 'components/wrappers/isAdmin'

class ListHeaderElement extends ReactQueryParams {
  render() {
    const { visableCreateButton, arrLink, dispatch, searchFunc } = this.props

    return (
      <div>
        { !visableCreateButton &&
          <div style={{ width: '100%', display: 'inline-block' }}>
            <Link to={arrLink.create} className='btn btn-success pull-left btn-round'>
              Thêm dữ liệu
              <div className='ripple-container'></div>
            </Link>
          </div>
        }
        <div className='row'>
          <div className='form-group col-md-4 col-xs-12' style={{ margin: '0' }}>
            <input type='text' className='form-control' placeholder='Tìm kiếm' onChange={e => searchFunc(e, dispatch)}/>
            <span className='material-input'></span>
          </div>
        </div>
      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(ListHeaderElement)
