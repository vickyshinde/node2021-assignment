import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Loading from './shared/Loading';
import { getStudents, deleteStudent } from '../config/api-endpoints';

import Banner from './shared/Banner';
import { getUserType, isAuthenticated } from '../utility/comman-methods';
import UserInputWrapped from './shared/UserInput';
import StudentList from './StudentRow';

const StudentListing = () => {
  const isLoggedIn = isAuthenticated();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedUser, setIsLoggedUser] = useState({});

  const getAllUsers = async () => {
    const response = await getStudents();
    // console.log(response.data);
    setIsLoggedUser(getUserType(isLoggedIn));
    setUsers(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you wanted to delete the student')) {
      await deleteStudent(id);
      getAllUsers();
    }
  };

  // search
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue) => {
    // console.log(searchValue);
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = users.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      console.log(filteredData);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(users);
    }
  };

  return (
    <>
      <Banner title="Student Listing" />
      <div className="container">
        {isLoggedUser.userType === 1 && (
          <div>
            <NavLink exact className="btn btn-outline-danger mb-4" to="/student-create">
              Create Student
            </NavLink>
          </div>
        )}
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="d-flex justify-content-between">
              <div>
                <p className="d-none">Filter by Department - All, abc, abc</p>
              </div>
              <div>
                <UserInputWrapped
                  label="Search"
                  name="search"
                  type="text"
                  clsName="form-control"
                  placeholder="Search..."
                  onChange={searchItems}
                  val={searchInput}
                />
              </div>
            </div>
            <StudentList
              users={searchInput.length < 1 ? users : filteredResults}
              isLoggedUser={isLoggedUser}
              handleDelete={handleDelete}
            />
          </>
        )}
      </div>
    </>
  );
};

export default StudentListing;
