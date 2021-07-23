import { React, useState, useEffect } from "react";
import { Header, Container, Dropdown } from "semantic-ui-react";
import Loader from "../../../Components/Loader/index";
import Card from "../../../Components/Card/index";
import { Redirect, useParams } from "react-router-dom";
import useAdminAuthStatus from "../../../Utils/customHooks/admin";
import Axios from "axios";
import useToken from "../../../Utils/customHooks/token";
import AdminNavigation from "../../../Components/AdminNavigation/index";
import { categories } from "../../../Extras/item"

// const categories = [
//   { key: 1, value: "Home", text: "Home" },
//   { key: 2, value: "Food", text: "Food" },
//   { key: 3, value: "Shopping", text: "Shopping" },
//   { key: 4, value: "Fuel", text: "Fuel" },
//   { key: 5, value: "Other", text: "Other" },
// ];

const Expenses = () => {
  const { getToken } = useToken();
  const token = getToken();
  const [alltransactions, setTransations] = useState([]);
  const [selectedCategory, setSelectedCatetory] = useState();
  const { getStatus } = useAdminAuthStatus();
  const [isLoading, setLoading] = useState(true);
  const [auth, setAuth] = useState();
  const params = useParams();

  const filterCategorySelection = (e, data) => {
    setSelectedCatetory(data.value);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:5000/admin/all-expenses/" + params.id,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        getStatus().then((status) => {
          setAuth(status);
          setLoading(false);
        });
        setTransations(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchExpenses();
  }, [token]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !auth && <Redirect to="/login" />}
      {!isLoading && auth && (
        <>
          <AdminNavigation />
          <Container>
            <Header as="h3">Edit your transactions here 🤓 </Header>
            <Dropdown
              floated="right"
              clearable
              options={categories}
              selection
              onChange={(e, data) => filterCategorySelection(e, data)}
            />
            {alltransactions
              .filter((expense, index) => {
                return !!selectedCategory
                  ? expense.data.category === selectedCategory
                  : true;
              })
              .map((expense, index) => {
                return (
                  <Card
                    key={index}
                    id={selectedCategory}
                    expense={expense}
                    isAdmin={true}
                    userId={params.id}
                  />
                );
              })}
          </Container>
        </>
      )}
    </>
  );
};

export default Expenses;
