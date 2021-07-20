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
import Card from "../../../Components/Card/index";
import "./Expenses.scss";
import HamburgerMenu from "../../../Components/HamburgerMenu/index";
import Axios from "axios";
import useToken from "../../../Utils/customHooks/token";

const Expenses = () => {
  const { getToken } = useToken();
  const token = getToken();
  const [open, setOpen] = useState(false);
  const addButtonMargin = { marginBottom: "20px" };
  const [alltransactions, setTransations] = useState([]);
  const [expense, setExpense] = useState({
      title: "",
      description: "",
      currency: "",
      category: "",
      amount: ""
  });


  useEffect(() => {
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
            setTransations(response.data);
            console.log(response.data);
            console.log(response);
          } catch (error) {
            console.log(error.message);
          }
      };
      fetchExpenses();
    },[token])

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
      const response = await Axios.post(
        "http://localhost:5000/dashboard/add-expense",
        expense,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    console.log("bhej dia", response);
    } catch (error) {
      console.log(error.message);
    }
  };


  const categories = [
    { key: 1, value: "Home", text: "Home" },
    { key: 2, value: "Food", text: "Food" },
    { key: 3, value: "Shopping", text: "Shopping" },
    { key: 4, value: "Fuel", text: "Fuel" },
    { key: 5, value: "Other", text: "Other" },
  ];
  return (
    <HamburgerMenu>
      <Container>
        <Header as="h3">Edit your transactions here 🤓 </Header>
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
                <input
                  placeholder="Enter currency of transaction"
                  name="currency"
                  onChange={(e) => saveExpenseInfo(e)}
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
            <Button
              Icon
              onClick={() => saveExpense()}
              positive
            >
              <Icon name="save" />
              Save
            </Button>
          </Modal.Actions>
        </Modal>
        {alltransactions.map((expense, index) =>{  return( <Card key={index} expense={expense} /> ) })}
      </Container>
    </HamburgerMenu>
  );
};

export default Expenses;
