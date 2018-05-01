import React from 'react'

const SubmitButton = (props) => {
  const { style, className, onClick, submitting, text = 'Xác nhận', submittingText = 'Đang xác nhận...' } = props

  return (
    <button
      style={style}
      className= {className}
      onClick={onClick}
      disabled={submitting}
      type='submit'
      value={text}
    >
      {submitting ? submittingText : text}
    </button>
  )
}

export default SubmitButton
