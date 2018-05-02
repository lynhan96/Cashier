import React, { Component } from 'react'
import R from 'ramda'

import { isAdmin } from 'components/wrappers/isAdmin'

class ImageView extends Component {
  render() {
    const { data, item } = this.props

    if (data[item.fieldName] == null) {
      return (
        <div className='col-md-12'>
          <div className='form-group label-floating' style={{ marginTop: '0' }}>
            <label>{item.viewTitle}</label>
            <div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='col-md-12'>
        <div className='form-group label-floating' style={{ marginTop: '0' }}>
          <label>{item.viewTitle}</label>
          <div>
            {Object.keys(data[item.fieldName]).map((key, index) => {
              return (
                <img src={data[item.fieldName][key]} style={style.imageItem} key={index}/>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(ImageView)

const style = {
  imageItem: {
    width: '120px',
    margin: '10px',
    objectFit: 'contain'
  }
}
