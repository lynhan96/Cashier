import React, {Component} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Navigator from 'lib/Navigator'
import { fetchFoodCategories } from 'lib/actions/foodCategory'
import { fetchFoods } from 'lib/actions/food'

class SideBar extends Component {
  constructor (props) {
    super(props)
    this.changePage = this.changePage.bind(this)
    this.reloadMenu = this.reloadMenu.bind(this)
  }

  reloadMenu() {
    this.props.dispatch(fetchFoods())
    this.props.dispatch(fetchFoodCategories())
  }

  changePage(index) {
    this.props.dispatch(fetchFoods())
    this.props.dispatch(fetchFoodCategories())
    Navigator.push('foods?index=' + index)
  }

  isActive (value) {
    return 'category ' + (window.location.href.includes('index=' + value) ? 'active' : '')
  }

  render() {
    const { admin } = this.props
    const { activeLink, signedIn } = admin

    if (signedIn) {
      return (
        <div className='sidebar slde-bar-bg-image' data-color='purple'>
          <div className='logo'>
            <Link to='dashboard' className='simple-text'>
              BK Food
            </Link>
          </div>
          <div className='sidebar-wrapper'>
            <ul className='nav'>
              <li className={activeLink === 'map-tables' ? 'active' : ''}>
                <Link to='map-tables'>
                  <i className='material-icons'>map</i>
                  <p>Sơ đồ bàn ăn</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )
    } else {
      return (<div/>)
    }
  }
}

const mapStateToProps = (state) => ({
  admin: state.admin
})

export default connect(mapStateToProps)(SideBar)
