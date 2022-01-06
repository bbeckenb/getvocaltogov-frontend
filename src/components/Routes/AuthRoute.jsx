import React, { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../Common/LoadingSpinner";
import { Route, useHistory, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

function AuthRoute({ exact, path, children }) {
    const { currUser } = useContext(UserContext);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(function loadUser() {
        console.log('XXXXXX', currUser)
        if (currUser) {
            setLoaded(true);
        } 
    }, [currUser]);
    // console.log('XXXXXX', currUser)
    console.debug(
        "PrivateRoute",
        "exact=", exact,
        "path=", path,
        "currentUser=", currUser,
    );
  
    if (!loaded) {
        return <LoadingSpinner waitingOn={'Profile'} />;
    }
    
    if (!currUser) {
        return <Redirect to="/login" />;
      }
    
      return (
          <Route exact={exact} path={path}>
            {children}
          </Route>
      );
  }
  
  export default AuthRoute;