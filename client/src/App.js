import React, { useContext } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
import Home from './pages/Home/Home';
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import MyBooks from './pages/MyBooks/MyBooks';
import MyFavorites from './pages/MyFavorites/MyFavorites';


// Even though this is the App.js file, in the end we are not exactly exporting
// the App component.  We actually set up the app component to implement our react
// router, but in the end we export App wrapped in the context provider

function App() {
  // Here we subscribe the authentication context using the useContext hook
  // we use isAuth to determine whether the user is logged in, and setIsAuth
  // to change their status on logout.
  const { isAuth, setIsAuth } = useContext(AuthContext);
  console.log('App auth: ', isAuth);

  // here we are ceating a private route wrapper to prevent front end routing to
  // restricted pages.  The ({ component: Component, ...rest })  argument that is
  // passed to this functional component is essentially the same as just passing
  // props, but using object destucturing.  the ...rest is literally the rest of
  // the props that were not destructured.
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );

  return (
    <>
    <Router>
      {/* <Switch> */}
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path='/login' compontent={Login} />
      <Route exact path='/signup' compontent={Signup} />
      <PrivateRoute exact path='/mybooks' component={MyBooks} />
      <PrivateRoute exact path='/myfavorites' component={MyFavorites} />
      </Switch>
    </Router>
    </>
  );
}

// Here we export the final product of our app/context configuration, and
// even though it is unnamed here, it will be imported as App in index.js
export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
