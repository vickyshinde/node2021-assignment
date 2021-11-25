import { useEffect, useState } from 'react';
import Loading from './shared/Loading';
import { getDepartment } from '../config/api-endpoints';
import Banner from './shared/Banner';

const DepartmentListing = () => {
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllDepartment = async () => {
    const response = await getDepartment();
    // console.log(response.data);
    setDepartment(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllDepartment();
  }, []);

  return (
    <>
      <Banner title="Department Listing" />
      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr className="table-info">
                <th scope="col">Dept Id</th>
                <th scope="col">name</th>
                <th scope="col">HOD</th>
                <th scope="col">Contact</th>
              </tr>
            </thead>
            <tbody>
              {department.map((item) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <th scope="row">{item.hod}</th>
                    <td>{item.contact}</td>
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

export default DepartmentListing;
