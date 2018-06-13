import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import ReactToPrint from 'react-to-print'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { isAdmin } from 'components/wrappers/isAdmin'
import OrderingNotFound from 'components/OrderingNotFound'
import { priceToString } from 'lib/objects'
import { getAdminData } from 'lib/Constant'

let items = []
let ordering = null

class ComponentToPrint extends ReactQueryParams {
  render() {
    const employeeData = getAdminData()

    return (
      <div className='invoice-box' style={{ marginBottom: '30px' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif' }}>BK Cookery</h2>
        <h4 style={{ textAlign: 'center' }}>{'Mã hóa đơn: ' + ordering.transactionId}</h4>
        <h4 style={{ textAlign: 'center' }}>{'Ngày xuất hóa đơn: ' + ordering.createdAt}</h4>
        <p style={{ textAlign: 'center' }}>{'Nhân viên xuất hóa đơn: ' + employeeData.name}</p>
        <table className='table table-striped' cellPadding='0' cellSpacing='0'>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Món ăn</th>
              <th style={{ textAlign: 'center' }}>Số lưọng</th>
              <th style={{ textAlign: 'center' }}>Gía tiền</th>
              <th style={{ textAlign: 'center' }}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {items.map((value, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{value.name}</td>
                  <td style={{ textAlign: 'center' }}>{value.quantity}</td>
                  <td style={{ textAlign: 'center' }}>{priceToString(value.currentPrice)}</td>
                  <td style={{ textAlign: 'center' }}>{priceToString(value.currentPrice * value.quantity)}</td>
                </tr>
              )
            })}
            <tr style={{ height: '50px' }}></tr>
            <tr style={{ textAlign: 'center' }}>
              <th style={{ textAlign: 'center' }}>Phương thức thanh toán:</th>
              <td></td>
              <td></td>
              <td style={{borderTop: '1px solid #ddd'}}>Tiền mặt</td>
            </tr>
            <tr style={{ textAlign: 'center' }}>
              <th style={{ textAlign: 'center' }}>Tông tiền:</th>
              <td></td>
              <td></td>
              <td>{priceToString(ordering.totalPrice)}</td>
            </tr>
            <tr style={{ textAlign: 'center' }}>
              <th style={{ textAlign: 'center' }}>Mã khuyễn mãi:</th>
              <td></td>
              <td></td>
              <td>0 VNĐ</td>
            </tr>
            <tr style={{ textAlign: 'center' }}>
              <th style={{ textAlign: 'center' }}>Thuế (0%)</th>
              <td></td>
              <td></td>
              <td>0 VNĐ</td>
            </tr>
            <tr style={{ textAlign: 'center' }}>
              <th style={{ textAlign: 'center' }}>Tổng tiền đã có VAT</th>
              <td></td>
              <td></td>
              <td>{priceToString(ordering.totalPrice)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

class PrintOrder extends ReactQueryParams {
  render() {
    const { orderings, tables } = this.props
    let params = this.queryParams
    const currentTable = tables[params.tableId]

    if (!currentTable.lastOrderingId || currentTable.lastOrderingId === '') {
      return <OrderingNotFound/>
    }

    if (orderings) {
      ordering = R.find(R.propEq('id', currentTable.lastOrderingId))(orderings)

      if (ordering && ordering.items) {
        items = ordering.items
      }
    }

    if (ordering == null || !ordering) {
      return <OrderingNotFound/>
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <div className='row'>
            <div className='card'>
              <div className='card-header' data-background-color='purple'>
                <h3 className='title' style={style.header}>{'Hóa đơn: ' + currentTable.name}</h3>
              </div>
              <ComponentToPrint ref={el => (this.componentRef = el)} />
              <ReactToPrint
                trigger={() =>
                  <div style={{ textAlign: 'center', margin: '20px' }}>
                    <Link
                      className='button-confirm-food'
                      to='#'
                      style={style.deleteFood}
                      onClick={e => { e.preventDefault() }}
                    >In hóa đơn</Link>
                  </div>
                }
                content={() => this.componentRef}
                />
                <div style={{ textAlign: 'center', margin: '20px' }}>
                  <Link
                    className='button-done-food'
                    to={'/tabe-order-detail?tableId=' + params.tableId}
                    style={style.deleteFood}
                  >Trở lại</Link>
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
  tables: state.table.items,
  loading: state.food.loading,
  error: state.food.error
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(PrintOrder)

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
    justifyContent: 'center',
    marginTop: '30px'
  },
  deleteFood: {
    textAlign: 'center',
    fontSize: '17px',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '5px',
    margin: '8px 5px',
    fontWeight: '500'
  }
}
