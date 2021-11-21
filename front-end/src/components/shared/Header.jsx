import { useLocation } from 'react-router-dom';

import { NavLink } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Assignment
        </NavLink>
        <span className="navbar-text">Welcome user</span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink exact to="/login" className="nav-link" activeClassName="text-primary">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/student-listing" className="nav-link" activeClassName="text-primary">
                Student Listing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/department-listing" className="nav-link" activeClassName="text-primary">
                Department Listing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/signup" className="nav-link" activeClassName="text-primary">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
