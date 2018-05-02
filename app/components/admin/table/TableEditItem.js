import React, { Component } from 'react'
import R from 'ramda'
import { reduxForm } from 'redux-form'

import EditForm from 'components/form/EditForm'
import ListAction from 'components/admin/table/tableEditElement/ListAction'
import { isAdmin } from 'components/wrappers/isAdmin'

class TableEditItem extends Component {
  render() {
    const { customSelectFieldData, selectFieldData, dispatch, deleteItem, submitEdit, itemIndex, editFieldInfo, editHeader, items, subHeader, arrLink } = this.props

    return (
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
            <div className='card'>
              <div className='card-header' data-background-color='purple'>
                <h4 className='title'>{editHeader}</h4>
                <p className='category'>{subHeader}</p>
              </div>
              <div className='card-content'>
                <ListAction
                  dispatch={dispatch}
                  deleteItem={deleteItem}
                  arrLink={arrLink}
                  itemIndex={itemIndex}
                  items={items}
                />
                <DecoratedEditForm
                  itemIndex={itemIndex}
                  items={items}
                  editFieldInfo={editFieldInfo}
                  onSubmit={submitEdit}
                  selectFieldData={selectFieldData}
                  customSelectFieldData={customSelectFieldData}
                />
              </div>
            </div>
        </div>
      </div>
    )
  }
}

const DecoratedEditForm = reduxForm({
  form: 'edit'
})(EditForm)

export default R.pipe(
  isAdmin
)(TableEditItem)
