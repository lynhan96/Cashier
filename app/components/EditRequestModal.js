import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { reduxForm } from 'redux-form'
import SendEditRequestForm from 'components/form/SendEditRequestForm'
import { sendEditRequest } from 'lib/actions/ordering'
import { connect } from 'react-redux'
import { changeOrderModal } from 'ducks/modal'

class EditRequestModal extends Component {
  constructor(props, context) {
    super(props, context)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.props.dispatch(changeOrderModal(false))
  }

  handleShow() {
    this.props.dispatch(changeOrderModal(true))
  }

  render() {
    const { orderingId } = this.props

    return (
      <div>
        <Modal
          show={this.props.orderModal}
          onHide={this.handleClose}
        >
          <Modal.Body>
            <h2 style={{textAlign: 'center', margin: '0'}}>Gửi yêu cầu thay đổi thông tin hóa đơn</h2>
            <DecoratedSendEditRequestForm
              orderingId={orderingId}
            />
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const DecoratedSendEditRequestForm = reduxForm({
  form: 'editRequest',
  onSubmit: sendEditRequest
})(SendEditRequestForm)

const mapStateToProps = state => ({
  orderModal: state.modal.orderModal
})

export default connect(mapStateToProps)(EditRequestModal)
