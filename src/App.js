import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme.config';

import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          < Route exact path="/">
            <SignIn />
          </Route>
          < Route path="/sign-up">
            <SignUp />
          </Route> 
          < Route path= "/dashboard">
            <Dashboard />
          </Route> 
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
