import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="header-nav-container">
        <Link to="/" className="link-item">
          <img
            className="website-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>

        <ul className="header-items-container">
          <li className="item">
            <Link to="/" className="link-item">
              Home
            </Link>
          </li>

          <li className="item">
            <Link to="/jobs" className="link-item">
              Jobs
            </Link>
          </li>
        </ul>

        <div className="button-container">
          <ul className="nav-items-conntainer">
            <li className="nav-item">
              <Link to="/" className="link-item">
                <AiFillHome className="nav-icon" size={20} />
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/jobs" className="link-item">
                <BsBriefcaseFill className="nav-icon" size={20} />
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="logout-icon"
                onClick={onClickLogoutButton}
              >
                <FiLogOut className="nav-icon" size={20} />
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
