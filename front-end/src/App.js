import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import HomeWrapped from './components/Home';
import Login from './components/Login';
import StudentListing from './components/StudentListing';
import StudentCreate from './components/StudentCreate';
import StudentUpdate from './components/StudentUpdate';
import DepartmentListing from './components/departmentListing';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="pageData">
        <Switch>
          <Route path="/" component={HomeWrapped} exact />
          <Route path="/login" component={Login} />
          <Route path="/student-listing" component={StudentListing} />
          <Route path="/student-create" component={StudentCreate} />
          <Route path="/student-update/:id" component={StudentUpdate} />
          <Route path="/department-listing" component={DepartmentListing} />
          <Redirect to="/" />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
