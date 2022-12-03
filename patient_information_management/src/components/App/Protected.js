//Credit: https://www.makeuseof.com/create-protected-route-in-react/

import { Navigate } from "react-router-dom";

//creates the protected route used in App.js
const Protected = ({ isLoggedIn, children }) => {
  //if isLoggedIn sessionStorage item is false then navigate to login
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  //else return the path of the desired page
  return children;
};
export default Protected;
