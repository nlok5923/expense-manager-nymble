import { useState, useEffect } from "react";
import "./Dashboard.scss";
import { Header } from "semantic-ui-react";
import Table from "../../Components/Table/index";
import { Redirect } from "react-router-dom";
import useAuthStatus from "../../Utils/customHooks/user";
import HamburgerMenu from "../../Components/HamburgerMenu/index";
import Loader from "../../Components/Loader/index";
import Axios from "axios";
import useToken from "../../Utils/customHooks/token";
import { filterExpenses, totalExpenseAmount } from "../../Utils/utils";
import { heading } from "../../Extras/item"

const Dashboard = () => {
  const [allTransactions, setAllTransations] = useState([]);
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
        setAllTransations(response.data);
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
          <Header as="h3">Your last 5 transactions are listed here 🤓 </Header>
          <Table heading={heading} data={filterExpenses(allTransactions)} />
          <Header as="h4">
            Total expenditure: Rs {totalExpenseAmount(allTransactions)}
          </Header>
        </HamburgerMenu>
      )}
    </div>
  );
};
export default Dashboard;
