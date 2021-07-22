import { useState, useEffect } from "react";
import "./Admin.scss";
import { Header } from "semantic-ui-react";
import { Redirect, NavLink } from "react-router-dom";
import useAdminAuthStatus from "../../Utils/customHooks/admin";
import Loader from "../../Components/Loader/index";
import Axios from "axios";
import useToken from "../../Utils/customHooks/token";
import UserCard from "../../Components/UserCard";
import AdminNavigation from "../../Components/AdminNavigation/index"

const Dashboard = () => {
  const { getStatus } = useAdminAuthStatus();
  const [isLoading, setLoading] = useState(true);
  const [auth, setAuth] = useState(true);
  const [users, setAllUsers] = useState([]);

  const { getToken } = useToken();

  useEffect(() => {
    const token = getToken();
    try {
      Axios.get("http://localhost:5000/admin/all-users", {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        setAllUsers(response.data);
        getStatus().then((status) => {
          setAuth(status);
          setLoading(false);
        });
        setLoading(false);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="container">
      {isLoading && <Loader />}
      {!isLoading && !auth && <Redirect to="/admin/login" />}
      {!isLoading && auth && (
           <div>
          <AdminNavigation />
          <Header as="h3">Welcome to admin access here is the list of all users </Header>
          {users.map((userInfo) => {
            return(
                <NavLink to={`/admin/dashboard/user/${userInfo.id}`} >
                    <UserCard data={userInfo.data} /> 
                    </NavLink>)
              })}
              </div>
    )}
    </div>
  );
};
export default Dashboard;
