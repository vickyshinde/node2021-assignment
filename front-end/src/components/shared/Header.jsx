import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Assignment
        </NavLink>
        <span className="navbar-text">Welcome user</span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink exact to="/login" className="nav-link" activeClassName="text-white">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/student-listing" className="nav-link" activeClassName="text-white">
                Student Listing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/student-create" className="nav-link" activeClassName="text-white">
                Student Create
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/department-listing" className="nav-link" activeClassName="text-white">
                Department Listing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/signup" className="nav-link" activeClassName="text-white">
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
