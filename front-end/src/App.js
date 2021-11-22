import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import HomeWrapped from './components/Home';
// import LoginWrapped from './components/Login';
// import SignupWrapped from './components/Signup';
// import DashboardWrapped from './components/Dashboard';
import StudentListing from './components/StudentListing';
import StudentAdd from './components/StudentAdd';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="pageData">
        <Switch>
          <Route path="/" component={HomeWrapped} exact />
          {/* <Route path="/login" component={LoginWrapped} />
            <Route path="/signup" component={SignupWrapped} />
            <Route path="/dashboard" component={DashboardWrapped} />*/}
          <Route path="/student-listing" component={StudentListing} />
          <Route path="/student-add" component={StudentAdd} />
          <Redirect to="/" />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;