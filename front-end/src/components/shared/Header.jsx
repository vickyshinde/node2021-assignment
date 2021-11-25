import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { deleteSession, isAuthenticated } from '../../utility/comman-methods';

const Header = () => {
  const history = useHistory();
  const isLoggedIn = isAuthenticated();
  console.log(isLoggedIn);

  const onLoggedOut = () => {
    deleteSession();
    window.location.href = '/login';
    // history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Assignment
        </NavLink>
        <span className="navbar-text">Welcome user</span>
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
