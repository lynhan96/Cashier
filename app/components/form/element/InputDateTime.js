import React from 'react'
import moment from 'moment'
import DatePicker from 'material-ui/DatePicker'
// We receive props from ReduxForm's Field
// and turn them into props for Bootstrap forms
class InputDateTime extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (nilValue, date) {
    this.props.input.onChange(moment.utc(date))
  }

  render() {
    const { defaultValue, label } = this.props

    let defaultTime = defaultValue

    if (!defaultValue) {
      defaultTime = new Date()
    }

    return (
      <div className='form-group label-floating' style={{ marginTop: '0' }}>
        {label && <label>{label}</label>}
        <DatePicker
          className='form-control'
          name='datetimePiker'
          openToYearSelection={true}
          defaultDate={new Date(defaultTime)}
          onChange={this.handleChange}
          mode='landscape'
          cancelLabel='Hủy'
          okLabel='Chọn'
          textFieldStyle={style.dateTimeInput}
          formatDate={(date) => moment.utc(date).add(7, 'hours').format('YYYY-MM-DD')}
        />
      </div>
    )
  }
}

export default InputDateTime

const style = {
  dateTimeInput: {
    width: '100%',
    height: '36px',
    fontSize: '14px',
    paddingBottom: '14px'
  }
}
