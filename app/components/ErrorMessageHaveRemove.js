import React from 'react'

const ErrorMessageHaveRemove = (props) => {
  const { text } = props

  return (
    <div className='alert alert-danger' data-notify='container'>
      <button type='button' aria-hidden='true' data-dismiss='alert' className='close'>
        <span aria-hidden='true'>&times;</span>
      </button>
      <i className='icon fa fa-ban' style={{ marginRight: '10px' }}></i>
      {typeof text === 'object' ? '' : text}
    </div>
  )
}

export default ErrorMessageHaveRemove
