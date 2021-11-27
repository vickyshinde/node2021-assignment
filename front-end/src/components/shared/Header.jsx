import { NavLink } from 'react-router-dom';
import { deleteSession, getUserType, isAuthenticated } from '../../utility/comman-methods';
import { useEffect, useState } from 'react';

const Header = () => {
  const isLoggedIn = isAuthenticated();

  const [isLoggedUser, SetIsLoggedUser] = useState({});

  useEffect(() => {
    SetIsLoggedUser(getUserType(isLoggedIn));
  }, [isLoggedIn]);

  const onLoggedOut = () => {
    deleteSession();
    window.location.href = '/';
    // history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Assignment
        </NavLink>
        {isLoggedIn && (
          <span className="navbar-text">
            Welcome <b>{isLoggedUser.fname}</b>
          </span>
        )}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink exact to="/login" className="nav-link" activeClassName="text-white">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink exact to="/student-listing" className="nav-link" activeClassName="text-white">
                    Student Listing
                  </NavLink>
                </li>
                {isLoggedUser.userType === 1 && (
                  <li className="nav-item">
                    <NavLink exact to="/student-create" className="nav-link" activeClassName="text-white">
                      Student Create
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink exact to="/department-listing" className="nav-link" activeClassName="text-white">
                    Department Listing
                  </NavLink>
                </li>
                <li className="nav-item">
                  <span onClick={onLoggedOut} className="nav-link">
                    Logout
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
