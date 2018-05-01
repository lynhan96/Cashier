import React from 'react'
import CKEditor from 'react-ckeditor-component'

class CkEditor extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.props.input.onChange(event.editor.getData())
  }

  render() {
    const { name, defaultValue, label } = this.props

    return (
      <div className='form-group label-floating' style={{ marginTop: '0' }}>
        <label>{label}</label>
        <CKEditor
          name={name}
          activeClass='p10'
          content={defaultValue}
          events={{
            'change': this.handleChange
          }}
        />
      </div>
    )
  }
}

export default CkEditor
