import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

function AuthRoute({ exact, path, children }) {
    const { token } = useContext(UserContext);    
    
    console.debug(
        "AuthRoute",
        "exact=", exact,
        "path=", path,
        "token=", token,
    );
    
    if (!token) {
        return <Redirect to="/login" />;
    }
    
      return (
          <Route exact={exact} path={path}>
            {children}
          </Route>
      );
  }
  
  export default AuthRoute;