import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import ErrorMessage from 'components/ErrorMessage'

const ContentLoading = (props) => {
  const { error, message } = props

  return (
    <div className='content'>
      <div className='container-fluid'>
        <div className='card'>
          <div style={style.loadingWrapper}>
            <CircularProgress size={60} thickness={7} />
            <p style={style.loadingText}>{message}</p>
          </div>
          {error && <ErrorMessage text={error} />}
        </div>
      </div>
    </div>
  )
}

export default ContentLoading

const style = {
  loadingWrapper: {
    textAlign: 'center',
    margin: '30px'
  },
  loadingIcon: {
    fontSize: '30px'
  },
  loadingText: {
    fontSize: '17px',
    marginTop: '10px'
  }
}
