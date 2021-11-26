import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { addStudent, getDepartment } from '../config/api-endpoints';
import Banner from './shared/Banner';
import SubmitButtonWrapped from './shared/SubmitButton';
import UserInputWrapped from './shared/UserInput';

const initialValues = {
  fname: '',
  lname: '',
  role: '',
  email: '',
  contact: '',
  city: '',
  password: '',
  DeptId: '',
};

const StudentCreate = () => {
  const history = useHistory();

  const [studentObj, setStudentObj] = useState(initialValues);
  const [department, setDepartment] = useState([]);

  const { fname, lname, role, email, contact, city, password, DeptId } = studentObj;

  const [isInputValid, setIsInputValid] = useState({
    isfNameValid: false,
    islNameValid: false,
    isRoleValid: false,
    isCityValid: false,
    isEmailValid: false,
    isContactValid: false,
    isPasswordValid: false,
    isDeptIdValid: false,
  });

  const {
    isfNameValid,
    islNameValid,
    isRoleValid,
    isCityValid,
    isEmailValid,
    isContactValid,
    isPasswordValid,
    isDeptIdValid,
  } = isInputValid;

  const [isDisabled, setIsDisabled] = useState(false);

  const getAllDepartment = async () => {
    const response = await getDepartment();
    // console.log(response.data);
    setDepartment(response.data);
  };

  useEffect(() => {
    getAllDepartment();
  }, []);

  const onFirstNameChange = (fname) => {
    if (fname.length < 4) {
      setIsInputValid({
        ...isInputValid,
        isfNameValid: true,
      });
      setIsDisabled(false);
    } else {
      setIsInputValid({
        ...isInputValid,
        isfNameValid: false,
      });
      setIsDisabled(
        (isfNameValid, islNameValid, isRoleValid, isCityValid, isEmailValid, isContactValid, isPasswordValid)
      );
    }
    setStudentObj({
      ...studentObj,
      fname: fname,
    });
  };
  const onLastNameChange = (lname) => {
    if (lname.length < 4) {
      setIsInputValid({
        ...isInputValid,
        islNameValid: true,
      });
      setIsDisabled(false);
    } else {
      setIsInputValid({
        ...isInputValid,
        islNameValid: false,
      });
      setIsDisabled(
        (isfNameValid, islNameValid, isRoleValid, isCityValid, isEmailValid, isContactValid, isPasswordValid)
      );
    }
    setStudentObj({
      ...studentObj,
      lname: lname,
    });
  };

  const onRoleNoChange = (role) => {
    if (role.length < 2) {
      setIsInputValid({
        ...isInputValid,
        isRoleValid: true,
      });
      setIsDisabled(false);
    } else {
      setIsInputValid({
        ...isInputValid,
        isRoleValid: false,
      });
      setIsDisabled(
        (isfNameValid, islNameValid, isRoleValid, isCityValid, isEmailValid, isContactValid, isPasswordValid)
      );
    }
    setStudentObj({
      ...studentObj,
      role: role,
    });
  };

  const onCityChange = (city) => {
    if (city.length < 4) {
      setIsInputValid({
        ...isInputValid,
        isCityValid: true,
      });
      setIsDisabled(false);
    } else {
      setIsInputValid({
        ...isInputValid,
        isCityValid: false,
      });
      setIsDisabled(
        (isfNameValid, islNameValid, isRoleValid, isCityValid, isEmailValid, isContactValid, isPasswordValid)
      );
    }
    setStudentObj({
      ...studentObj,
      city: city,
    });
  };

  const onContactChange = (contact) => {
    if (contact.length < 9) {
      setIsInputValid({
        ...isInputValid,
        isContactValid: true,
      });
      setIsDisabled(false);
    } else {
      setIsInputValid({
        ...isInputValid,
        isContactValid: false,
      });
      setIsDisabled(
        (isfNameValid, islNameValid, isRoleValid, isCityValid, isEmailValid, isContactValid, isPasswordValid)
      );
    }
    setStudentObj({
      ...studentObj,
      contact: contact,
    });
  };

  const onEmailChange = (email) => {
    // console.log(email);
    let validEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);

    // email is typing
    if (email) {
      setIsInputValid({
        ...isInputValid,
        isEmailValid: true,
      });
      setIsDisabled(false);
    }

    // check email format
    if (validEmail) {
      setIsInputValid({
        ...isInputValid,
        isEmailValid: false,
      });
      setIsDisabled(
        (isfNameValid, islNameValid, isRoleValid, isCityValid, isEmailValid, isContactValid, isPasswordValid)
      );
    }
    setStudentObj({
      ...studentObj,
      email: email,
    });
  };
  const onPasswordChange = (password) => {
    var validPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);
    if (validPass) {
      setIsInputValid({
        ...isInputValid,
        isPasswordValid: false,
      });
      setIsDisabled(
        (isfNameValid, islNameValid, isRoleValid, isCityValid, isEmailValid, isContactValid, isPasswordValid)
      );
    } else {
      setIsInputValid({
        ...isInputValid,
        isPasswordValid: true,
      });
      setIsDisabled(false);
    }
    setStudentObj({
      ...studentObj,
      password: password,
    });
  };

  const onDeptIdChange = (DeptId) => {
    setStudentObj({
      ...studentObj,
      DeptId: DeptId,
    });
  };

  const addStudentDetails = async () => {
    await addStudent(studentObj);
  };

  const onSubmitClick = (e) => {
    e.preventDefault();

    if (DeptId === '') {
      setIsInputValid({
        ...isInputValid,
        isDeptIdValid: true,
      });
    } else {
      setIsInputValid({
        ...isInputValid,
        isDeptIdValid: false,
      });
      addStudentDetails();
      console.log(studentObj);
      history.push('/student-listing');
    }
  };
  return (
    <>
      <Banner title="Create Student" />
      <div className="container">
        <form onSubmit={onSubmitClick}>
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <UserInputWrapped
                label="First Name"
                id="name"
                name="name"
                type="text"
                clsName="form-control"
                placeholder="Enter first name"
                errorMsg={'Please enter name min 4 character'}
                isValid={isfNameValid}
                onChange={onFirstNameChange}
                val={fname}
              />
              {/* 1 */}
              <UserInputWrapped
                label="Last Name"
                id="lname"
                name="lname"
                type="text"
                clsName="form-control"
                placeholder="Enter Last name"
                errorMsg={'Please enter last name min 4 character'}
                isValid={islNameValid}
                onChange={onLastNameChange}
                val={lname}
              />
              {/* 2 */}
              <UserInputWrapped
                label="Role No"
                id="role"
                name="role"
                type="number"
                clsName="form-control"
                placeholder="Enter Role No."
                errorMsg={'Please enter role no.'}
                isValid={isRoleValid}
                onChange={onRoleNoChange}
                val={role}
              />
              <UserInputWrapped
                label="Email address"
                id="email"
                name="email"
                type="email"
                clsName="form-control"
                placeholder="Enter email"
                errorMsg={'Please enter valid email id'}
                isValid={isEmailValid}
                onChange={onEmailChange}
                val={email}
              />
              {/* 3 */}
              <UserInputWrapped
                label="City"
                id="city"
                name="city"
                type="text"
                clsName="form-control"
                placeholder="Enter city name"
                errorMsg={'Please enter valid city name'}
                isValid={isCityValid}
                onChange={onCityChange}
                val={city}
              />
              <UserInputWrapped
                label="Contact"
                id="contact"
                name="contact"
                type="number"
                clsName="form-control"
                placeholder="Enter contact no"
                errorMsg={'Please enter valid contact no'}
                isValid={isContactValid}
                onChange={onContactChange}
                val={contact}
              />
              <UserInputWrapped
                label="Password"
                id="password"
                name="password"
                type="password"
                clsName="form-control"
                placeholder="Enter password"
                errorMsg={'Please enter min 8 character, least one digit, one lowercase, one uppercase'}
                isValid={isPasswordValid}
                onChange={onPasswordChange}
                val={password}
              />
              <UserInputWrapped
                selectList={department}
                label="Deptname"
                id="deptname"
                name="deptname"
                type="select"
                clsName="custom-select"
                placeholder="Enter select Deptname"
                errorMsg={'Please enter select Deptname'}
                isValid={isDeptIdValid}
                onChange={onDeptIdChange}
                val={DeptId}
              />
              <div className="row">
                <div className="offset-3 col-sm-9">
                  <SubmitButtonWrapped
                    disabled={!isDisabled}
                    title="Submit"
                    clsName="btn btn-outline-success mb-4 mr-4"
                  />
                  <SubmitButtonWrapped
                    title="< Back"
                    clsName="btn btn-outline-info mb-4"
                    onClick={() => {
                      history.push('/student-listing');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentCreate;
