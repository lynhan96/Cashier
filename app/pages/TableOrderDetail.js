import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import { isAdmin } from 'components/wrappers/isAdmin'

import { priceToString } from 'lib/objects'
import { fetchOrderings, changeOrderFoodStatus } from 'lib/actions/ordering'
import { fetchNotifications } from 'lib/actions/notification'

class TableOrderDetail extends ReactQueryParams {
  constructor (props) {
    super(props)

    this.changeFoodStatus = this.changeFoodStatus.bind(this)
  }

  changeFoodStatus(orderingID, foodIndex, newStatus) {
    this.props.dispatch(changeOrderFoodStatus(orderingID, foodIndex, newStatus))
  }

  componentDidMount() {
    this.props.dispatch(fetchNotifications())
    this.props.dispatch(fetchOrderings())
  }

  render() {
    const { orderings, tables } = this.props
    let params = this.queryParams
    const currentTable = tables[params.tableId]

    if (!currentTable.lastOrderingId) {
      return (
        <div className='content'>
          <div className='container-fluid animated fadeIn'>
            <div className='row'>
              <div className='card'>
                <div className='card-header' data-background-color='purple'>
                  <h3 className='title' style={style.header}>Không tìm thấy Order của bàn này</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    let items = []
    let ordering = null
    if (orderings) {
      ordering = orderings[currentTable.lastOrderingId]

      if (ordering && ordering.items) {
        items = ordering.items
      }
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <div className='row'>
            <div className='card'>
              <div className='card-header' data-background-color='purple'>
                <h3 className='title' style={style.header}>{'Danh sách món ăn: ' + currentTable.name}</h3>
                <h4 className='title' style={style.header}>{ ordering !== null && ordering ? '(' + priceToString(ordering.totalPrice) + ')' : ''}</h4>
              </div>
              <div className='card-content'style={{ width: '100%', float: 'left', padding: '40px 20px' }}>
                {items.map((item, index) => {
                  const image = R.values(item.imageUrl)
                  let statusClass = 'button-confirm-food'

                  if (item.status === 'Hết món') {
                    statusClass = 'button-delete-food'
                  } else if (item.status === 'Chế biến xong') {
                    statusClass = 'button-done-food'
                  }

                  return (
                    <div className='col-md-4 col-sm-6 food-item' key={index}>
                      <article className='menus-container wow fadeIn animated' data-wow-delay='0.1s'>
                        <div className='item-entry'>
                          <p className={statusClass} style={style.status}> {item.status}</p>
                        </div>
                        <div>
                          <img src={ image.length > 0 ? image[0] : '' } style={{ objectFit: 'contain', width: '100%', height: '200px' }}/>
                        </div>
                        <h4 className='item-title' style={style.name}>{item.name}</h4>
                        <div className='item-entry'>
                          <p style={style.description}> {priceToString(item.currentPrice) + ' x ' + item.quantity}</p>
                        </div>
                        <div className='item-entry' style={style.actionButton}>
                          <Link
                            className='button-delete-food'
                            to='#'
                            style={style.deleteFood}
                            onClick={e => { e.preventDefault(); this.changeFoodStatus(ordering.id, index, 'Hết món') }}
                          >Hết món</Link>
                          <Link
                            className='button-confirm-food'
                            to='#'
                            style={style.deleteFood}
                            onClick={e => { e.preventDefault(); this.changeFoodStatus(ordering.id, index, 'Đang chờ chế biến') }}
                          >Xác nhận còn món</Link>
                          <Link
                            className='button-done-food'
                            to='#'
                            style={style.deleteFood}
                            onClick={e => { e.preventDefault(); this.changeFoodStatus(ordering.id, index, 'Chế biến xong') }}
                          >Chế biến xong</Link>
                        </div>
                      </article>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderings: state.ordering.items,
  tables: state.table.items
})

export default R.pipe(
  isAdmin,
  connect(mapStateToProps)
)(TableOrderDetail)

const style = {
  name: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  quantity: {
    userSelect: 'none'
  },
  header: {
    textAlign: 'center',
    fontSize: '25px'
  },
  description: {
    textAlign: 'center',
    fontSize: '20px'
  },
  selectButton: {
    cursor: 'pointer'
  },
  status: {
    textAlign: 'center',
    fontSize: '20px',
    backgroundColor: 'green',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '20px',
    margin: '8px 0'
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  deleteFood: {
    float: 'left',
    textAlign: 'center',
    fontSize: '17px',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '5px',
    margin: '8px 5px',
    fontWeight: 'bold'
  }
}
