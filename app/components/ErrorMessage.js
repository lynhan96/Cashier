import React from 'react'

const ErrorMessage = (props) => {
  const { text } = props

  return (
    <div className='alert alert-danger alert-dismissible'>
      <i className='icon fa fa-ban' style={{ marginRight: '10px' }}></i>
      {typeof text === 'object' ? '' : text}
    </div>
  )
}

export default ErrorMessage
