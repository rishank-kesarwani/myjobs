import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Jobs from './pages/Jobs';
import PostJobs from './pages/PostJobs';
import Applicant from './pages/Applicant';
import { Logout } from './pages/Logout';
import {Header} from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
          <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={SignUp}/>
              <Route exact path="/forgot-password" component={ForgotPassword}/>
              <Route exact path="/jobs" component={Jobs}/>
              <Route exact path="/reset-password/:resetToken" component={ResetPassword}/>
              <Route exact path="/post-job" component={PostJobs}/>
              <Route exact path="/applicants" component={Applicant}/>
              <Route exact path="/logout" component={Logout}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;