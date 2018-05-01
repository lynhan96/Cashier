import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import { isAdmin } from 'components/wrappers/isAdmin'

import { updateActiveLink } from 'ducks/admin'
import { fetchFoodCategories } from 'lib/actions/foodCategory'
import { fetchFoods, changeFoodStatus } from 'lib/actions/food'
import { fetchNotifications } from 'lib/actions/notification'
import { priceToString, searchProduct } from 'lib/objects'

class Search extends ReactQueryParams {
  constructor (props) {
    super(props)

    this.foodStatus = this.foodStatus.bind(this)
  }

  foodStatus(foodId, newStatus) {
    this.props.dispatch(changeFoodStatus(foodId, newStatus))
  }

  componentDidMount() {
    this.props.dispatch(fetchNotifications())
    this.props.dispatch(fetchFoods())
    this.props.dispatch(fetchFoodCategories())
    this.props.dispatch(updateActiveLink('foods'))
  }

  render() {
    const { foods } = this.props
    const params = this.queryParams

    let searchFoods = []

    if (params.keyword !== '') {
      searchFoods = searchProduct(params.keyword, foods)
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <div className='row'>
            <div className='card'>
              <div className='card-header' data-background-color='purple'>
                <h4 className='title' style={style.header}>{'Kết quả tìm kiếm cho từ khóa: ' + params.keyword}</h4>
              </div>
              <div className='card-content'style={{ width: '100%', float: 'left', padding: '40px 20px' }}>
                {searchFoods.map((item, index) => {
                  const image = R.values(item.imageUrl)
                  return (
                    <div className='col-md-4 col-sm-4 food-item' key={index}>
                      <article className='menus-container wow fadeIn animated' data-wow-delay='0.1s'>
                        <div>
                          <img src={ image.length > 0 ? image[0] : '' } style={{ objectFit: 'contain', width: '100%', height: '200px' }}/>
                        </div>
                        <h4 className='item-title' style={style.name}>{item.name}</h4>
                        <div className='item-entry'>
                          <p style={style.description}> {'Trạng thái: ' + item.status}</p>
                        </div>
                        <div className='item-entry'>
                          <p style={style.description}> {priceToString(item.currentPrice)}</p>
                        </div>
                        <div className='item-entry' style={style.actionButton}>
                          <Link
                            className='button-delete-food'
                            to='#'
                            style={style.deleteFood}
                            onClick={e => { e.preventDefault(); this.foodStatus(item.id, 'Hết món') }}
                          >Hết món</Link>
                          <Link
                            className='button-confirm-food'
                            to='#'
                            style={style.deleteFood}
                            onClick={e => { e.preventDefault(); this.foodStatus(item.id, 'Còn món') }}
                          >Còn món</Link>
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
  foods: state.food.items
})

export default R.pipe(
  isAdmin,
  connect(mapStateToProps)
)(Search)

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
