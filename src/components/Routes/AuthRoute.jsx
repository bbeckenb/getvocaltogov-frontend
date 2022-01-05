import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

function AuthRoute({ exact, path, children }) {
    const { currUser } = useContext(UserContext);
  
    console.debug(
        "PrivateRoute",
        "exact=", exact,
        "path=", path,
        "currentUser=", currUser,
    );
  
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