import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  // Store
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  // Router
  const navigate = useNavigate()

  // Methods
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate('/login')
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <nav>
        <ul>
        {user ?
          (<li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Log Out
            </button>
          </li>)
          :
          (<>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Log In
              </Link>
            </li>

            <li>
              <Link to="/register">
                <FaUser /> Sign In
              </Link>
            </li>
          </>)
        }
        </ul>
      </nav>
    </header>
  )
}

export default Header