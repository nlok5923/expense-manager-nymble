import { useState, useEffect } from "react";
import "./Admin.scss";
import { Header } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import useAuthStatus from "../../Utils/customHooks/user";
import HamburgerMenu from "../../Components/HamburgerMenu/index";
import Loader from "../../Components/Loader/index";
import Axios from "axios";
import useToken from "../../Utils/customHooks/token";
import UserCard from "../../Components/UserCard";

const Dashboard = () => {
  const { getStatus } = useAuthStatus();
  const [isLoading, setLoading] = useState(true);
  const [auth, setAuth] = useState(true);

  const { getToken } = useToken();

  useEffect(() => {
    const token = getToken();
    try {
      Axios.get("http://localhost:5000/dashboard/all-expenses", {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        // setAllTransations(response.data);
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
      {!isLoading && !auth && <Redirect to="/login" />}
      {!isLoading && auth && (
        <HamburgerMenu>
          <Header as="h3">Welcome to admin access here is the list of all users </Header>
          {/* <Table heading={heading} data={filterExpenses(allTransactions)} /> */}
          <UserCard />
            {/* Total expenditure: {totalExpenseAmount(allTransactions)} */}
        </HamburgerMenu>
      )}
    </div>
  );
};
export default Dashboard;
