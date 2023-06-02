import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RouteProtector = ({ children }) => {
  const user = useSelector((state)=>state.auth);
  if(!user.id) return <Navigate to="/login"/>
  return <>{children}</>;
};

export default RouteProtector;
