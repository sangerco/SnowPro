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
  Embed,
  Card,
  Divider,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchOneUser, deleteUser } from "../../redux/slices/userSlice";
import PhotoForm from "../Media/PhotoForm";
import VideoForm from "../Media/VideoForm";
import FavMountain from "../SkiAreas/FavMountain";

const MyPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const username = auth.data?.username;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewPhotoForm, setShowNewPhotoForm] = useState(false);
  const [showNewVideoForm, setShowNewVideoForm] = useState(false);

  useEffect(() => {
    if (username) {
      dispatch(fetchOneUser(username));
    }
  }, [dispatch, username]);

  const user = useSelector((state: RootState) => state.users.user);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (username) {
      dispatch(deleteUser(username));
    }
  };

  let videoLinks: string[] = [];

  if (user && user.videos && user.videos.length > 0) {
    user.videos.forEach((link) => {
      let splitLink = link.split("v=");
      let id = splitLink[1];
      let finalId = id.includes("&") ? id.split("&")[0] : id;
      videoLinks.push(finalId);
    });
  }

  if (auth.loading) {
    return (
      <div>
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      </div>
    );
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
                <Link to={`/users/${user.username}/update`}>
                  <Icon name="edit" style={{ cursor: "pointer" }} />
                </Link>
                <Icon
                  name="trash"
                  style={{ cursor: "pointer" }}
                  onClick={handleShowDeleteModal}
                />
              </Grid.Column>
              <Grid.Column width={4}></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={6}>
                <p>{user.bio}</p>
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h3">Favorite Mountains</Header>
                <Divider />
                {user.favMountains &&
                username &&
                user.favMountains.length > 0 ? (
                  user.favMountains.map((fm) => (
                    <Card.Group key={fm}>
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
                {user.photos && user.photos.length > 0
                  ? user.photos.map((link) => (
                      <Image
                        src={link}
                        size="small"
                        as={Link}
                        to={`/users/${user.username}/photos/`}
                      />
                    ))
                  : null}
                <Button
                  size="small"
                  color="green"
                  onClick={() => setShowNewPhotoForm(true)}>
                  Add New Photo?
                </Button>
                {showNewPhotoForm && <PhotoForm />}
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                {videoLinks.length > 0
                  ? videoLinks.map((link) => (
                      <div style={{ marginTop: "20px" }}>
                        <Embed id={link} source="youtube" size="small" />
                      </div>
                    ))
                  : null}
                <Button
                  style={{ marginTop: "20px" }}
                  color="green"
                  size="small"
                  onClick={() => setShowNewVideoForm(true)}>
                  Add New Video?
                </Button>
                {showNewVideoForm && <VideoForm />}
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

  if (auth.error) {
    return <div>Error: {auth.error}</div>;
  }

  return null;
};

export default MyPage;
