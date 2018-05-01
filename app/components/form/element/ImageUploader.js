import React, { Component } from 'react'
import UploadPreview from 'material-ui-upload/UploadPreview'
import RaisedButton from 'material-ui/RaisedButton'

class ImageUploader extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount () {
    const { defaultValue } = this.props
    let pictures = {}

    if (defaultValue && defaultValue !== 'undefine' && defaultValue !== null) {
      pictures = defaultValue
    }

    this.props.input.onChange(pictures)
  }

  onChange(pictures) {
    this.props.input.onChange(pictures)
  }

  render() {
    const { label, name, defaultValue } = this.props

    let pictures = defaultValue

    if (defaultValue === null) {
      pictures = {}
    }

    return (
      <div id='image'>
        <UploadPreview
          name={name}
          title={label}
          label=''
          buttonControl={RaisedButton}
          initialItems={pictures}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default ImageUploader
