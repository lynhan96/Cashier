import React from 'react'

class SelectField extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount () {
    this.props.input.onChange(this.props.selectFieldData[this.props.fieldName][0])
  }

  handleChange (event) {
    this.props.input.onChange(event.target.value)
  }

  render() {
    const { input, selectFieldData, fieldName, defaultValue, label } = this.props
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
          {selectFieldData[fieldName].map((item, index) => {
            return (
              <option value={item} key={index}>{item}</option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default SelectField
