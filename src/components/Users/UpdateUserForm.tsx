import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  UserData,
  fetchOneUser,
  updateUser,
} from "../../redux/slices/userSlice";
import {
  Container,
  Form,
  Button,
  Dimmer,
  Loader,
  Header,
} from "semantic-ui-react";

const UpdateUserForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users);
  const user = users.user;

  useEffect(() => {
    if (user) {
      dispatch(fetchOneUser(user.username));
    }
  }, [dispatch, user]);

  let initialState: UserData = {
    id: "",
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
    avatar: "",
    bio: "",
    vLinks: [],
    pLinks: [],
    favMountains: [],
  };

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
        vLinks: user.vLinks || [],
        pLinks: user.pLinks || [],
        favMountains: user.favMountains || [],
      });
      setPhotos(user.pLinks || []);
      setVideos(user.vLinks || []);
    }
  }, [user]);

  const [formData, setFormData] = useState(initialState);
  const [photos, setPhotos] = useState(user?.pLinks);
  const [videos, setVideos] = useState(user?.vLinks);

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
    return (
      <div>
        <Dimmer>
          <p>Error! User data cannot be found! {`${users.error}`}</p>
        </Dimmer>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData) {
      dispatch(updateUser(formData));
    }

    setFormData(initialState);
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

  const handlePhotoChange = (index: number, value: string) => {
    if (formData.pLinks) {
      const updatedPhotoLinks = [...formData.pLinks];
      updatedPhotoLinks[index] = value;
      setPhotos(updatedPhotoLinks);
    }
  };

  const handleAddPhotoInput = () => {
    if (formData.pLinks) {
      setPhotos([...formData.pLinks, ""]);
    }
  };

  const handleRemovePhotoInput = (index: number) => {
    if (formData.pLinks) {
      const updatedPhotoLinks = [...formData.pLinks];
      updatedPhotoLinks.splice(index, 1);
      setPhotos(updatedPhotoLinks);
    }
  };

  const handleVideoChange = (index: number, value: string) => {
    if (formData.vLinks) {
      const updatedVideoLinks = [...formData.vLinks];
      updatedVideoLinks[index] = value;
      setPhotos(updatedVideoLinks);
    }
  };

  const handleAddVideoInput = () => {
    if (formData.vLinks) {
      setVideos([...formData.vLinks, ""]);
    }
  };

  const handleRemoveVideoInput = (index: number) => {
    if (formData.vLinks) {
      const updatedVideoLinks = [...formData.vLinks];
      updatedVideoLinks.splice(index, 1);
      setVideos(updatedVideoLinks);
    }
  };

  if (user) {
    return (
      <div>
        <Container>
          <Header as="h2">{`Update ${user.username}'s Profile`}</Header>
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
            {formData.pLinks &&
              formData.pLinks.map((photo, index) => (
                <Form.Field key={index}>
                  <label>Photos</label>
                  <input
                    value={photo}
                    onChange={(e) => handlePhotoChange(index, e.target.value)}
                  />
                  {formData.pLinks && index === formData.pLinks.length - 1 && (
                    <Button icon="plus" onClick={handleAddPhotoInput} />
                  )}
                  {index > 0 && (
                    <Button
                      icon="minus"
                      onClick={() => handleRemovePhotoInput(index)}
                    />
                  )}
                </Form.Field>
              ))}
            {formData.vLinks &&
              formData.vLinks.map((video, index) => (
                <Form.Field key={index}>
                  <label>Videos</label>
                  <input
                    value={video}
                    onChange={(e) => handleVideoChange(index, e.target.value)}
                  />
                  {formData.vLinks && index === formData.vLinks.length - 1 && (
                    <Button icon="plus" onClick={handleAddVideoInput} />
                  )}
                  {index > 0 && (
                    <Button
                      icon="minus"
                      onClick={() => handleRemoveVideoInput(index)}
                    />
                  )}
                </Form.Field>
              ))}
            <Button type="submit">Submit Changes</Button>
          </Form>
        </Container>
      </div>
    );
  }

  return null;
};

export default UpdateUserForm;
