import { useState, useEffect } from "react";
import "./Dashboard.scss"
import { Header } from "semantic-ui-react";
import Table from "../../Components/Table/index"
// import Card from "../../components/Card/index";
import { Redirect } from "react-router-dom";
import useAuthStatus from "../../Utils/customHooks/user";
import HamburgerMenu from "../../Components/HamburgerMenu/index";
import Loader from '../../Components/Loader/index'
import Axios from 'axios'
import useToken from '../../Utils/customHooks/token'

const Dashboard = () => {

  const [allTransactions, setAllTransations ] = useState([]);
  const data = [0,1,2,3,4];
  const heading = ["Date", "Time", "Amount", "Currency", "Description", "Category" ];
  const { getStatus } = useAuthStatus();
  const [isLoading, setLoading] = useState(true);
  const [auth, setAuth] = useState();
  const [quizes, setQuizes] = useState([{}]);

  const { getToken } = useToken();

  useEffect(() => {
    const token = getToken();
    const fetchExpenses = async () => {
        try {
            const response = await Axios.get(
              "http://localhost:5000/dashboard/all-expenses",
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            setAllTransations(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error.message);
          }
      };
      fetchExpenses();
  }, []);

//   const rowPositon = { paddingTop: "15px" };
  return (
    <div className="container">
      {/* {isLoading && <Loader />}
      {!isLoading && !auth && <Redirect to="/login" />}
      {!isLoading && auth && ( */}
        <HamburgerMenu>
           <Header as="h3" >Your last 5 transactions are listed here 🤓 </Header>
            <Table heading={heading} data={allTransactions} />
        </HamburgerMenu>
      {/* )}  */}
    </div>
  );
};
export default Dashboard;
