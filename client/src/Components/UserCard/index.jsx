import React from "react";
import { Card } from "semantic-ui-react"

const UserCard = (props) => {
    return(
        <Card fluid>
        <Card.Content>
          <Card.Header>{props.data.name} </Card.Header>
          <Card.Description>
              {props.data.email}
          </Card.Description> 
        </Card.Content>
      </Card>
    )
}

export default UserCard;