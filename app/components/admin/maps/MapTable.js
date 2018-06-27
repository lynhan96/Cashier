import React, { Component } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import {Tabs, Tab} from 'material-ui/Tabs'
import 'styles/website.less'

import { isAdmin } from 'components/wrappers/isAdmin'
import { updateActiveLink } from 'ducks/admin'
import ContentLoading from 'components/ContentLoading'
import MapElement from 'components/admin/maps/MapElement'
import { fetchNotifications } from 'lib/actions/notification'

class MapTable extends Component {
  componentDidMount() {
    this.props.dispatch(fetchNotifications())
    this.props.dispatch(updateActiveLink('map-tables'))
  }

  render() {
    const { error, zones, table, dispatch } = this.props

    if (error) {
      return (
        <ContentLoading
          error={error}
          message='Quá trình tải dữ liệu xảy ra lỗi!'
        />
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <div className='row'>
            <Tabs>
              {R.values(zones).map((value, index) => {
                const imageUrl = R.values(value.imageUrl)[0]
                const zoneId = R.keys(zones)[index]
                let tables = null
                let tableKeys = null

                if (table != null) {
                  tables = R.filter(data => data.zoneId === zoneId)(R.values(table))
                  tableKeys = R.keys(table)
                }

                return (
                  <Tab label={value.name} key={index}>
                    <div className='card'>
                      <section style={{ padding: '5px', backgroundImage: 'url("' + imageUrl + '")', backgroundSize: 'cover' }}>
                        <div className='container-fluid table-container'>
                          {tables == null ? '' :
                            tables.map((value, tableIndex) => {
                              return (
                                <MapElement
                                  id = {tableKeys[tableIndex]}
                                  item={value}
                                  key={tableIndex}
                                  dispatch={dispatch}
                                />
                              )
                            })
                          }
                        </div>
                      </section>
                    </div>
                  </Tab>
                )
              })}
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  zones: state.zone.items,
  table: state.table.items
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(MapTable)
