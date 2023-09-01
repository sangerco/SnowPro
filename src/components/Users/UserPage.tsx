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
  Card,
  Divider,
  Embed,
} from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchOneUser, deleteUser } from "../../redux/slices/userSlice";
import Inbox from "../Messages/Inbox";
import FavMountain from "../SkiAreas/FavMountain";

const UserPage: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const authId = auth.data?.id;
  const { username } = useParams();
  const users = useSelector((state: RootState) => state.users);
  const user = users.user;
  console.log(user?.favMountains);
  const dispatch = useDispatch<AppDispatch>();

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

  let videoIds = [];

  if (user && user.videos && user.videos.length > 0) {
    for (let i = 0; i < user.videos.length; i++) {
      let splitLink = user.videos[i].split("v=");
      let id = splitLink[1];
      let videoId = id.includes("&") ? id.split("&")[0] : id;
      videoIds.push(videoId);
    }
  }

  if (username && user?.favMountains && user.favMountains.length > 0) {
    console.log("true");
  }

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
                    : ""}{" "}
                  {user.lastName && user.lastName !== "" ? user.lastName : ""}
                </Header.Subheader>
                {authId && authId === user.id ? (
                  <div>
                    <Link to={`/users/${user.username}/update`}>
                      <Icon name="edit" style={{ cursor: "pointer" }} />
                    </Link>
                    <Icon
                      name="trash"
                      style={{ cursor: "pointer" }}
                      onClick={handleShowDeleteModal}
                    />
                  </div>
                ) : null}
              </Grid.Column>
              <Grid.Column width={4}></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}></Grid.Column>
              <Grid.Column width={8}>
                <p>{user.bio}</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header as="h3">Favorite Mountains</Header>
                <Divider />
                {user.favMountains &&
                username &&
                user.favMountains.length > 0 ? (
                  user.favMountains.map((fm) => (
                    <Card.Group>
                      <FavMountain key={fm} slug={fm} username={username} />
                    </Card.Group>
                  ))
                ) : (
                  <p>This user has no favorited mountains yet!</p>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                <Header as="h3">
                  <Link to={`/users/${username}/photos`}>
                    All {username}'s Photos
                  </Link>
                </Header>
                {user.photos && user.photos.length > 0 ? (
                  user.photos.map((photo) => <Image size="small" src={photo} />)
                ) : (
                  <p>This user has no photos yet!</p>
                )}
                <Divider />
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                <Header as="h3">
                  <Link to={`/users/${username}/videos`}>
                    All {username}'s Videos
                  </Link>
                </Header>
                {videoIds && videoIds.length > 0 ? (
                  videoIds.map((video) => (
                    <Embed size="small" id={video} source="youtube" />
                  ))
                ) : (
                  <p>This user has no videos yet!</p>
                )}
                <Divider />
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

export default UserPage;
