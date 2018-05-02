import React, {Component} from 'react'
import R from 'ramda'
import { Link } from 'react-router'

import { isAdmin } from 'components/wrappers/isAdmin'

class TableHeader extends Component {
  constructor (props) {
    super(props)
    this.sortBy = this.props.sortBy.bind(this)
  }

  render() {
    const { sortFieldName, dispatch, sortType, tableHeader, datas } = this.props

    let iconName = 'fa fa-arrow-down '

    if (sortType === 'ZtoA') {
      iconName = 'fa fa-arrow-up '
    }

    return (
      <thead className='text-primary'>
        <tr>
          {tableHeader.map((item, index) => {
            return (
              <th key={index}>
                <Link to='#' onClick={e => { e.preventDefault(); this.sortBy(datas, item.fieldName, sortFieldName, sortType, dispatch) }}>
                  { item.viewTitle }
                </Link>
                <i className={sortFieldName === item.fieldName ? iconName + 'sort-icon-active' : iconName} style={style.iconStyle}></i>
              </th>
            )
          })}
          <th>Actions</th>
        </tr>
      </thead>
    )
  }
}

export default R.pipe(
  isAdmin
)(TableHeader)

const style = {
  iconStyle: {
    fontSize: '14px',
    marginLeft: '5px',
    display: 'none'
  }
}
