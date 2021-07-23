import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
//import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

//https://www.npmjs.com/package/react-toastify
//import { ToastContainer, toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import { renderRoutes } from 'react-router-config';
import './App.scss';

//import Cookies from 'js-cookie'

//Cookies.set('name', 'value', { expires: 7, path: '' })


//Cookies.get('name') // => 'value'
//Cookies.get('nothing') // => undefined
//console.log(Cookies.get())


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <ToastContainer />
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
