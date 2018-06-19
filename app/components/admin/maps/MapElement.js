import React, { Component } from 'react'
import { Link } from 'react-router'
import R from 'ramda'
import 'styles/website.less'

import { isAdmin } from 'components/wrappers/isAdmin'
import Draggable from 'react-draggable'

class MapElement extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick (event) {
  }

  render() {
    const { item, id } = this.props
    const imageUrl = R.values(item.imageUrl)[0]

    return (
      <Draggable
        disabled={true}
        allowAnyClick={true}
        axis='both'
        handle='.handle'
        bounds='parent'
        defaultPosition={{x: item.x, y: item.y}}
        position={{x: item.x, y: item.y}}
        grid={[5, 5]}>
        <div className='table handle'>
          <div style={{ backgroundImage: 'url("' + imageUrl + '")', backgroundSize: 'cover' }} className='table-wrapper'>
            <Link to={'/tabe-order-detail?tableId=' + id}>
              <div className='table-name'>{item.name}</div>
              <div className='table-status'>{item.status}</div>
            </Link>
          </div>
        </div>
      </Draggable>
    )
  }
}

export default R.pipe(
  isAdmin
)(MapElement)
