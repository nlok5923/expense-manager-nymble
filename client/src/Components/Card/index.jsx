import "./Card.scss";
import { React, useState, useEffect } from "react";
import {
  Card,
  Label,
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Dropdown,
} from "semantic-ui-react";
import Axios from "axios";
import useToken from "../../Utils/customHooks/token";
import { categories, currencies } from "../../Extras/item"

const CardReactComponent = ({ expense, isAdmin, userId }) => {
  const [open, setOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: "",
    description: "",
    title: "",
    amount: "",
    currency: "",
    date: "",
    time: "",
    usdAmount: "",
    inrAmount: "",
  });
  useEffect(() => {
    setNewExpense({
      category: expense.data.category,
      description: expense.data.description,
      title: expense.data.title,
      amount: expense.data.amount,
      currency: expense.data.currency,
      date: expense.data.date,
      time: expense.data.time,
      usdAmount: expense.data.usdAmount,
      inrAmount: expense.data.inrAmount
    });
  }, [expense]);
  const saveExpenseInfo = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategorySelection = (e, data) => {
    setNewExpense({
      ...newExpense,
      [data.name]: data.value,
    });
  };

  const { getToken } = useToken();
  const deleteExpense = async (expenseid) => {
    const token = getToken();
    try {
      if (isAdmin) {
        const endpoint = "http://localhost:5000/admin/delete/" + expenseid;
        await Axios.post(
          endpoint,
          { userId },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        window.location.reload();
      } else {
        const endpoint = "http://localhost:5000/dashboard/delete/" + expenseid;
        await Axios.delete(endpoint, {
          headers: {
            Authorization: token,
          },
        });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateExpense = async (expenseid) => {
    const token = getToken();
    try {
      if (isAdmin) {
        const endpoint = "http://localhost:5000/admin/update/" + expenseid;
        await Axios.put(
          endpoint,
          { newExpense, userId },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        window.location.reload();
      } else {
        const endpoint = "http://localhost:5000/dashboard/update/" + expenseid;
        await Axios.put(endpoint, newExpense, {
          headers: {
            Authorization: token,
          },
        });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card fluid>
      <Label color={"green"} key={"orange"}>
        {expense.data.category}
      </Label>
      <Card.Content
        header={
          <Header as="h2">
            <Icon name="money" />
            <Header.Content>
              {expense.data.title}
              <Header.Subheader> Expense card</Header.Subheader>
            </Header.Content>
          </Header>
        }
      />
      <Card.Content>
        <p>Date: {expense.data.date}</p>
        <p>Time: {expense.data.time}</p>
        <p>Amount: {expense.data.amount}</p>
        <p>Description: {expense.data.description}</p>
        <p>Currency: {expense.data.currency} </p>
        <Button
          icon="trash"
          primary
          floated="right"
          onClick={() => deleteExpense(expense.id)}
        />
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button icon="pencil" primary floated="right" />}
        >
          <Modal.Header>Add expense </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label> Enter expense title </label>
                <input
                  placeholder="Please enter expense title"
                  name="title"
                  value={newExpense.title}
                  onChange={(e) => saveExpenseInfo(e)}
                />
                <label>Enter amount </label>
                <input
                  placeholder="Enter amount"
                  name="amount"
                  onChange={(e) => saveExpenseInfo(e)}
                  value={newExpense.amount}
                />
                <label>Enter currency in which amount paid </label>
                 <Dropdown
                  floated="right"
                  clearable
                  options={currencies}
                  value={newExpense.currency}
                  name="category"
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
                  value={newExpense.category}
                  name="category"
                  selection
                  onChange={(e, data) => handleCategorySelection(e, data)}
                />

                <label> Describe your transaction </label>
                <textarea
                  placeholder="describe your expense"
                  name="description"
                  value={newExpense.description}
                  onChange={(e) => saveExpenseInfo(e)}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button Icon onClick={() => updateExpense(expense.id)} positive>
              <Icon name="save" />
              Save
            </Button>
          </Modal.Actions>
        </Modal>
      </Card.Content>
    </Card>
  );
};

export default CardReactComponent;
