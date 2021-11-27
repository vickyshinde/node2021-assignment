import SubmitButtonWrapped from './shared/SubmitButton';
import { useHistory } from 'react-router';

const StudentList = ({ users, isLoggedUser, handleDelete }) => {
  const history = useHistory();
  console.log(users.length);
  console.log(users);
  return (
    <>
      {!users.length > 0 ? (
        <tr>
          <td colSpan="8">not found</td>
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
    </>
  );
};

export default StudentList;
