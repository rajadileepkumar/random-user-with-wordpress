import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Header from './component/HeaderComponent';
import Footer from './component/FooterComponent';
import Home from './component/Home';
import Page from './component/Page'
import Login from './component/Login';
import Admin from './component/admin/Admin';
import Users from './component/admin/Users';
import HelperProfile from './HelperProfile'
import Products from './component/Products';
import HelperProduct from './helpers/HelperProduct';

class App extends Component {

  loginAuthenticate = () => {
    fakeAuth.isAuthenticated = true
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header/>
            <Route path="/" exact component={Home} />
            <Route path="/page" exact component={Page} />
            <Route path="/products" exact component={Products}/>
            <Route path="/product/:id" exact component={HelperProduct}/>
            <Route path="/login" exact render={() => <Login loginAuthenticate={this.loginAuthenticate} />} />
            <PrivateRoute path="/admin" exact component={Admin} />
            <PrivateRoute path="/users" exact component={Users} />
            <PrivateRoute path="/profile/:id" exact component={HelperProfile} />
          <Footer />
        </React.Fragment>
      </Router>

    );
  }
}
const fakeAuth = {
  isAuthenticated: false,
  
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export default App;
