import React from 'react'
import ReactQueryParams from 'react-query-params'

class OrderingNotFound extends ReactQueryParams {
  render() {
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
}

export default OrderingNotFound

const style = {
  header: {
    textAlign: 'center',
    fontSize: '25px'
  }
}
