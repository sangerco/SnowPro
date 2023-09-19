import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchOneUser, updateUser } from "../../redux/slices/userSlice";
import {
  Container,
  Form,
  Button,
  Dimmer,
  Loader,
  Header,
  Image,
  Embed,
  Divider,
  Grid,
  Card,
  Segment,
} from "semantic-ui-react";
import PhotoForm from "../Media/PhotoForm";
import VideoForm from "../Media/VideoForm";
import { useNavigate, useParams } from "react-router";
import { initialUserState } from "../../helpers/helperStates";
import { Link } from "react-router-dom";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";

const UpdateUserForm: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState(initialUserState);
  const [showNewPhotoForm, setShowNewPhotoForm] = useState(false);
  const [showNewVideoForm, setShowNewVideoForm] = useState(false);

  useEffect(() => {
    if (username) {
      dispatch(fetchOneUser(username));
    }
  }, [dispatch, username]);

  const users = useSelector((state: RootState) => state.users);
  const user = users.user;

  useEffect(() => {
    dispatch(fetchSkiAreas());
  }, [dispatch]);

  const skiAreaState = useSelector((state: RootState) => state.skiAreas);
  const skiAreas = skiAreaState.skiAreas;

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        username: user.username,
        password: user.password || "",
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        avatar: user.avatar || "",
        bio: user.bio || "",
        videos: user.videos || [],
        photos: user.photos || [],
        favMountains: user.favMountains || [],
      });
    }
  }, [user]);

  if (users.loading) {
    return (
      <>
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      </>
    );
  }

  if (!user || !auth.data || user.username !== auth.data.username) {
    console.log(true);
    return (
      <>
        <Dimmer active>
          <Header color="orange" as="h1">
            Access not authorized.
          </Header>
          <Button color="red" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Dimmer>
      </>
    );
  }

  if (users.error) {
    return (
      <>
        <Dimmer>
          <p>Error! User data cannot be found! {`${users.error}`}</p>
        </Dimmer>
      </>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData) {
      dispatch(updateUser(formData));
    }

    setFormData(initialUserState);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let videoIds: string[] = [];

  if (formData.videos) {
    videoIds = formData.videos.map((videoLink) => {
      let splitLink = videoLink.split("v=");
      let id = splitLink[1];
      let videoId = id.includes("&") ? id.split("&")[0] : id;
      return videoId;
    });
  }

  if (user) {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            {skiAreaState.loading ? (
              <Dimmer active>
                <Loader>Loading...</Loader>
              </Dimmer>
            ) : skiAreas && skiAreas.length > 0 ? (
              <Segment style={{ overflow: "auto", maxHeight: "75vh" }}>
                <Card id="ski-area-card">
                  {" "}
                  {/* max height overflow auto */}
                  {skiAreas.map((sa) => (
                    <Card.Content key={sa.slug}>
                      <Link to={`/ski-areas/${sa.slug}`}>{sa.name}</Link>
                    </Card.Content>
                  ))}
                </Card>
              </Segment>
            ) : skiAreaState.error ? (
              <Dimmer active>
                <Header as="h1">
                  Error! Ski Area Data cannot be retrieved! {skiAreaState.error}
                </Header>
              </Dimmer>
            ) : null}
          </Grid.Column>
          <Grid.Column width={8}>
            <Container>
              <Header
                as="h2"
                style={{
                  margin: "10px",
                }}>{`Update ${user.username}'s Profile`}</Header>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label>Username</label>
                  <input
                    placeholder={formData.username}
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder={formData.password}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <input
                    placeholder={formData.firstName}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    placeholder={formData.lastName}
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder={formData.email}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>About You...</label>
                  <textarea
                    placeholder={formData.bio}
                    name="bio"
                    value={formData.bio}
                    onChange={handleTextAreaChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Avatar Link</label>
                  <input
                    placeholder={formData.avatar}
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Button type="submit">Submit Changes</Button>
              </Form>
              {formData.photos &&
                formData.photos.map((photo) => <Image src={photo} />)}
              <Button color="green" onClick={() => setShowNewPhotoForm(true)}>
                Add Photos?
              </Button>
              {showNewPhotoForm && <PhotoForm />}
              <Divider />
              {videoIds.length > 0
                ? videoIds.map((id) => <Embed id={id} source="youtube" />)
                : null}
              <Button color="green" onClick={() => setShowNewVideoForm(true)}>
                Add Photos?
              </Button>
              {showNewVideoForm && <VideoForm />}
              <Divider />
            </Container>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return null;
};

export default UpdateUserForm;
