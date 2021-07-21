import React from "react";
import { Card } from "semantic-ui-react"

const UserCard = () => {
    return(
        <Card fluid>
        <Card.Content>
          <Card.Header>User name </Card.Header>
          <Card.Description>
              User email
          </Card.Description> 
        </Card.Content>
      </Card>
    )
}

export default UserCard;