import { useState } from "react";
import {
  Button,
  Form,
  Container,
  Message,
  Header,
  Segment,
  Icon,
} from "semantic-ui-react";
import "./Signup.scss";
import * as formElements from "../../contents/registration.json"

const SignupForm = () => {
  const labelStyle = { fontSize: "15px" };

  const renderFormElements = () => {
    return formElements.formElement.map((ele, index) => (
      <Form.Field>
        <label style={labelStyle} className="label">
          {ele.name}
        </label>
        <input
          type={ele.type}
          name={ele.name}
          onChange={(e) => setInfo(e)}
          placeholder={ele.placeholder}
        />
      </Form.Field>
    ));
  };

  const [errMessage, seterrMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    institution: "",
  });

  const setInfo = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
        <div>
          <Segment>
            <Header as="h2" icon textAlign="center">
              <Icon name="address book outline" circular />
              <Header.Content>Hello User!! 👋</Header.Content>
            </Header>
            <Form error={!!errMessage}>
              {renderFormElements()}
              <Button primary type="submit">
                Register
              </Button>
              <Message error header="Oops!!" content={errMessage} />
            </Form>
          </Segment>
        </div>
    </Container>
  );
};

export default SignupForm;
