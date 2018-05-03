import React, {Component} from 'react'
import { Field, change } from 'redux-form'
import { connect } from 'react-redux'
import R from 'ramda'
import {Tabs, Tab} from 'material-ui/Tabs'

import InputTextArea from 'components/form/element/InputTextArea'
import InputText from 'components/form/element/InputText'
import SubmitButton from 'components/form/element/SubmitButton'

class SendEditRequestForm extends Component {
  render() {
    const { orderingId, submitting, handleSubmit } = this.props
    let tableIdDefault = ''

    return (
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <Field
          name='message'
          component={InputText}
          type='text'
          defaultValue=''
          label='Nội dung'
          required={true}
        />
        <Field
          name='orderingId'
          component={InputText}
          type='hidden'
          defaultValue={orderingId}
        />
        <div className='col-md-12' style={{ textAlign: 'center' }}>
          <SubmitButton
            text='Gửi yêu cầu'
            submitting={submitting}
            className='btn btn-primary'
          />
        </div>
      </form>
    )
  }
}

export default SendEditRequestForm