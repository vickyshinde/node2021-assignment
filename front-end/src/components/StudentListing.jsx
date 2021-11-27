import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import Loading from './shared/Loading';
import { getStudents, deleteStudent } from '../config/api-endpoints';
import SubmitButtonWrapped from './shared/SubmitButton';
import Banner from './shared/Banner';
import { getUserType, isAuthenticated } from '../utility/comman-methods';
import UserInputWrapped from './shared/UserInput';

const StudentListing = () => {
  const isLoggedIn = isAuthenticated();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedUser, setIsLoggedUser] = useState({});

  const history = useHistory();

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
            <table className="table table-bordered">
              <thead>
                <tr className="table-info">
                  <th scope="col">Sid</th>
                  <th scope="col">Deptname</th>
                  <th scope="col">Role No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th className="d-none" scope="col">
                    Password
                  </th>
                  <th scope="col">City</th>
                  <th scope="col">Contact</th>
                  {isLoggedUser.userType === 1 && (
                    <th scope="col" className="text-right">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {searchInput.length > 1 ? (
                  <>
                    {filteredResults.map((item) => {
                      return (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td>{item.Deptname}</td>
                          <th scope="row">{item.role}</th>
                          <td>
                            {item.fname} {item.lname}
                          </td>
                          <td>{item.email}</td>
                          <td className="d-none">{item.password}</td>
                          <td>{item.city}</td>
                          <td>{item.contact}</td>
                          {isLoggedUser.userType === 1 && (
                            <td className="text-right">
                              <SubmitButtonWrapped
                                // disabled={!isDisabled}
                                title="Update"
                                clsName="btn btn-outline-success btn-sm ml-1"
                                onClick={() => {
                                  history.push(`/student-update/${item.id}`);
                                }}
                              />
                              <SubmitButtonWrapped
                                // disabled={!isDisabled}
                                title="Delete"
                                clsName="btn btn-outline-warning btn-sm ml-1"
                                onClick={() => handleDelete(item.id)}
                              />
                            </td>
                          )}
                        </tr>
                      );
                    })}
                    {!filteredResults.length && (
                      <tr>
                        <td colSpan="8">not found</td>
                      </tr>
                    )}
                  </>
                ) : (
                  users.map((item) => {
                    return (
                      <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.Deptname}</td>
                        <th scope="row">{item.role}</th>
                        <td>
                          {item.fname} {item.lname}
                        </td>
                        <td>{item.email}</td>
                        <td className="d-none">{item.password}</td>
                        <td>{item.city}</td>
                        <td>{item.contact}</td>
                        {isLoggedUser.userType === 1 && (
                          <td className="text-right">
                            <SubmitButtonWrapped
                              // disabled={!isDisabled}
                              title="Update"
                              clsName="btn btn-outline-success btn-sm ml-1"
                              onClick={() => {
                                history.push(`/student-update/${item.id}`);
                              }}
                            />
                            <SubmitButtonWrapped
                              // disabled={!isDisabled}
                              title="Delete"
                              clsName="btn btn-outline-warning btn-sm ml-1"
                              onClick={() => handleDelete(item.id)}
                            />
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default StudentListing;
