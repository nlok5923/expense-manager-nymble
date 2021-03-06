import { React, useState, useEffect } from "react";
import {
  Header,
  Button,
  Icon,
  Container,
  Modal,
  Form,
  Dropdown,
} from "semantic-ui-react";
import Loader from "../../../Components/Loader/index";
import Card from "../../../Components/Card/index";
import { Redirect } from "react-router-dom";
import useAuthStatus from "../../../Utils/customHooks/user";
import "./Expenses.scss";
import HamburgerMenu from "../../../Components/HamburgerMenu/index";
import Axios from "axios";
import useToken from "../../../Utils/customHooks/token";
import { categories, currencies } from "../../../Extras/item"

const Expenses = () => {
  const { getToken } = useToken();
  const token = getToken();
  const [open, setOpen] = useState(false);
  const addButtonMargin = { marginBottom: "20px" };
  const [alltransactions, setTransations] = useState([]);
  const [selectedCategory, setSelectedCatetory] = useState();
  const { getStatus } = useAuthStatus();
  const [isLoading, setLoading] = useState(true);
  const [auth, setAuth] = useState();
  const [expense, setExpense] = useState({
    title: "",
    description: "",
    currency: "INR",
    category: "Other",
    amount: "",
  });

  const filterCategorySelection = (e, data) => {
    setSelectedCatetory(data.value);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await Axios.get(
          "https://aqueous-ridge-34051.herokuapp.com/dashboard/all-expenses",
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
        console.log(response.data);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchExpenses();
  }, [token]);

  const saveExpenseInfo = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategorySelection = (e, data) => {
    setExpense({
      ...expense,
      [data.name]: data.value,
    });
  };

  const saveExpense = async () => {
    setOpen(false);
    try {
      setTimeout(() => window.location.reload(), 1500);
      await Axios.post(
        "https://aqueous-ridge-34051.herokuapp.com/dashboard/add-expense",
        expense,
        {
          headers: {
            Authorization: token,
          },
        }
      )
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !auth && <Redirect to="/login" />}
      {!isLoading && auth && (
        <HamburgerMenu>
          <Container>
            <Header as="h3">Edit your transactions here ???? </Header>
            <Dropdown
              floated="right"
              clearable
              options={categories}
              selection
              onChange={(e, data) => filterCategorySelection(e, data)}
            />
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <Button
                  icon
                  labelPosition="left"
                  floated="right"
                  style={addButtonMargin}
                >
                  Add Expense
                  <Icon name="add" />
                </Button>
              }
            >
              <Modal.Header>Add expense </Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <label> Enter expense title </label>
                    <input
                      placeholder="Please enter expense title"
                      name="title"
                      onChange={(e) => saveExpenseInfo(e)}
                    />
                    <label>Enter amount </label>
                    <input
                      placeholder="Enter amount"
                      name="amount"
                      onChange={(e) => saveExpenseInfo(e)}
                    />
                    <label>Enter currency in which amount paid </label>
                    <Dropdown
                      floated="right"
                      clearable
                      options={currencies}
                      name="currency"
                      selection
                      onChange={(e, data) => handleCategorySelection(e, data)}
                    />
                    <label>
                      <Header> Select expense category</Header>
                    </label>
                    <Dropdown
                      floated="right"
                      clearable
                      options={categories}
                      name="category"
                      selection
                      onChange={(e, data) => handleCategorySelection(e, data)}
                    />

                    <label> Describe your transaction </label>
                    <textarea
                      placeholder="describe your expense"
                      name="description"
                      onChange={(e) => saveExpenseInfo(e)}
                    />
                  </Form.Field>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button Icon onClick={() => saveExpense()} positive>
                  <Icon name="save" />
                  Save
                </Button>
              </Modal.Actions>
            </Modal>
            {alltransactions
              .filter((expense, index) => {
                return !!selectedCategory
                  ? expense.data.category === selectedCategory
                  : true;
              })
              .map((expense, index) => {
                return (
                  <Card key={index} id={selectedCategory} expense={expense} isAdmin={false} userId={null} />
                );
              })}
          </Container>
        </HamburgerMenu>
      )}
    </>
  );
};

export default Expenses;
