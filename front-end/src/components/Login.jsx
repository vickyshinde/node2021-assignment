import { useState } from 'react';
import { useHistory } from 'react-router';
import { loginStudent } from '../config/api-endpoints';
import Banner from './shared/Banner';
import SubmitButtonWrapped from './shared/SubmitButton';
import UserInputWrapped from './shared/UserInput';

const Login = () => {
  const history = useHistory();

  const [studentObj, setStudentObj] = useState({
    email: '',
    password: '',
  });

  const { email, password } = studentObj;

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const onEmailChange = (email) => {
    // console.log(email);
    let validEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);

    // email is typing
    if (email) {
      setIsEmailValid(true);
      setIsDisabled(false);
    }

    // check email format
    if (validEmail) {
      setIsEmailValid(false);
      setIsDisabled(isEmailValid && isPasswordValid);
    } else {
      // console.log("invalid");
    }
    setStudentObj({
      ...studentObj,
      email: email,
    });
  };
  const onPasswordChange = (password) => {
    if (password.length > 4) {
      setIsPasswordValid(false);
      setIsDisabled(!(isEmailValid && isPasswordValid));
      // console.log('true');
    } else {
      // console.log('fasle');
      setIsPasswordValid(true);
      setIsDisabled(false);
    }
    setStudentObj({
      ...studentObj,
      password: password,
    });
  };

  const onSubmitClick = async (e) => {
    e.preventDefault();

    console.log(studentObj);

    const res = await loginStudent(studentObj);

    // console.log(res);
    // console.log(res.data.message);

    if (res.data.status === 422) {
      setIsFormValid(true);
    } else {
      // history.push('/student-listing');
      window.location.href = '/student-listing';
      // console.log(document.cookie);
    }
  };
  return (
    <>
      <Banner title="Student Add" />
      <div className="container">
        <form onSubmit={onSubmitClick}>
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              {isFormValid && (
                <div className="alert alert-danger" role="alert">
                  You entered an incorrect email / username or password.
                </div>
              )}
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

              <UserInputWrapped
                label="Password"
                id="password"
                name="password"
                type="password"
                clsName="form-control"
                placeholder="Enter password"
                errorMsg={'Please enter password'}
                isValid={isPasswordValid}
                onChange={onPasswordChange}
                val={password}
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
                      history.push('/user-listing');
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

export default Login;
