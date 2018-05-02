import React, {Component} from 'react'
import R from 'ramda'
import { connect } from 'react-redux'

import ContentLoading from 'components/ContentLoading'
import { isAdmin } from 'components/wrappers/isAdmin'
import { createFood, editFieldInfo, selectFieldData, customSelectFieldData } from 'lib/actions/food'
import { fetchFoodCategories } from 'lib/actions/foodCategory'
import TableCreateItem from 'components/admin/table/TableCreateItem'

class FoodCreate extends Component {
  componentDidMount() {
    this.props.dispatch(fetchFoodCategories())
  }

  render() {
    const { foodCategories, loading, dispatch } = this.props

    const categoryIds = R.pipe(
      R.map(R.prop(['id']))
    )(foodCategories)

    const categoryName = R.pipe(
      R.map(R.prop(['name']))
    )(foodCategories)

    const customSelectData = R.merge({foodCategoryId: {value: categoryIds, view: categoryName}})(customSelectFieldData())

    if (loading) {
      return (
        <ContentLoading
          message='Đang Cập nhập dữ liệu ...'
        />
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <TableCreateItem
            editFieldInfo={editFieldInfo()}
            selectFieldData={selectFieldData()}
            customSelectFieldData={customSelectData}
            editHeader='Thêm Món Ăn'
            subHeader=''
            submitCreate={createFood}
            arrLink={{ list: 'foods' }}
            dispatch={dispatch}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  foodCategories: state.foodCategory.items,
  loading: state.food.loading,
  error: state.food.error
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(FoodCreate)
