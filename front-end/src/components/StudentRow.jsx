import SubmitButtonWrapped from './shared/SubmitButton';
import { useHistory } from 'react-router';

const StudentList = ({ users, isLoggedUser, handleDelete, sorting, orderActiveCol, orderActive }) => {
  const history = useHistory();
  // console.log(users.length);
  // console.log(users);
  return (
    <table className="table table-bordered">
      <thead>
        <tr className="table-info">
          <th
            scope="col"
            className={`sort ${orderActiveCol === 'id' ? `active${orderActive}` : ''}`}
            onClick={() => sorting('id')}>
            Sid
          </th>
          <th
            scope="col"
            className={`sort ${orderActiveCol === 'Deptname' ? `active${orderActive}` : ''}`}
            onClick={() => sorting('Deptname')}>
            Deptname
          </th>
          <th
            scope="col"
            className={`sort ${orderActiveCol === 'role' ? `active${orderActive}` : ''}`}
            onClick={() => sorting('role')}>
            Role No
          </th>
          <th
            scope="col"
            className={`sort ${orderActiveCol === 'fname' ? `active${orderActive}` : ''}`}
            onClick={() => sorting('fname')}>
            Name
          </th>
          <th
            scope="col"
            className={`sort ${orderActiveCol === 'email' ? `active${orderActive}` : ''}`}
            onClick={() => sorting('email')}>
            Email
          </th>
          <th className="d-none" scope="col">
            Password
          </th>
          <th
            scope="col"
            className={`sort ${orderActiveCol === 'city' ? `active${orderActive}` : ''}`}
            onClick={() => sorting('city')}>
            City
          </th>
          <th
            scope="col"
            className={`sort ${orderActiveCol === 'contact' ? `active${orderActive}` : ''}`}
            onClick={() => sorting('contact')}>
            Contact
          </th>
          {isLoggedUser.userType === 1 && (
            <th scope="col" className="text-right">
              Action
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {!users.length > 0 ? (
          <tr>
            <td colSpan="8">Result not found</td>
          </tr>
        ) : (
          <>
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
                  {isLoggedUser.userType === 1 && (
                    <td className="text-right">
                      <SubmitButtonWrapped
                        title="Update"
                        clsName="btn btn-outline-success btn-sm ml-1"
                        onClick={() => {
                          history.push(`/student-update/${item.id}`);
                        }}
                      />
                      <SubmitButtonWrapped
                        title="Delete"
                        clsName="btn btn-outline-warning btn-sm ml-1"
                        onClick={() => handleDelete(item.id)}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </>
        )}
      </tbody>
    </table>
  );
};

export default StudentList;
