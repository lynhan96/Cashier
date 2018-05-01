import React from 'react'

// We receive props from ReduxForm's Field
// and turn them into props for Bootstrap forms
const EditFormInputText = (props) => {
  const { required, name, defaultValue, input, label, type = 'text' } = props
  // pass onBlur to enable touched flag
  // pass onChange so the ReduxForm can work
  const { onChange } = input

  return (
    <div className='form-group label-floating' style={{ marginTop: '0' }}>
      <label>{label}</label>
      <input type={type} className='form-control' name={name} required={required} defaultValue={defaultValue} onChange={onChange}/>
    </div>
  )
}

export default EditFormInputText
