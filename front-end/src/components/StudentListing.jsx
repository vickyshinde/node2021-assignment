import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import Loading from './shared/Loading';
import { getStudents, deleteStudent } from '../config/api-endpoints';
import SubmitButtonWrapped from './shared/SubmitButton';
import Banner from './shared/Banner';

const StudentListing = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getAllUsers = async () => {
    const response = await getStudents();
    // console.log(response.data);
    // debugger;
    setUsers(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you wanted to delete the User')) {
      await deleteStudent(id);
      getAllUsers();
    }
  };

  return (
    <>
      <Banner title="Student Listing" />
      <div className="container">
        <div>
          <NavLink exact className="btn btn-primary mb-4" to="/student-add">
            Add Student
          </NavLink>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Sid</th>
                <th scope="col">Role No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">City</th>
                <th scope="col">Contact</th>
                <th scope="col">Deptname</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <th scope="row">{item.role}</th>
                    <td>
                      {item.fname} {item.lname}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.city}</td>
                    <td>{item.contact}</td>
                    <td>{item.Deptname}</td>
                    <td>
                      <SubmitButtonWrapped
                        // disabled={!isDisabled}
                        title="Edit"
                        clsName="btn btn-warning btn-sm ml-1"
                        onClick={() => {
                          history.push(`/user-edit/${item.id}`);
                        }}
                      />
                      <SubmitButtonWrapped
                        // disabled={!isDisabled}
                        title="X"
                        clsName="btn btn-danger btn-sm ml-1"
                        onClick={() => handleDelete(item.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default StudentListing;