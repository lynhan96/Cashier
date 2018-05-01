import React from 'react'

// We receive props from ReduxForm's Field
// and turn them into props for Bootstrap forms
class InputText extends React.Component {
  componentDidMount() {
    const { defaultValue } = this.props

    if (defaultValue) {
      this.props.input.onChange(defaultValue)
    }
  }

  render() {
    const { required, input, label, type = 'text', defaultValue, style } = this.props
    const { onChange } = input

    return (
      <div className='form-group label-floating' style={style}>
        {label && <label className='control-label'>{label}</label>}
        <input type={type} className='form-control' required={required} defaultValue={defaultValue} onChange={onChange}/>
      </div>
    )
  }
}

export default InputText
