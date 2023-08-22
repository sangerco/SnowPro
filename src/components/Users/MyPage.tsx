import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dimmer,
  Loader,
  Grid,
  Container,
  Header,
  Image,
  Modal,
  Button,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchOneUser, deleteUser } from "../../redux/slices/userSlice";

const MyPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const users = useSelector((state: RootState) => state.users);
  const user = users.user;
  const dispatch = useDispatch<AppDispatch>();
  const username = auth.data?.username;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (username) {
      dispatch(fetchOneUser(username));
    }
  }, [dispatch, username]);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (username) {
      dispatch(deleteUser(username));
    }
  };

  if (users.loading) {
    return (
      <div>
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      </div>
    );
  }

  if (users.error) {
    return <div>Error: {users.error}</div>;
  }

  if (user) {
    return (
      <div>
        <Container>
          <Grid relaxed>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image src={user.avatar} size="small" />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h2" textAlign="right">
                  {user.username}
                </Header>
                <Header.Subheader>
                  {user.firstName && user.firstName !== ""
                    ? user.firstName
                    : ""}
                  {user.lastName && user.lastName !== "" ? user.lastName : ""}
                </Header.Subheader>
                <Link to={"madeuplinkfornow"}>
                  <Icon name="edit" style={{ cursor: "pointer" }} />
                </Link>
                <Icon
                  name="trash"
                  style={{ cursor: "pointer" }}
                  onClick={handleShowDeleteModal()}
                />
              </Grid.Column>
              <Grid.Column width={4}></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}></Grid.Column>
              <Grid.Column width={8}>
                <p>{user.bio}</p>
              </Grid.Column>
              <Grid.Column width={4}>
                {/* {user.favMountains.length > 0 ? (
                    <FavMountain userId={user.id} />
                ) : (
                    <p>This user has no favorited mountains yet!</p>
                )} */}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                {/* <ShowPhotos username={username as string} /> */}
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                {/* <ShowVideos username={username as string} /> */}
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <Modal.Content>
            Are You Sure You Want To Delete Your Profile?
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={handleDeleteUser}>
              Yes
            </Button>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  return null;
};

export default MyPage;
