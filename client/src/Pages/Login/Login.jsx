import React, { useState } from "react"
import { Button, Form, Container, Message, Header, Segment, Icon } from "semantic-ui-react"

const formElements = [
    { name: "email", placeholder: "Enter your email" },
    { name: "password", placeholder: "Enter password" },
  ];
  const labelStyle = { fontSize: "15px" };
  const renderFormElement = (name, placeholder) => (
    <Form.Field>
      <label className="label" style={labelStyle}>
        {name}
      </label>
      <input
        type={name}
        name={name}
        placeholder={placeholder}
      />
    </Form.Field>
  );

const LoginForm = () => {
  const [errMessage, setErrorMessage] = useState("");
    return(
        <Container>
            <div>
            <Segment>
            <Header as="h2" icon textAlign="center">
              <Icon name="hand peace" circular />
              <Header.Content>Welcome Back!! 👏</Header.Content>
            </Header>
            <Form error={!!errMessage}>
              {formElements.map((element, index) =>
                renderFormElement(element.name, element.placeholder)
              )}
              <Button type="submit" primary>
                Login
              </Button>
              <Message error header="Oops!!" content={errMessage} />
            </Form>
          </Segment>
            </div>
        </Container>
    );
}

export default LoginForm;