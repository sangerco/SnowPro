import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchUserData, UserData } from "../../redux/slices/userSlice";
import { Button, Card, Image, Loader, Dimmer } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (users.loading) {
    <div>
      <Dimmer active>
        <Loader>Loading...</Loader>
      </Dimmer>
    </div>;
  }

  if (users.error) {
    <div>
      <Dimmer active>
        <div>{`Error! Users cannot be loaded! ${users.error}`}</div>
      </Dimmer>
    </div>;
  }

  if (users.users) {
    return (
      <div>
        {users.users.map((user: UserData) => (
          <Card.Group key={user.id}>
            <Card>
              <Card.Content>
                {user.avatar ? (
                  <Image floated="right" wrapped src={user.avatar} />
                ) : null}
                <Card.Header>{user.username}</Card.Header>
                <Card.Meta>
                  {user.firstName} {user.lastName}
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Button as={Link} to={`/users/${user.username}`}>
                  {`${user.username}'s Profile`}
                </Button>
              </Card.Content>
            </Card>
          </Card.Group>
        ))}
      </div>
    );
  }

  return null;
};

export default Users;
