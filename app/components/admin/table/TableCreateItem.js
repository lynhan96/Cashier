import React, { Component } from 'react'
import R from 'ramda'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

import CreateForm from 'components/form/CreateForm'
import { isAdmin } from 'components/wrappers/isAdmin'

class TableCreateItem extends Component {
  render() {
    const { customSelectFieldData, selectFieldData, submitCreate, editFieldInfo, editHeader, subHeader, arrLink } = this.props

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
                <div>
                  <Link to={arrLink.list} className='btn btn-success btn-round' style={style.buttonMargin}>
                    Trở lại
                  </Link>
                </div>
                <DecoratedCreateForm
                  editFieldInfo={editFieldInfo}
                  selectFieldData={selectFieldData}
                  customSelectFieldData={customSelectFieldData}
                  onSubmit={submitCreate}
                />
              </div>
            </div>
        </div>
      </div>
    )
  }
}

const DecoratedCreateForm = reduxForm({
  form: 'create'
})(CreateForm)

export default R.pipe(
  isAdmin
)(TableCreateItem)

const style = {
  buttonMargin: {
    margin: '5px 15px 10px 15px'
  }
}
