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
    if (window.confirm('Are you wanted to delete the student')) {
      await deleteStudent(id);
      getAllUsers();
    }
  };

  return (
    <>
      <Banner title="Student Listing" />
      <div className="container">
        <div>
          <NavLink exact className="btn btn-outline-danger mb-4" to="/student-create">
            Create Student
          </NavLink>
        </div>
        {loading ? (
          <Loading />
        ) : (
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
                <th scope="col" className="text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => {
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
