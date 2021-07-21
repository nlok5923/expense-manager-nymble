import { useState, useEffect } from "react";
import "./Report.scss";
import { Header, Card } from "semantic-ui-react";
// import Card from "../../components/Card/index";
import { Redirect } from "react-router-dom";
import useAuthStatus from "../../../Utils/customHooks/user";
import HamburgerMenu from "../../../Components/HamburgerMenu/index";
import Loader from "../../../Components/Loader/index";
import Axios from "axios";
import useToken from "../../../Utils/customHooks/token";
// import { getWeeksInMonth } from "../../../Utils/utils"

const Dashboard = () => {
  const months = [
    "January",
    "Fenruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Ocotber",
    "November",
    "December",
  ];
  const [expenditureReport, setExpenditureReport] = useState([]);
  const [category, setCategory] = useState([]);
  //   const heading = ["Date", "Time", "Amount", "Currency", "Description", "Category" ];
  //   const { getStatus } = useAuthStatus();
  //   const [isLoading, setLoading] = useState(true);
  //   const [auth, setAuth] = useState();

  const { getToken } = useToken();

  useEffect(() => {
    const token = getToken();
    const fetchExpenses = async () => {
      let response = "";
      try {
        response = await Axios.get("http://localhost:5000/dashboard/reports", {
          headers: {
            Authorization: token,
          },
        });
        setExpenditureReport(response.data.weekly);
        setCategory(response.data.category);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchExpenses();
  }, []);
 
  const expenditureCard = (expenditure, index) => {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Week {index + 1}</Card.Header>
          <Card.Description>
            {expenditure === -1
              ? "No transaction this week"
              : "Total: " + expenditure}
          </Card.Description> 
        </Card.Content>
      </Card>
    );
  };

  const categoricalExpenseCard = (item, index) => {
    return (
      <Card
        fluid
        color="red"
        header={item.name + ": " + item.sum}
        key={index}
      />
    );
  };

  return (
    <div className="container">
      {/* {isLoading && <Loader />}
      {!isLoading && !auth && <Redirect to="/login" />}
      {!isLoading && auth && ( */}
      <HamburgerMenu>
        <Header as="h3">
          Expenditure of month{" "}
          {months.filter((month, index) => new Date().getMonth() === index)} 🤓{" "}
        </Header>
        {expenditureReport.map((expenditure, index) =>
          expenditureCard(expenditure, index)
        )}
        <Header as="h3">Amount per month category wise </Header>
        <Card.Group>
          {category.map((item, index) => categoricalExpenseCard(item, index))}
        </Card.Group>
      </HamburgerMenu>
      {/* )}  */}
    </div>
  );
};
export default Dashboard;