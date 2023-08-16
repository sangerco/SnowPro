import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Dimmer, Grid, Image, Loader } from "semantic-ui-react";
import { URL } from "../../utils/config";

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: null | string;
  bio: null | string;
  photos: null | string[];
  videos: null | string[];
  favMountains: null | string[];
}

interface UserListDataResponse {
  data: {
    users: User[];
  };
}

const UserList = () => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserListData = async () => {
      try {
        const response: UserListDataResponse = await axios.get(
          `${URL}/users/all-users`
        );
        setUserList(response.data.users);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserListData();
  }, []);

  if (userList.length > 0) {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={14}>
            <Card.Group>
              {userList.map((user) => (
                <Card key={user.id}>
                  {user.avatar && (
                    <Image
                      size="small"
                      floated="right"
                      src={user.avatar}
                      alt="user avatar"
                    />
                  )}
                  <Card.Header>
                    {user.firstName} {user.lastName}
                  </Card.Header>
                  <Card.Meta color="green">
                    <strong>{user.username}</strong>
                  </Card.Meta>
                  <Card.Meta>{user.email}</Card.Meta>
                  <Card.Description>{user.bio}</Card.Description>
                </Card>
              ))}
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else {
    return (
      <div>
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      </div>
    );
  }
};

export default UserList;
