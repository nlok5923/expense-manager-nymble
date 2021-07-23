import { useState, useEffect } from "react";
import "./Report.scss";
import { Header, Card, Dropdown } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import useAuthStatus from "../../../Utils/customHooks/user";
import HamburgerMenu from "../../../Components/HamburgerMenu/index";
import Loader from "../../../Components/Loader/index";
import Axios from "axios";
import useToken from "../../../Utils/customHooks/token";
import { months, currencies } from "../../../Extras/item"

const Dashboard = () => {
  const [expenditureReport, setExpenditureReport] = useState([]);
  const [category, setCategory] = useState([]);
  const { getStatus } = useAuthStatus();
  const [isLoading, setLoading] = useState(true);
  const [auth, setAuth] = useState();
  const currentMonth = months.filter(
    (month, index) => new Date().getMonth() === index
  );
  const currentYear = new Date().getFullYear();
  const [currentCurrency, setCurrentCurrency] = useState("INR");
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
        getStatus().then((status) => {
          setAuth(status);
          setLoading(false);
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
      <Card fluid key={index}>
        <Card.Content>
          <Card.Header>Week {index + 1} </Card.Header>
          <Card.Description>
            {expenditure.start} | {currentMonth} | {currentYear} -
            {expenditure.end} | {currentMonth} | {currentYear}
          </Card.Description>
          <Card.Description>
            {expenditure.total === -1 ? "No transaction this week" : "Total: "}
            {expenditure.total !== -1
              ? currentCurrency === "INR"
                ? expenditure.inrSum + " Rs"
                : expenditure.usdSum + " $"
              : null}
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
        header={
          currentCurrency === "INR"
            ? item.name + " " + item.sum.inrSum + " Rs"
            : item.name + " " + item.sum.usdSum + " $"
        }
        key={index}
      />
    );
  };

  const handleCategorySelection = (e, data) => {
    setCurrentCurrency(data.value);
  };

  return (
    <div className="container">
      {isLoading && <Loader />}
      {!isLoading && !auth && <Redirect to="/login" />}
      {!isLoading && auth && (
        <HamburgerMenu>
          <Header as="h3">
            Expenditure of month {currentMonth}/{currentYear} 🤓
          </Header>
          <Dropdown
            floated="right"
            clearable
            options={currencies}
            name="currency"
            selection
            onChange={(e, data) => handleCategorySelection(e, data)}
          />
          {expenditureReport.map((expenditure, index) =>
            expenditureCard(expenditure, index)
          )}
          <Header as="h3">Amount per month category wise </Header>
          <Card.Group>
            {category.map((item, index) => categoricalExpenseCard(item, index))}
          </Card.Group>
        </HamburgerMenu>
      )}
    </div>
  );
};
export default Dashboard;
