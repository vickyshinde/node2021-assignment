import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Loading from './shared/Loading';
import { getStudents, deleteStudent, getDepartment } from '../config/api-endpoints';

import Banner from './shared/Banner';
import { getUserType, isAuthenticated } from '../utility/comman-methods';
import UserInputWrapped from './shared/UserInput';
import StudentList from './StudentRow';

const StudentListing = () => {
  const isLoggedIn = isAuthenticated();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedUser, setIsLoggedUser] = useState({});
  const [department, setDepartment] = useState([]);

  const getAllUsers = async () => {
    const response = await getStudents();
    // console.log(response.data);
    setIsLoggedUser(getUserType(isLoggedIn));
    setUsers(response.data);
    setFilterUsers(response.data);
    setLoading(false);
  };

  const getAllDepartment = async () => {
    const response = await getDepartment();
    // console.log(response.data);
    setDepartment(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllDepartment();
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
      // console.log(filteredData);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(users);
    }
  };

  // filter
  const [filterActiveTab, setFilterActiveTab] = useState('all');
  const [filterUsers, setFilterUsers] = useState([]);

  const filterList = (filterWithDept) => {
    // console.log(filterWithDept);
    if (filterWithDept === 'all') {
      setFilterActiveTab('all');
      setUsers(filterUsers);
      // console.log(users);
      return;
    }

    const updatedItem = filterUsers.filter((item) => {
      return item.Deptname === filterWithDept;
    });
    setFilterActiveTab(filterWithDept);
    setUsers(updatedItem);
  };

  // sort
  const [order, setOrder] = useState('ASC');
  const [orderActiveCol, setOrderActiveCol] = useState('');
  const [orderActive, setOrderActive] = useState('');

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...users].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? 1 : -1
      );
      setOrderActiveCol(col);
      setUsers(sorted);
      setOrder('DSC');
      setOrderActive('ASC');
    }
    if (order === 'DSC') {
      const sorted = [...users].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase() ? 1 : -1
      );
      setUsers(sorted);
      setOrderActiveCol(col);
      setOrder('ASC');
      setOrderActive('DSC');
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
                <p>
                  Filter by Department -
                  <span
                    onClick={() => filterList('all')}
                    className={`btn btn-outline-info ${'all' === filterActiveTab ? 'btn-outline-danger' : 'false'}`}>
                    All{' '}
                  </span>
                  {department.map((item) => {
                    return (
                      <span
                        key={item.id}
                        onClick={() => filterList(item.name)}
                        className={`btn btn-outline-info ${
                          item.name === filterActiveTab ? 'btn-outline-danger' : 'false'
                        }`}>
                        {item.name}{' '}
                      </span>
                    );
                  })}
                </p>
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
              orderActiveCol={orderActiveCol}
              orderActive={orderActive}
              order={order}
              users={searchInput.length < 1 ? users : filteredResults}
              isLoggedUser={isLoggedUser}
              handleDelete={handleDelete}
              sorting={sorting}
            />
            {orderActiveCol}
          </>
        )}
      </div>
    </>
  );
};

export default StudentListing;
