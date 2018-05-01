import React from 'react'
// We receive props from ReduxForm's Field
// and turn them into props for Bootstrap forms
class CustomSelectField extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount () {
    const { customSelectFieldData, fieldName, defaultValue } = this.props

    if (defaultValue) {
      this.props.input.onChange(this.props.defaultValue)
    } else {
      this.props.input.onChange(customSelectFieldData[fieldName].value[0])
    }
  }

  handleChange (event) {
    this.props.input.onChange(event.target.value)
  }

  render() {
    const { input, customSelectFieldData, fieldName, defaultValue, label } = this.props
    let value = defaultValue

    if (input.value) {
      value = input.value
    }

    return (
      <div className='form-group label-floating' style={{ marginTop: '0' }}>
        {label && <label>{label}</label>}
        <select
          className='form-control'
          onChange={this.handleChange}
          value={value}
        >
          {customSelectFieldData[fieldName].view.map((item, index) => {
            return (
              <option value={customSelectFieldData[fieldName].value[index]} key={index}>{item}</option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default CustomSelectField
